'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

export default function NotFound() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        linkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <main
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '15vw',
          color: '#700000',
          margin: 0,
          opacity: 0,
        }}
      >
        404.
      </h1>
      <p
        ref={subtitleRef}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: '#b9b9b9',
          letterSpacing: '0.2em',
          margin: 0,
          opacity: 0,
        }}
      >
        Even explorers get lost.
      </p>
      <Link
        ref={linkRef}
        href="/"
        className="hover-underline"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: '#700000',
          opacity: 0,
          marginTop: '0.5rem',
        }}
      >
        ← Back to home
      </Link>
    </main>
  )
}

