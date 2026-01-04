<template>
  <div class="w-full lg:w-80 p-4 rounded-lg bg-background" role="group" aria-label="Loading status">
  <div class="text-center text-lg font-semibold mb-2">YohannStudio<span class="">.</span></div>
    <div class="flex items-center justify-between mb-2">
      <div class="text-sm text-muted"></div>
      <div class="text-sm font-mono text-accent">{{ Math.round(progress) }}%</div>
    </div>
    <div class="w-full bg-border rounded-full h-1 overflow-hidden" role="progressbar" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="Math.round(progress)">
      <div class="bg-primary h-1 rounded-full" :style="{ width: Math.max(0, Math.min(100, progress)) + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  progress: { type: Number, default: 0 },
  label: { type: String, default: 'Loading.' }
})
</script>

<style scoped>
</style>
