"use client";

import { useEffect, useRef } from "react";

/** Lueur dorée qui suit le pointeur, comme une main chaude. Décorative. */
export function Lueur() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let image = 0;
    const suivre = (e: PointerEvent) => {
      cancelAnimationFrame(image);
      image = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--x", `${e.clientX}px`);
        ref.current?.style.setProperty("--y", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", suivre, { passive: true });
    return () => {
      window.removeEventListener("pointermove", suivre);
      cancelAnimationFrame(image);
    };
  }, []);
  return <div ref={ref} aria-hidden className="lueur pointer-events-none fixed inset-0 z-30" />;
}
