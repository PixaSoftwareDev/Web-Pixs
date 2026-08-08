"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { team } from "@/lib/content";

const easeOut = [0.16, 1, 0.3, 1] as const;

const accentGlow: Record<string, string> = {
  cyan: "bg-brand-cyan/25",
  blue: "bg-brand-blue/25",
  violet: "bg-brand-violet/25",
};

const accentChip: Record<string, string> = {
  cyan: "bg-brand-cyan/10 text-brand-cyan",
  blue: "bg-brand-blue/10 text-brand-blue",
  violet: "bg-brand-violet/10 text-brand-violet",
};

/* Entrada "de a uno". */
const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.24 } },
};

const figureVariants: Variants = {
  hidden: {},
  visible: {},
};

/* El retrato emerge desde la página (sube desde la línea de piso, enmascarado). */
const riseVariants: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

const glowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: easeOut, delay: 0.15 } },
};

const captionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut, delay: 0.55 } },
};

/* Sin marcos: los tres, recortados, parados sobre la página. */
export default function Team() {
  return (
    <section id="equipo" className="section-band relative overflow-hidden px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Las personas detrás de Intellix
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-dim md:text-lg">
            No somos un formulario de soporte: somos tres fundadores que atienden a
            cada cliente en persona, del primer llamado a la puesta en marcha.
          </p>
        </motion.div>

        <motion.div
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={figureVariants}
              whileHover="hover"
              className="group flex flex-col items-center"
            >
              {/* Escenario del retrato: máscara de piso + glow + figura */}
              <div className="relative flex h-[300px] w-full items-end justify-center overflow-hidden md:h-[340px]">
                {/* Glow de color detrás de la persona */}
                <motion.div
                  variants={glowVariants}
                  aria-hidden
                  className={`absolute bottom-[-40px] h-64 w-64 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                    accentGlow[member.accent] ?? accentGlow.blue
                  }`}
                />
                {/* Retrato recortado, emergiendo de la página */}
                <motion.div
                  variants={riseVariants}
                  className="relative z-10 h-[94%] w-full transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]"
                >
                  <Image
                    src={member.cutout}
                    alt={`Retrato de ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 80vw, 33vw"
                    className="object-contain object-bottom drop-shadow-[0_24px_30px_rgba(30,36,52,0.22)]"
                  />
                </motion.div>
              </div>

              {/* Línea de piso donde "apoyan" */}
              <div
                aria-hidden
                className="h-px w-3/4 bg-gradient-to-r from-transparent via-line/25 to-transparent"
              />

              <motion.div variants={captionVariants} className="mt-4 text-center">
                <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                <p
                  className={`mx-auto mt-2 w-fit rounded-full px-3 py-1 text-xs font-medium ${
                    accentChip[member.accent] ?? accentChip.blue
                  }`}
                >
                  {member.role}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
