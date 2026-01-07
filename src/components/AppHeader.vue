<template>
  <header class="pl-4 pr-4 mb-4">
    <div class="relative flex items-center justify-start sm:justify-between flex-nowrap sm:flex-wrap">
      <div class="flex items-center gap-2">
        <router-link to="/" class="font-semibold text-lg link" :aria-label="t('nav.goHome')">{{ t('app.brand') }}</router-link>
      </div>
      <!-- Desktop Nav -->
      <nav id="primary-navigation" class="hidden sm:flex items-center gap-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:z-40">
        <router-link to="/tools" custom v-slot="{ href, navigate, isExactActive }">
          <a :href="href" @click="navigate" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">{{ t('nav.toolbox') }}</a>
        </router-link>
        <router-link to="/gallery" custom v-slot="{ href, navigate, isExactActive }">
          <a :href="href" @click="navigate" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">{{ t('nav.gallery') }}</a>
        </router-link>
        <router-link to="/resume" custom v-slot="{ href, navigate, isExactActive }">
          <a :href="href" @click="navigate" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">{{ t('nav.resume') }}</a>
        </router-link>
      </nav>
      <!-- Mobile Hamburger Button -->
      <button
        class="sm:hidden inline-flex items-center p-2 rounded"
        :aria-expanded="isMenuOpen"
        :aria-label="t('nav.toggleNavigation')"
        aria-controls="mobile-navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </button>
      <div class="flex items-center gap-2 ml-auto w-auto justify-end sm:justify-start mt-0 cursor-pointer relative"
           @click="onTimerClick"
           aria-label="Timer and session shortcuts hint">
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
        <transition name="fade">
          <div v-if="showTooltip"
               role="tooltip"
               class="absolute -bottom-8 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded shadow whitespace-nowrap italic z-50">
            {{ t('nav.timerTooltip') }}
          </div>
        </transition>
      </div>
    </div>
    <!-- Mobile Nav Panel -->
    <transition name="menu">
      <nav
        id="mobile-navigation"
        v-if="isMenuOpen"
        class="sm:hidden absolute right-0 z-50 mt-0"
      >
        <div class="flex justify-end gap-2 px-4 py-3">
          <router-link to="/tools" custom v-slot="{ href, navigate, isExactActive }">
            <a :href="href" @click="(e) => { navigate(e); isMenuOpen = false }" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">{{ t('nav.toolbox') }}</a>
          </router-link>
          <router-link to="/gallery" custom v-slot="{ href, navigate, isExactActive }">
            <a :href="href" @click="(e) => { navigate(e); isMenuOpen = false }" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">{{ t('nav.gallery') }}</a>
          </router-link>
          <router-link to="/resume" custom v-slot="{ href, navigate, isExactActive }">
            <a :href="href" @click="(e) => { navigate(e); isMenuOpen = false }" class="nav-link" :class="{ 'link-active': isExactActive }" :aria-current="isExactActive ? 'page' : null">{{ t('nav.resume') }}</a>
          </router-link>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const now = ref(new Date())
const isMenuOpen = ref(false)
const showTooltip = ref(false)
const locale = navigator.language || 'en-US'
const formatter = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
})
const timeString = ref(formatter.format(now.value))
let clockTimer
let tooltipTimer

const { t } = useI18n()

onMounted(() => {
  clockTimer = setInterval(() => {
    now.value = new Date()
    timeString.value = formatter.format(now.value)
  }, 30000)
})

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (tooltipTimer) clearTimeout(tooltipTimer)
})

function onTimerClick() {
  showTooltip.value = true
  if (tooltipTimer) clearTimeout(tooltipTimer)
  tooltipTimer = setTimeout(() => {
    showTooltip.value = false
  }, 2500)
}
</script>

<style scoped>
.timer-colon-animate {
  animation: timer-blink 1.2s steps(1, end) infinite;
}
@keyframes timer-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.2; }
}

/* Mobile menu slide/fade transition */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.menu-enter-to,
.menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Tooltip fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
