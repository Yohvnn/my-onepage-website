<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale, getLocaleMessage } = useI18n()
const programmingSkills = computed(() => (getLocaleMessage(locale.value)?.skills?.programming) || [])
const databaseSkills = computed(() => (getLocaleMessage(locale.value)?.skills?.database) || [])
const webSkills = computed(() => (getLocaleMessage(locale.value)?.skills?.web) || [])
const mediaSkills = computed(() => (getLocaleMessage(locale.value)?.skills?.media) || [])
</script>

<template>
  <div class="space-y-6">
    <div class="animate-fade-in">
      <span class="text-base">{{ t('skills.titles.programming') }}</span>
      <span class="block text-base text-muted">{{ programmingSkills.join(', ') }}</span>
    </div>

    <div class="animate-fade-in">
      <span class="text-base">{{ t('skills.titles.database') }}</span>
      <span class="mt-1 block text-base text-muted">{{ databaseSkills.join(', ') }}</span>
    </div>

    <div class="animate-fade-in">
      <span class="text-base">{{ t('skills.titles.web') }}</span>
      <span class="mt-1 block text-base text-muted">{{ webSkills.join(', ') }}</span>
    </div>

    <div class="animate-fade-in">
      <span class="text-base">{{ t('skills.titles.media') }}</span>
      <span class="mt-1 block text-base text-muted">{{ mediaSkills.join(', ') }}</span>
    </div>
  </div>
  
</template>

<style scoped>
</style>