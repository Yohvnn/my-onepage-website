<template>
  <header class="py-3">
    <div class="flex flex-col md:flex-row items-center md:justify-between">
        <div class="flex items-center  md:mb-0 mb-3">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold tracking-wide text-foreground">YOHANN CHAN CHEW HONG</h1>
            <p class="text-muted">Junior Gen AI Research Engineer</p>
          </div>
        </div>
        <div class="flex space-x-2 items-center">
          <!-- Dark Mode Toggle Button -->
          <button @click="$root.toggleDarkMode"
            class="rounded-md flex items-center justify-center p-2
            btn text-sm flex items-center w-9 h-9 hover:bg-border transition-colors duration-200">
            <i :class="$root.isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-muted transition-colors duration-200"></i>
          </button>
          
          <!-- Theme Button (triggers ColorPicker) -->
          <button @click="colorStore.open()"
            class="rounded-md flex items-center justify-center p-2
            btn text-sm flex items-center w-9 h-9 hover:bg-border transition-colors duration-200">
            <i class="fas fa-palette text-muted transition-colors duration-200"></i>
          </button>

          <a href="mailto:cchongyohann@gmail.com" class="btn py-2 px-4 rounded-md btn-contact bg-accent dark:bg-accent text-sm flex items-center">
            <i class="fas fa-envelope mr-2 "></i> Contact Me
          </a>
        </div>
      </div>
  </header>
</template>

<script setup>
import { useColorPickerStore } from '@/lib/colorPickerStore'

const colorStore = useColorPickerStore()
</script>
