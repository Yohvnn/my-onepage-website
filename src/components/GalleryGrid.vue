/* global defineProps, defineEmits */
<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select'])

function onSelect(img) {
  emit('select', img)
}
</script>

<template>
  <div>
    <div v-if="!items.length" class="text-muted text-sm">No photos yet. Populate <code>public/gallery/index.json</code> with image entries.</div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <figure
        v-for="(img, i) in items"
        :key="i"
        class="group overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-muted/20 cursor-pointer"
        role="button"
        tabindex="0"
        @click="onSelect(img)"
        @keydown.enter.prevent="onSelect(img)"
      >
        <img
          :src="img.url"
          :alt="img.title || 'Photo ' + (i+1)"
          class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          width="320"
          height="160"
        />
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
