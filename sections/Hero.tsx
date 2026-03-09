"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroCanvas = dynamic(
  () => import("@/components/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false }
);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const splineLoadedRef = useRef(false);
  const startAnimationRef = useRef<(() => void) | null>(null);
  const [localTime, setLocalTime] = useState("");

  useGSAP(
    () => {
      // Initial states
      gsap.set('[data-gsap="spline"]', { opacity: 0 });
      gsap.set('[data-gsap="top-bar"]', { opacity: 0, y: -20 });
      gsap.set('[data-gsap="andre-text"]', { opacity: 0, y: 20 });
      gsap.set('[data-gsap="rasi-text"]', { opacity: 0, y: 20 });
      gsap.set('[data-gsap="bio-para"]', { opacity: 0, y: 15 });
      gsap.set('[data-gsap="mobile-email"]', { opacity: 0, y: 15 });
      gsap.set('[data-gsap="bottom-bar"]', { opacity: 0, y: 20 });

      const tl = gsap.timeline({ paused: true });

      tl.to('[data-gsap="spline"]', {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      }).to(
        [
          '[data-gsap="top-bar"]',
          '[data-gsap="andre-text"]',
          '[data-gsap="rasi-text"]',
          '[data-gsap="mobile-email"]',
          '[data-gsap="bio-para"]',
          '[data-gsap="bottom-bar"]',
        ],
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
        },
        "0.6"
      );

      startAnimationRef.current = () => tl.play();
    },
    { scope: heroRef }
  );

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      const ampm = hours >= 12 ? "p.m." : "a.m.";
      const h = hours % 12 || 12;
      setLocalTime(`${h}:${mins.toString().padStart(2, "0")} ${ampm}`);
    };
    formatTime();
    const id = setInterval(formatTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-transparent md:h-screen md:overflow-hidden"
    >
      {/* Full-viewport Spline background (behind all content) */}
      <HeroCanvas
        onLoad={() => {
          splineLoadedRef.current = true;
          startAnimationRef.current?.();
        }}
      />

      {/* Top bar */}
      <header
        data-gsap="top-bar"
        className="fixed top-0 left-0 right-0 w-full z-[100] bg-black pointer-events-auto px-6 py-4 md:px-8 md:py-5"
      >
        <div className="mx-auto flex max-w-[1600px] w-full items-start justify-between gap-6">
          {/* Far left: ANDRE / RASI */}
          <div className="font-mono text-xs uppercase tracking-wide text-white md:text-sm">
            <div>ANDRE</div>
            <div>RASI</div>
          </div>

          {/* Center-left: Open to opportunities + email */}
          <div className="hidden font-mono text-xs text-body md:block md:text-sm">
            <div>Open to opportunities:</div>
            <a
              href="mailto:rasiandre06@gmail.com"
              className="text-accent hover:underline"
            >
              rasiandre06@gmail.com
            </a>
          </div>

          {/* Center-right: skills stack */}
          <div className="hidden font-mono text-xs text-body md:block md:text-sm">
            <div><strong>React</strong>, <strong>PostgreSQL</strong>, <strong>AWS</strong></div>
            <div>Next.js, Node.js REST APIs</div>
            <div>TypeScript, Oracle & Docker</div>
          </div>

          {/* Far right: nav links */}
          <nav
            className="relative z-[60] flex flex-col items-end gap-1 font-mono text-xs text-body md:text-sm"
          >
            <a
              href="/"
              className="hover-underline relative z-[60] cursor-pointer font-bold text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="hover-underline relative z-[60] cursor-pointer"
              aria-disabled="true"
              aria-label="Projects - Coming soon"
              onClick={(e) => e.preventDefault()}
            >
              Projects (Coming soon)
            </a>
          </nav>
        </div>
      </header>

      {/* Hero center: stacked on mobile, 3-column on desktop */}
      <div
        className="relative z-10 flex min-h-screen w-full flex-col gap-0 px-6 pt-20 pb-40 md:flex-row md:items-center md:justify-between md:gap-0 md:px-10 md:py-24 lg:px-16"
      >
        {/* Title: top on mobile, left on desktop */}
        <div className="flex w-full flex-row items-end justify-between md:flex-col md:justify-center md:flex-1">
          <h1 className="leading-tight text-white">
            <span
              data-gsap="andre-text"
              className="font-bonheur block text-[15vw] md:text-[clamp(1.8rem,12vw,8.5rem)]"
            >
              Depth
            </span>
            <span
              data-gsap="rasi-text"
              className="font-bebas block font-bold uppercase tracking-tight text-[12vw] md:text-[clamp(1.8rem,12vw,8.5rem)]"
              style={{ marginTop: "-0.15em" }}
            >
              Explorer.
            </span>
          </h1>
          <div data-gsap="mobile-email" className="md:hidden font-mono text-xs text-body leading-relaxed text-right pb-1">
            <div>Open to</div>
            <div>opportunities:</div>
            <a
              href="mailto:rasiandre06@gmail.com"
              className="text-accent hover:underline break-all"
            >
              rasiandre06@gmail.com
            </a>
          </div>
        </div>

        {/* Center: spacer so Spline visible and bio doesn't overlap (mobile); desktop 35vw square */}
        <div
          className="min-h-[33vh] shrink-0 md:block md:h-[35vw] md:min-h-0 md:w-[35vw]"
          aria-hidden
        />

        {/* Bio: below on mobile, right on desktop */}
        <div className="flex w-full flex-1 justify-center md:justify-end">
          <div data-gsap="bio-para" className="max-w-full md:max-w-[410px]">
            <p className="font-mono text-[0.75rem] leading-[1.7] text-body mb-[1.2em]">
              Hi, I&apos;m Andre — a <strong>Software Developer</strong> and <strong>Cloud Engineer</strong>.
              Driven by curiosity, built on persistence.
            </p>
            <p className="font-mono text-[0.75rem] leading-[1.7] text-body">
              I write code with <strong>music</strong> in my ears and a
              relentless need to figure things out.{" "}
              <strong>
                I don&apos;t just solve problems — I dissolve them.
              </strong>{" "}
              I&apos;m here to <strong>build things that matter</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <footer
        data-gsap="bottom-bar"
        className="fixed bottom-0 left-0 right-0 z-10 w-full px-6 py-4 md:px-8 md:py-5"
      >
        <div className="mx-auto flex max-w-[1600px] w-full items-end justify-between gap-6">
          {/* Far left: local time */}
          <div className="font-mono text-xs text-body md:text-sm">
            <div>Local time</div>
            <div><strong>{localTime || "—"}</strong></div>
          </div>

          {/* Center: social links */}
          <div className="flex flex-col items-center gap-1 font-mono text-xs text-body md:text-sm">
            <a
              href="https://www.instagram.com/andrerasii/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              Instagram
            </a>
            <a
              href="https://github.com/andreee06"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/andre-rasi-40b0ba355/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
            >
              LinkedIn
            </a>
          </div>

          {/* Far right: copyright + name */}
          <div className="text-right font-mono text-xs text-body md:text-sm">
            <div><strong>© 2026</strong></div>
            <div><strong>RASII</strong></div>
          </div>
        </div>
      </footer>

    </section>
  );
}
