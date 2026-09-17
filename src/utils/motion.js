/** Shared Framer Motion presets — opacity + transform only for smooth GPU compositing */
export const easeSmooth = [0.22, 1, 0.36, 1]

export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -60px 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: easeSmooth },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.05, ease: easeSmooth },
  }),
}
