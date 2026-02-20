import { onMounted, onUnmounted, nextTick } from 'vue'

export function useScrollReveal() {
  let observer = null

  function init() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')

    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px 0px 0px'
      }
    )

    elements.forEach((el) => observer.observe(el))
  }

  function destroy() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    nextTick(() => {
      setTimeout(init, 50)
    })
  })

  onUnmounted(() => {
    destroy()
  })

  return { init, destroy }
}
