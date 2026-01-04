<template>
  <div class="h-full">
    <div class="grid lg:grid-cols-2 gap-8 h-full min-h-full">
      <!-- Left: Hero -->
      <section class="flex items-start lg:self-start">
        <div class="max-w-5xl lg:mt-20 mt-5 flex flex-col items-start animate-float-in">
          <h1 class="leading-[0.95] lg:text-5xl text-3xl font-light">
            {{ t('toolbox.title') }}
          </h1>
          <p class="text-muted lg:text-2xl text-xl mt-3 font-light">{{ t('toolbox.subtitle') }}</p>
        </div>
      </section>

      <!-- Right: Tools stack -->
      <section class="mt-12 lg:mt-0 flex flex-col gap-4 lg:self-center" aria-label="Toolbox overview">
        <div class="flex flex-col gap-3 lg:pl-6 lg:border-l lg:border-border w-full">
          <ul class="space-y-3">
            <li class="animate-fade-in opacity-50">
              <div class="flex text-base flex-col">
                <span class="text-foreground">{{ t('toolbox.pdf.title') }}</span>
                <span class="text-muted">{{ t('toolbox.pdf.desc') }}</span>
                <span class="text-muted text-sm">{{ t('toolbox.pdf.comingSoon') }}</span>
              </div>
            </li>

            <li class="animate-fade-in opacity-50">
              <div class="flex text-base flex-col">
                <span class="text-foreground">{{ t('toolbox.tictactoe.title') }}</span>
                <span class="text-muted">{{ t('toolbox.tictactoe.desc') }}</span>
                <span class="text-muted text-sm">{{ t('toolbox.tictactoe.comingSoon') }}</span>
              </div>
            </li>

            <li class="animate-fade-in opacity-50">
              <div class="flex text-base flex-col">
                <span class="text-foreground">{{ t('toolbox.flipcoin.title') }}</span>
                <span class="text-muted">{{ t('toolbox.flipcoin.desc') }}</span>
                <span class="text-muted text-sm">{{ t('toolbox.flipcoin.comingSoon') }}</span>
              </div>
            </li>

            <li class="animate-fade-in opacity-50">
              <div class="flex text-base flex-col">
                <span class="text-foreground">{{ t('toolbox.rag.title') }}</span>
                <span class="text-muted">{{ t('toolbox.rag.desc') }}</span>
                <span class="text-muted text-sm">{{ t('toolbox.rag.comingSoon') }}</span>
              </div>
            </li>
          </ul>

          <div class="pt-4">
            <p class="text-muted text-base">
              {{ t('toolbox.comingSoonText') }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>