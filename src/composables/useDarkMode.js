import { ref } from 'vue'

export function useDarkMode() {
  const isDarkMode = ref(localStorage.getItem('isDarkMode') === 'true')

  function applyInitialDarkModeTransition() {
    if (!isDarkMode.value) return

    const appElement = document.getElementById('app')
    if (appElement) appElement.classList.add('dark-mode-transition')
    document.documentElement.classList.add('dark-mode-transition')
    document.body.classList.add('dark-mode-transition')

    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')

    setTimeout(() => {
      if (appElement) appElement.classList.remove('dark-mode-transition')
      document.documentElement.classList.remove('dark-mode-transition')
      document.body.classList.remove('dark-mode-transition')
    }, 300)
  }

  function toggleDarkMode() {
    const appElement = document.getElementById('app')
    if (appElement) appElement.classList.add('dark-mode-transition')
    document.documentElement.classList.add('dark-mode-transition')
    document.body.classList.add('dark-mode-transition')

    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('isDarkMode', isDarkMode.value)

    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }

    setTimeout(() => {
      if (appElement) appElement.classList.remove('dark-mode-transition')
      document.documentElement.classList.remove('dark-mode-transition')
      document.body.classList.remove('dark-mode-transition')
    }, 300)
  }

  return { isDarkMode, toggleDarkMode, applyInitialDarkModeTransition }
}
