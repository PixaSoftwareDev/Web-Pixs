# Verificación de dominios, app y correo de Intellix.
#
# Correr ANTES y DESPUÉS de cada cambio de infraestructura y comparar.
# Es de solo lectura: no modifica nada.
#
#   powershell -File docs\verificar.ps1
#
# Ver docs/INFRAESTRUCTURA.md para el plan completo.

$ErrorActionPreference = "SilentlyContinue"
$NS   = "ns1.donweb.com"   # NS autoritativo: la verdad, sin caché de por medio
$VPS  = "200.58.109.110"
$fail = 0

function Check($label, $actual, $expected) {
    $ok = $actual -eq $expected
    if (-not $ok) { $script:fail++ }
    $mark = if ($ok) { "OK  " } else { "FALLA" }
    "{0,-5} {1,-38} {2}" -f $mark, $label, $actual
    if (-not $ok) { "      esperado: $expected" }
}

Write-Host "`n=== HOSTS (la app responde) ===" -ForegroundColor Cyan
foreach ($h in @(
    "https://app.intellix.com.ar/login",
    "https://intellix.com.ar/login",
    "https://www.intellix.com.ar/login",
    "https://dev.intellix.com.ar/login",
    "https://app.intellix.com.ar/health"
)) {
    $code = try { (Invoke-WebRequest $h -UseBasicParsing -TimeoutSec 25).StatusCode } catch { "ERROR" }
    Check $h $code 200
}

Write-Host "`n=== DNS: a dónde apunta cada host ===" -ForegroundColor Cyan
foreach ($d in @("intellix.com.ar", "www.intellix.com.ar", "app.intellix.com.ar", "dev.intellix.com.ar")) {
    $ip = (Resolve-DnsName $d -Type A -Server $NS | Where-Object { $_.Type -eq 'A' }).IPAddress
    Check $d $ip $VPS
}

# IPv6: un AAAA apuntando a otro lado rompe SOLO a los clientes que resuelven por IPv6
# (Meta entre ellos) y es invisible para cualquier prueba que salga por IPv4.
# Paso el 2026-08-08: Ferozo creo un AAAA al hosting y tiro el webhook de WhatsApp
# mientras todos los chequeos daban verde. Ninguno de estos hosts debe tener AAAA.
Write-Host "`n=== IPv6: ninguno de estos debe tener AAAA ===" -ForegroundColor Cyan
foreach ($d in @("intellix.com.ar", "www.intellix.com.ar", "app.intellix.com.ar", "dev.intellix.com.ar")) {
    $v6 = (Resolve-DnsName $d -Type AAAA -Server $NS | Where-Object { $_.Type -eq 'AAAA' }).IPAddress
    if ($v6) { $script:fail++; "FALLA {0,-38} AAAA -> {1}" -f $d, $v6 }
    else     { "OK    {0,-38} sin AAAA" -f $d }
}

Write-Host "`n=== RESEND: el correo de la app (reset de contrasena, OTP) ===" -ForegroundColor Cyan
Write-Host "Si algo de esto falla, la gente no puede recuperar su contrasena." -ForegroundColor Yellow

$mx = (Resolve-DnsName send.intellix.com.ar -Type MX -Server $NS | Where-Object { $_.Type -eq 'MX' }).NameExchange
Check "MX send.intellix.com.ar" $mx "feedback-smtp.sa-east-1.amazonses.com"

$spf = (Resolve-DnsName send.intellix.com.ar -Type TXT -Server $NS | Where-Object { $_.Type -eq 'TXT' }).Strings -join ''
Check "SPF send.intellix.com.ar" $spf "v=spf1 include:amazonses.com ~all"

# El DKIM es el critico y el que puede perderse si DonWeb reescribe la zona:
# vive en el RAIZ (no en send.) porque la app manda desde noreply@intellix.com.ar.
$dkim = (Resolve-DnsName resend._domainkey.intellix.com.ar -Type TXT -Server $NS | Where-Object { $_.Type -eq 'TXT' }).Strings -join ''
Check "DKIM resend._domainkey (218 chars)" $dkim.Length 218

$dmarc = (Resolve-DnsName _dmarc.intellix.com.ar -Type TXT -Server $NS | Where-Object { $_.Type -eq 'TXT' }).Strings -join ''
Check "DMARC _dmarc" $dmarc "v=DMARC1; p=none;"

Write-Host "`n=== CASILLAS: correo entrante de la marca ===" -ForegroundColor Cyan
$mxRaiz = (Resolve-DnsName intellix.com.ar -Type MX -Server $NS | Where-Object { $_.Type -eq 'MX' }).NameExchange
if ($mxRaiz) { "OK    MX del raiz                             $mxRaiz" }
else         { "PEND  MX del raiz                             sin configurar (Bloque 1)" }

$spfRaiz = (Resolve-DnsName intellix.com.ar -Type TXT -Server $NS | Where-Object { $_.Type -eq 'TXT' }).Strings -join ''
if ($spfRaiz) { "OK    SPF del raiz                            $spfRaiz" }
else          { "PEND  SPF del raiz                            sin configurar (Bloque 1)" }

Write-Host "`n=== TTL (ventana de rollback) ===" -ForegroundColor Cyan
foreach ($d in @("intellix.com.ar", "www.intellix.com.ar")) {
    $ttl = (Resolve-DnsName $d -Type A -Server $NS | Where-Object { $_.Type -eq 'A' }).TTL
    $nota = if ($ttl -le 900) { "(rollback ~$([math]::Round($ttl/60)) min)" } else { "(LENTO: $([math]::Round($ttl/3600)) hs)" }
    "      {0,-38} {1} {2}" -f $d, $ttl, $nota
}

Write-Host ""
if ($fail -eq 0) { Write-Host "TODO OK" -ForegroundColor Green }
else             { Write-Host "$fail CHEQUEO(S) EN FALLA — revisar antes de seguir" -ForegroundColor Red }
Write-Host ""
