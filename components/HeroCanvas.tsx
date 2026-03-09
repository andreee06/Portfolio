'use client'

import { useEffect } from 'react'
import Spline from '@splinetool/react-spline/next'

export function HeroCanvas() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Target the Spline watermark button that is injected dynamically
      const selectors = [
        '#logo',
        'a[href*="spline.design"]',
        '[data-spline-tooltip]',
        'canvas + div > a',
      ]
      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          (el as HTMLElement).style.setProperty('display', 'none', 'important')
        })
      })
    })

    // Observe the entire document for any injected nodes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup on unmount
    return () => observer.disconnect()
  }, [])

  return (
    <div
      data-gsap="spline"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <Spline
        scene="https://prod.spline.design/5-Cv3fBqf9lox3Aw/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '240px',
          height: '60px',
          background: 'linear-gradient(to right, transparent, #000001 40%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
