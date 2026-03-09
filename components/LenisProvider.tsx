"use client";

import { useEffect, useRef } from "react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<{ destroy: () => void } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Don't initialise Lenis on mobile — page is a single fixed viewport
    if (window.innerWidth < 768) return;

    let mounted = true;
    const init = async () => {
      const Lenis = (await import("lenis")).default;
      if (!mounted) return;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      function onFrame(time: number) {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(onFrame);
      }
      rafRef.current = requestAnimationFrame(onFrame);
    };
    init();
    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
