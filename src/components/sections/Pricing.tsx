"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { intellix } from "@/lib/intellix";
import { whatsappUrl } from "@/lib/site";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Pricing() {
  const { pricing } = intellix;

  return (
    <section id="planes" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-blue">
            {pricing.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {pricing.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-dim md:text-lg">
            {pricing.description}
          </p>
        </motion.div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOut, delay: i * 0.12 }}
              className={`relative flex flex-col rounded-3xl p-7 ${
                plan.featured
                  ? "border-2 border-brand-blue/30 bg-bg shadow-[0_24px_60px_-20px_rgb(47_107_240/0.25)] lg:-my-3 lg:py-10"
                  : "card-soft"
              }`}
            >
              {"badge" in plan && plan.badge && (
                <span className="btn-brand absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold">
                  {plan.badge}
                </span>
              )}

              <h3 className="font-display text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-ink-dim">{plan.tagline}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                        plan.featured
                          ? "bg-brand-blue/10 text-brand-blue"
                          : "bg-brand-green/10 text-brand-green"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-dim">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappUrl(plan.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-press mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold ${
                  plan.featured
                    ? "btn-brand"
                    : "border border-line/15 bg-bg text-ink transition-colors hover:border-brand-blue/40 hover:text-brand-blue"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-ink-dim"
        >
          {pricing.note}
        </motion.p>
      </div>
    </section>
  );
}
