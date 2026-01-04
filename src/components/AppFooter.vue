<template>
  <footer class="text-base text-foreground font-light pt-4 pl-1 pr-1 pb-4 flex items-center justify-between flex-wrap gap-3">
    <a href="mailto:hello@yohanncch.studio" class="link bg-background border rounded-full px-3 py-1 shadow-sm" aria-label="Contact via email">
      <span class="text-primary">hello</span><span class="">@yohanncch.studio</span>
    </a>
    <button @click="toggleDarkMode" class="btn h-9 px-3 rounded-full bg-background border hover:bg-border flex items-center gap-2 shadow-sm " aria-label="Toggle dark mode">
      <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class=""></i>
      <span class="text-sm">{{ isDarkMode ? 'Light' : 'Dark' }}</span>
    </button>
  </footer>
</template>

<script setup>
import { useDarkMode } from '../composables/useDarkMode'

const { isDarkMode, toggleDarkMode } = useDarkMode()
</script>
