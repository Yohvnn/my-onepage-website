<template>
  <div class="lg:mt-20 mt-10 animate-fade-in">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-5xl">{{ t('toolbox.title') }}</h2>
      <p class="text-muted text-2xl mt-2">{{ t('toolbox.subtitle') }}</p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- PDF Tools Card -->
      <div class="rounded-lg border px-4 py-3 opacity-50">
        <h3 class="text-lg font-medium mb-2">{{ t('toolbox.pdf.title') }}</h3>
        <p class="text-muted text-base">{{ t('toolbox.pdf.desc') }}</p>
        <div class="mt-4 flex gap-2">
          <span v-for="tag in (tm('toolbox.pdf.tags') || [])" :key="tag" class="inline-block px-2 py-1 bg-border text-foreground rounded text-sm">{{ tag }}</span>
        </div>
        <span class="mt-4 inline-block px-3 py-1 bg-border text-muted rounded text-sm">{{ t('toolbox.pdf.comingSoon') }}</span>
      </div>

      <!-- Tic Tac Toe Card -->
      <div class="rounded-lg border px-4 py-3 opacity-50">
        <h3 class="text-lg font-medium mb-2">{{ t('toolbox.tictactoe.title') }}</h3>
        <p class="text-muted text-base">{{ t('toolbox.tictactoe.desc') }}</p>
        <div class="mt-4 flex gap-2">
          <span v-for="tag in (tm('toolbox.tictactoe.tags') || [])" :key="tag" class="inline-block px-2 py-1 bg-border text-foreground rounded text-sm">{{ tag }}</span>
        </div>
        <span class="mt-4 inline-block px-3 py-1 bg-border text-muted rounded text-sm">{{ t('toolbox.tictactoe.comingSoon') }}</span>
      </div>

      <!-- Flip Coin Card -->
      <div class="rounded-lg border px-4 py-3 opacity-50">
        <h3 class="text-lg font-medium mb-2">{{ t('toolbox.flipcoin.title') }}</h3>
        <p class="text-muted text-base">{{ t('toolbox.flipcoin.desc') }}</p>
        <div class="mt-4 flex gap-2">
          <span v-for="tag in (tm('toolbox.flipcoin.tags') || [])" :key="tag" class="inline-block px-2 py-1 bg-border text-foreground rounded text-sm">{{ tag }}</span>
        </div>
        <span class="mt-4 inline-block px-3 py-1 bg-border text-muted rounded text-sm">{{ t('toolbox.flipcoin.comingSoon') }}</span>
      </div>

      <!-- RAG Chatbot Card (Coming Soon) -->
      <div class="rounded-lg border px-4 py-3 opacity-50">
        <h3 class="text-lg font-medium mb-2">{{ t('toolbox.rag.title') }}</h3>
        <p class="text-muted text-base">{{ t('toolbox.rag.desc') }}</p>
        <div class="mt-4 flex gap-2">
          <span v-for="tag in (tm('toolbox.rag.tags') || [])" :key="tag" class="inline-block px-2 py-1 bg-border text-foreground rounded text-sm">{{ tag }}</span>
        </div>
        <span class="mt-4 inline-block px-3 py-1 bg-border text-muted rounded text-sm">{{ t('toolbox.rag.comingSoon') }}</span>
      </div>
    </div>

    <!-- Coming Soon Section -->
    <div class="mt-8">
      <h3 class="text-xl font-medium tracking-tight text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        {{ t('toolbox.comingSoonTitle') }}
      </h3>
      <p class="text-muted">{{ t('toolbox.comingSoonText') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, tm } = useI18n({ useScope: 'global' })
</script>