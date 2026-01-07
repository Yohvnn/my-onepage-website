<template>
  <div
    class="h-full bg-background text-foreground overflow-hidden flex flex-col transition-all duration-300 ease-in-out relative"
    :class="{ 'dark-mode': isDarkMode }"
  >
    <!-- Background Video (Only for Home) -->
    <div v-if="$route.name === 'Home'" class="absolute inset-0 w-full h-full z-0">
      <video class="w-full h-full object-cover" autoplay loop muted playsinline>
        <source src="/gallery/background.mp4" type="video/mp4" />
        {{ $t('app.videoNotSupported') }}
      </video>
      <!-- Dark Overlay for Dark Mode -->
      <div v-if="isDarkMode" :key="'dark-overlay'" class="absolute inset-0 bg-black bg-opacity-80 transition-colors duration-300"></div>
      <!-- Bright Overlay for Light Mode -->
      <div v-else :key="'light-overlay'" class="absolute inset-0 bg-white bg-opacity-80 transition-colors duration-300"></div>
    </div>

    <div v-if="isLoading" class="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <LoaderBar :progress="loadingProgress" :label="$t('app.loading')" />
    </div>
    <div
      v-else
      class="w-full relative flex-grow flex flex-col h-full overflow-auto smooth-scroll scroll-container z-10"
    >
      <div class="pt-4 relative z-10 flex flex-col h-full" :key="locale">
        <AppHeader />
        <main class="flex-1 gap-8 lg:mt-15 mt-10 pl-4 pr-4">
          <router-view />
        </main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDarkMode } from './composables/useDarkMode'
import { useLoader } from './composables/useLoader'
import { useLazyImages } from './composables/useLazyImages'
import { useScrollPerformance } from './composables/useScrollPerformance'
import { useRoute } from 'vue-router'
import LoaderBar from './components/ui/LoaderBar.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const { isDarkMode } = useDarkMode()
const { isLoading, loadingProgress, startLoader } = useLoader()
const { setupImageLazyLoading, cleanupLazyLoading } = useLazyImages()
const { optimizeScrollPerformance, cleanupScrollPerformance } = useScrollPerformance()
const $route = useRoute()
const { locale } = useI18n()

onMounted(() => {
  setupImageLazyLoading()
  startLoader()
  optimizeScrollPerformance()
})

onBeforeUnmount(() => {
  cleanupLazyLoading()
  cleanupScrollPerformance()
})

// Watch for changes in isDarkMode to ensure reactivity
watch(isDarkMode, (newVal) => {
  console.log('Dark mode changed:', newVal)
})
</script>

