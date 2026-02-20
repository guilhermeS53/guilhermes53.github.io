import { ref } from 'vue'

const theme = ref('dark')

export function useTheme() {
  function setTheme(newTheme) {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = newTheme === 'dark' ? '#0b1220' : '#f8fafc'
  }

  /**
   * Toggle com View Transition API — circular reveal a partir do botão.
   * Fallback instantâneo se o browser não suportar.
   */
  function toggleTheme(event) {
    const current = document.documentElement.getAttribute('data-theme') || 'dark'
    const next = current === 'dark' ? 'light' : 'dark'

    // Fallback pra browsers sem View Transition API
    if (!document.startViewTransition) {
      setTheme(next)
      return
    }

    // Pega a posição do clique (centro do botão) pra origin do circle
    const x = event?.clientX ?? window.innerWidth / 2
    const y = event?.clientY ?? 0

    // Raio máximo: diagonal da tela a partir do ponto de clique
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Define a origin como CSS custom property
    document.documentElement.style.setProperty('--vt-x', `${x}px`)
    document.documentElement.style.setProperty('--vt-y', `${y}px`)
    document.documentElement.style.setProperty('--vt-r', `${maxRadius}px`)

    const transition = document.startViewTransition(() => {
      setTheme(next)
    })

    transition.ready.then(() => {
      // Anima o clip-path circular expandindo do ponto de clique
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 800,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  function initTheme() {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
      return
    }

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    setTheme(prefersDark ? 'dark' : 'light')
  }

  return { theme, setTheme, toggleTheme, initTheme }
}
