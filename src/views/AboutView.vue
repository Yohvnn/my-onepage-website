<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-medium tracking-tight border-l-2 border-primary pl-3 mb-3">{{ t('about.title') }}</h2>
    <p class="text-foreground/90 leading-relaxed text-sm mb-4">{{ t('about.description') }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 class="font-medium tracking-tight mb-2">{{ t('about.servicesTitle') }}</h3>
        <ul class="list-disc pl-5 text-sm text-muted">
          <li v-for="(svc,i) in t('about.services')" :key="i">{{ svc }}</li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium tracking-tight mb-2">{{ t('about.contactTitle') }}</h3>
        <p class="text-sm text-muted">{{ t('about.contactText') }}</p>
        <div class="mt-3 flex gap-3">
          <a href="mailto:cchongyohann@gmail.com" class="link">{{ t('nav.contact') }}</a>
          <a href="https://github.com/Yohvnn/" target="_blank" rel="noopener" class="link">GitHub</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
