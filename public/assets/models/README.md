# Modelos 3D (opcional)

Si querés reemplazar la esfera procedural del Hero por un modelo propio, cargá acá un archivo `.glb`:

- `hero.glb` — modelo 3D del hero (idealmente < 2 MB).

Después decile a Claude: *"cargué `hero.glb`, usalo en HeroScene en lugar de la esfera"*. Claude lo va a integrar con `useGLTF` de `@react-three/drei`.

Si no cargás nada, la escena 3D actual (icosaedro wireframe cyan/magenta) queda como default — ya se ve muy bien.
