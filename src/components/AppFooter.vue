<template>
  <footer class="text-base text-foreground font-light pt-4 pl-1 pr-1 pb-4 flex items-center justify-between flex-wrap gap-3">
    <a href="mailto:hello@yohanncch.studio" class="link bg-background border rounded-full px-3 py-1 shadow-sm" :aria-label="t('app.contactEmail')">
      <span class="text-primary">hello</span><span class="">@yohanncch.studio</span>
    </a>
    <div class="flex items-center gap-2 ml-auto">
      <button @click="toggleDarkMode" class="btn h-9 px-3 rounded-full bg-background border hover:bg-border flex items-center gap-2 shadow-sm " :aria-label="t('app.toggleDarkMode')">
        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class=""></i>
        <span class="text-sm">{{ isDarkMode ? t('app.light') : t('app.dark') }}</span>
      </button>
      <!-- translate button -->
      <button @click="toggleLanguage" class="btn h-9 px-3 rounded-full bg-background border hover:bg-border flex items-center gap-2 shadow-sm" :aria-label="t('app.toggleLanguage')">
        <i class="fas fa-language"></i>
        <span class="text-sm">{{ currentLanguage === 'en' ? 'FR' : 'EN' }}</span>
      </button>
    </div>
  </footer>
</template>

<script setup>
import { useDarkMode } from '../composables/useDarkMode'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { isDarkMode, toggleDarkMode } = useDarkMode()
const { locale, t } = useI18n()

const currentLanguage = computed(() => locale.value)
const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'fr' : 'en'
}
</script>
