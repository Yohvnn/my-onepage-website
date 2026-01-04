<script setup>
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
const items = tm('education.items')
</script>

<template>
  <div>
    <ul class="space-y-3">
      <li v-for="(edu, idx) in items" :key="idx" class="animate-fade-in">
        <div class="flex text-base flex-col">
          <span class="text-foreground">{{ edu.date }}</span>
          <span class="text-foreground">{{ edu.title }}</span>
          <span class="text-muted">{{ edu.org }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Let CSS animations handle the entry animations */
</style>