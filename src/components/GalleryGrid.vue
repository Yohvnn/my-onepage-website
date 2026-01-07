/* global defineProps, defineEmits */
<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select'])

// Track which images have finished loading to hide skeletons
const loaded = reactive({})

const { t } = useI18n()

function markLoaded(key) {
  if (!key) return
  loaded[key] = true
}

function onSelect(img) {
  emit('select', img)
}
</script>

<template>
  <div>
    <div v-if="!items.length" class="text-muted text-sm">{{ t('gallery.noPhotos') }}</div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <figure
        v-for="(img, i) in items"
        :key="img.url || i"
        class="group overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-muted/20 cursor-pointer"
        style="content-visibility:auto;contain-intrinsic-size:160px 320px"
        role="button"
        tabindex="0"
        @click="onSelect(img)"
        @keydown.enter.prevent="onSelect(img)"
      >
        <!-- Image with overlay skeleton so it can actually load -->
        <div class="relative w-full h-40">
          <img
            :src="img.thumb || img.url"
            :alt="img.title || t('gallery.photoAlt', { number: i+1 })"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 transition-opacity"
            :class="loaded[img.thumb || img.url] ? 'opacity-100' : 'opacity-0'"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            width="320"
            height="160"
            @load="markLoaded(img.thumb || img.url)"
            @error="markLoaded(img.thumb || img.url)"
          />
          <div v-if="!loaded[img.thumb || img.url]" class="absolute inset-0 bg-muted/30 animate-pulse" />
        </div>
        <figcaption v-if="img.title || img.location" class="p-2 text-xs text-muted">
          <span>{{ img.title }}</span>
          <span v-if="img.location"> · {{ img.location }}</span>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
</style>
