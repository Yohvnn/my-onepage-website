<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()
const programmingSkills = tm('skills.programming')
const databaseSkills = tm('skills.database')
const webSkills = tm('skills.web')
const mediaSkills = tm('skills.media')
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
/* Minimal list presentation */
</style>