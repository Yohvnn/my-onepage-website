import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDarkMode = ref(localStorage.getItem('isDarkMode') === 'true')

  function applyInitialDarkModeTransition() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('isDarkMode', isDarkMode.value)

    // Reload the page to ensure all styles are applied
    window.location.reload();
  }

  watch(isDarkMode, (newVal) => {
    if (newVal) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    document.documentElement.classList.toggle('dark', newVal)
    document.documentElement.offsetHeight
  })

  // Ensure the initial state is applied on mount
  onMounted(() => {
    applyInitialDarkModeTransition()
  })

  return { isDarkMode, toggleDarkMode }
}
