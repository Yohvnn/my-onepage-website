<template>
  <div
    class="h-full bg-background text-foreground overflow-hidden flex flex-col transition-all duration-300 ease-in-out relative"
  >
    <!-- Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <LoaderBar :progress="loadingProgress" label="Loading." />
    </div>

    <div
      v-else
      class="w-full relative flex-grow flex flex-col h-full overflow-auto smooth-scroll scroll-container"
    >
      <div class="pt-4 relative z-10 flex flex-col h-full">
      <!-- Global Minimal Header (moved from StudioHome.vue) -->
      <header class="pl-4 pr-4 mb-4">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex items-center gap-2">
            <router-link to="/" class="font-semibold text-lg link" aria-label="Go to Home">YohannStudio.</router-link>
          </div>
          <!-- Horizontal Nav between brand and time -->
          <nav class="flex items-center gap-4">
            <router-link to="/tools" custom v-slot="{ href, navigate, isExactActive }">
              <a :href="href" @click="navigate" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">TOOLS</a>
            </router-link>
            <router-link to="/gallery" custom v-slot="{ href, navigate, isExactActive }">
              <a :href="href" @click="navigate" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">GALLERY</a>
            </router-link>
            <router-link to="/resume" custom v-slot="{ href, navigate, isExactActive }">
              <a :href="href" @click="navigate" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">RESUME</a>
            </router-link>
          </nav>
          <div class="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start mt-2 sm:mt-0">
            <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--color-primary)"></span>
            <span class="text-sm text-muted font-light">
              <template v-if="timeString.includes(':')">
                <span style="white-space:nowrap">
                  {{ timeString.split(':')[0] }}<span class="timer-colon-animate">:</span>{{ timeString.split(':')[1].split(' ')[0] }}
                </span>
                <span v-if="timeString.split(' ').length > 1">&nbsp;{{ timeString.split(' ').slice(1).join(' ') }}</span>
              </template>
              <template v-else>
                {{ timeString }}
              </template>
            </span>
          </div>
        </div>
      </header>

      <!-- Router View -->
      <main class="flex-1 pl-4 pr-4">
        <router-view />
      </main>

      <!-- App Footer -->
      <footer class="pt-4 pl-1 pr-1 pb-4 flex items-center justify-between flex-wrap gap-3">
        <a href="mailto:hello@yohanncch.studio" class="link bg-background border rounded-full px-3 py-1 shadow-sm" aria-label="Contact via email">
          <span class="text-primary">hello</span><span class="text-muted">@yohanncch.studio</span>
        </a>
        <button @click="toggleDarkMode" class="btn h-9 px-3 rounded-full bg-background border hover:bg-border flex items-center gap-2 shadow-sm" aria-label="Toggle dark mode">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-accent"></i>
          <span class="text-sm">{{ isDarkMode ? 'Light' : 'Dark' }}</span>
        </button>
      </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useDarkMode } from './composables/useDarkMode'
import { useLoader } from './composables/useLoader'
import { useLazyImages } from './composables/useLazyImages'
import { useScrollPerformance } from './composables/useScrollPerformance'
import LoaderBar from './components/ui/LoaderBar.vue'

const { isDarkMode, toggleDarkMode, applyInitialDarkModeTransition } = useDarkMode()
const { isLoading, loadingProgress, startLoader } = useLoader()
const { setupImageLazyLoading, cleanupLazyLoading } = useLazyImages()
const { optimizeScrollPerformance, cleanupScrollPerformance } = useScrollPerformance()

// Shared clock/timezone display (moved from StudioHome.vue)
const now = ref(new Date())
const locale = navigator.language || 'en-US'
const formatter = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
})
const timeString = ref(formatter.format(now.value))
let clockTimer

onMounted(() => {
  applyInitialDarkModeTransition()
  setupImageLazyLoading()
  startLoader()
  optimizeScrollPerformance()
  clockTimer = setInterval(() => {
    now.value = new Date()
    timeString.value = formatter.format(now.value)
  }, 30000)
})

onBeforeUnmount(() => {
  cleanupLazyLoading()
  cleanupScrollPerformance()
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<style>
.timer-colon-animate {
  animation: timer-blink 1.2s steps(1, end) infinite;
}
@keyframes timer-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.2; }
}

</style>