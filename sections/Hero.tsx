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
  const [localTime, setLocalTime] = useState("");

  useGSAP(
    () => {
      // Initial states
      gsap.set('[data-gsap="spline"]', { opacity: 0 });
      gsap.set('[data-gsap="top-bar"]', { opacity: 0, y: -20 });
      gsap.set('[data-gsap="andre-text"]', { opacity: 0, y: 20 });
      gsap.set('[data-gsap="rasi-text"]', { opacity: 0, y: 20 });
      gsap.set('[data-gsap="bio-para"]', { opacity: 0, y: 15 });
      gsap.set('[data-gsap="bottom-bar"]', { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.1 });

      // Mountain + sphere fade in
      tl.to('[data-gsap="spline"]', {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      })
        // Text elements fade in with micro-stagger
        .to(
          [
            '[data-gsap="top-bar"]',
            '[data-gsap="andre-text"]',
            '[data-gsap="rasi-text"]',
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
      className="relative overflow-hidden"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "transparent",
      }}
    >
      {/* Full-viewport Spline background (behind all content) */}
      <HeroCanvas />

      {/* Top bar */}
      <header
        data-gsap="top-bar"
        className="fixed top-0 left-0 right-0 w-full px-6 py-4 md:px-8 md:py-5"
        style={{ zIndex: 100, backgroundColor: "#000000", pointerEvents: "auto" }}
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
            className="flex flex-col items-end gap-1 font-mono text-xs text-body md:text-sm"
            style={{ position: "relative", zIndex: 60 }}
          >
            <a
              href="/"
              className="hover-underline"
              style={{
                cursor: "pointer",
                position: "relative",
                zIndex: 60,
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              Home
            </a>
            <a
              href="#"
              className="hover-underline"
              style={{ cursor: "pointer", position: "relative", zIndex: 60 }}
              aria-disabled="true"
              aria-label="Projects - Coming soon"
              onClick={(e) => e.preventDefault()}
            >
              Projects (Coming soon)
            </a>
          </nav>
        </div>
      </header>

      {/* Hero center: 3-column layout */}
      <div
        className="flex min-h-screen w-full items-center justify-between px-6 py-24 md:px-10 lg:px-16"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Far left: name heading */}
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="leading-tight text-white">
            <span
              data-gsap="andre-text"
              className="font-bonheur block"
              style={{ fontSize: "clamp(1.8rem, 12vw, 8.5rem)" }}
            >
              Depth
            </span>
            <span
              data-gsap="rasi-text"
              className="font-bebas block font-bold uppercase tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 12vw, 8.5rem)",
                marginTop: "-0.15em",
              }}
            >
              Explorer.
            </span>
          </h1>
        </div>

        {/* Center column: spacer (Spline is full-viewport background) */}
        <div
          className="hidden shrink-0 md:block"
          style={{ width: "35vw", height: "35vw" }}
          aria-hidden
        />

        {/* Far right: bio paragraph */}
        <div className="flex flex-1 justify-end">
          <div data-gsap="bio-para" style={{ maxWidth: "410px" }}>
            <p
              style={{
                marginBottom: "1.2em",
                color: "#b9b9b9",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                lineHeight: "1.7",
              }}
            >
              Hi, I&apos;m Andre — a <strong>Software Developer</strong> and <strong>Cloud Engineer</strong>.
              Driven by curiosity, built on persistence.
            </p>
            <p
              style={{
                color: "#b9b9b9",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                lineHeight: "1.7",
              }}
            >
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
        className="fixed bottom-0 left-0 right-0 w-full px-6 py-4 md:px-8 md:py-5"
        style={{ zIndex: 10 }}
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
            <div><strong>ANDRE RASI</strong></div>
          </div>
        </div>
      </footer>

      {/* Cover Spline watermark in bottom-right corner */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "220px",
          height: "60px",
          background: "#000000",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
