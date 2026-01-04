import { ref } from 'vue'

export function useScrollPerformance() {
  const throttledScrollHandler = ref(null)

  function throttle(callback, limit) {
    let waiting = false
    return function () {
      if (!waiting) {
        callback.apply(this, arguments)
        waiting = true
        setTimeout(() => {
          waiting = false
        }, limit)
      }
    }
  }

  function optimizeScrollPerformance() {
    const contentContainer = document.querySelector('.overflow-auto')
    if (contentContainer) {
      contentContainer.style.willChange = 'transform'
      contentContainer.style.transform = 'translateZ(0)'

      const handler = throttle(() => {
        // Placeholder for scroll-based animations
      }, 100)
      contentContainer.addEventListener('scroll', handler, { passive: true })
      throttledScrollHandler.value = handler
    }
  }

  function cleanupScrollPerformance() {
    const contentContainer = document.querySelector('.overflow-auto')
    if (contentContainer && throttledScrollHandler.value) {
      contentContainer.removeEventListener('scroll', throttledScrollHandler.value)
    }
  }

  return { optimizeScrollPerformance, cleanupScrollPerformance, throttledScrollHandler }
}
