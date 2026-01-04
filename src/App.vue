<template>
  <div
    class="h-screen bg-background text-foreground overflow-hidden flex flex-col transition-all duration-300 ease-in-out relative"
  >
    <!-- Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <LoaderBar :progress="loadingProgress" label="Loading" />
    </div>

    <div
      v-else
      class="w-full relative flex-grow flex flex-col h-full overflow-auto smooth-scroll scroll-container"
      :class="[isStudioHome ? 'bg-cover bg-center bg-no-repeat bg-local' : '']"
      :style="isStudioHome ? { backgroundImage: `url('/wall.jpg')` } : {}"
    >
      <!-- Contrast overlay inside scroll container so it scrolls with content -->
      <div v-if="isStudioHome" aria-hidden="true" class="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-black/30 to-black/20 z-0"></div>
      <div class="p-4 relative z-10 flex flex-col h-full">
      <!-- Global Minimal Header (moved from StudioHome.vue) -->
      <header class="mb-4">
        <div class="flex items-center justify-between">
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
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--color-primary)"></span>
            <span class="text-sm text-muted">{{ timeString }}</span>
          </div>
        </div>
      </header>

      <!-- Router View -->
      <main class="flex-1">
        <router-view />
      </main>

      <!-- App Footer -->
      <footer class="mt-auto pt-4 flex items-center justify-between flex-wrap gap-3">
        <a href="mailto:hello@yohanncch.studio" class="link bg-background border rounded-full px-3 py-1 shadow-sm" aria-label="Contact via email">
          hello@yohanncch.studio
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
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
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

// Route-based background: show wall only on StudioHome
const route = useRoute()
const isStudioHome = computed(() => route.path === '/' || route.name === 'StudioHome')

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

</style>