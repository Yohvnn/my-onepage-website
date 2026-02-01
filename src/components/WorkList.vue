<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, getLocaleMessage } = useI18n()
const items = computed(() => (getLocaleMessage(locale.value)?.work?.items) || [])
</script>

<template>
  <div>
    <ul class="space-y-3">
      <li v-for="(work, idx) in items" :key="idx" class="animate-fade-in">
        <div class="flex text-base flex-col">
          <span class="text-foreground">{{ work.date }}</span>
          <span class="text-foreground">{{ work.title }}</span>
          <span class="text-muted">{{ work.org }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>