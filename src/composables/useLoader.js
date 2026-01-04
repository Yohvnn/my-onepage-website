import { ref } from 'vue'

export function useLoader() {
  const isLoading = ref(true)
  const loadingProgress = ref(0)

  let rafId = null
  let timeoutId = null

  function clamp(val) {
    return Math.max(0, Math.min(100, val))
  }

  // Smoothly animate progress to a target over a duration (ms)
  function animateTo(target, duration, onDone) {
    const start = performance.now()
    const startValue = loadingProgress.value
    const delta = clamp(target) - startValue

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function step(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = easeInOutCubic(t)
      loadingProgress.value = clamp(startValue + delta * eased)
      if (t < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        loadingProgress.value = clamp(target)
        if (onDone) onDone()
      }
    }

    rafId = requestAnimationFrame(step)
  }

  function pause(ms, next) {
    timeoutId = setTimeout(next, ms)
  }

  function startLoader() {
    // Reset state
    isLoading.value = true
    loadingProgress.value = 0

    // Simulated realistic loading timeline with brief pauses
    animateTo(25, 250, () => {
      pause(150, () => {
        animateTo(55, 400, () => {
          pause(200, () => {
            animateTo(85, 500, () => {
              pause(200, () => {
                animateTo(100, 300, () => {
                  pause(100, () => {
                    isLoading.value = false
                  })
                })
              })
            })
          })
        })
      })
    })
  }

  function cancelLoader() {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return { isLoading, loadingProgress, startLoader, cancelLoader }
}
