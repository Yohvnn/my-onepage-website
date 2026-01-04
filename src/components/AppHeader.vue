<template>
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
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

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
  clockTimer = setInterval(() => {
    now.value = new Date()
    timeString.value = formatter.format(now.value)
  }, 30000)
})

onBeforeUnmount(() => {
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<style scoped>
.timer-colon-animate {
  animation: timer-blink 1.2s steps(1, end) infinite;
}
@keyframes timer-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.2; }
}
</style>
