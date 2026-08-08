"use client";

import { MotionConfig } from "framer-motion";

/* Hace que TODO framer-motion respete prefers-reduced-motion del sistema. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
