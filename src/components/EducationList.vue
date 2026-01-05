<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, getLocaleMessage } = useI18n()
const items = computed(() => (getLocaleMessage(locale.value)?.education?.items) || [])
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