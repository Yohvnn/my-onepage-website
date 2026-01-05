<template>
  <div class="pt-20 px-6 max-w-3xl mx-auto text-center">
    <h2 class="text-xl font-medium mb-2">{{ $t('notFound.title') }}</h2>
    <p class="text-muted mb-4">{{ $t('notFound.description') }}</p>
    <router-link to="/" class="nav-link text-base">{{ $t('notFound.backToStudio') }}</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
