import { ref, nextTick } from 'vue'

export function useLazyImages() {
  const imageObserver = ref(null)

  function setupImageLazyLoading() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    imageObserver.value = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.getAttribute('data-src')
          if (src) {
            img.src = src
            img.removeAttribute('data-src')
          }
          observer.unobserve(img)
        }
      })
    }, options)

    nextTick(() => {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]')
      lazyImages.forEach(img => imageObserver.value.observe(img))
    })
  }

  function cleanupLazyLoading() {
    if (imageObserver.value) {
      imageObserver.value.disconnect()
    }
  }

  return { imageObserver, setupImageLazyLoading, cleanupLazyLoading }
}
