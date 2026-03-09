'use client'
import { useEffect } from 'react'
import Spline from '@splinetool/react-spline/next'

export function HeroCanvas() {
  useEffect(() => {
    const interval = setInterval(() => {
      const logo = document.getElementById('logo')
      if (logo) {
        logo.style.display = 'none'
        clearInterval(interval)
      }
    }, 500)
    return () => clearInterval(interval)
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
    </div>
  )
}
