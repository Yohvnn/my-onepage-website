<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n()
</script>

<template>
  <Transition name="fade-up" appear>
    <div class="">
    <h2 class="text-xl font-medium tracking-tight border-l-2 border-primary pl-3 mb-3">{{ t('about.title') }}</h2>
    <p class="text-foreground/90 leading-relaxed text-base mb-4">{{ t('about.description') }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 class="font-medium tracking-tight mb-2">{{ t('about.servicesTitle') }}</h3>
        <ul class="list-disc pl-5 text-base text-muted">
          <li v-for="(svc, i) in tm('about.services')" :key="i">{{ svc }}</li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium tracking-tight mb-2">{{ t('about.stackTitle') }}</h3>
        <ul class="list-disc pl-5 text-base text-muted">
          <li v-for="(tech, i) in tm('about.stack')" :key="i">{{ tech }}</li>
        </ul>
      </div>
      <div>
        <h3 class="font-medium tracking-tight mb-2">{{ t('about.contactTitle') }}</h3>
        <p class="text-base text-muted">{{ t('about.contactText') }}</p>
        <div class="mt-3 flex gap-3">
          <a href="mailto:cchongyohann@gmail.com" class="link">{{ t('nav.contact') }}</a>
          <a href="https://github.com/Yohvnn/" target="_blank" rel="noopener" class="link">GitHub</a>
        </div>
      </div>
    </div>
    <!-- Credits Section -->
    <div class="mt-6">
      <h3 class="font-medium tracking-tight mb-2">Credits</h3>
      <p class="text-base text-muted">All photos and videos showcased here are captured by me during my various adventures.</p>
    </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-up-enter-active, .fade-up-leave-active {
  transition: opacity 250ms ease, transform 250ms ease;
}
.fade-up-enter-from, .fade-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
