/* global defineProps, defineEmits */
<template>
  <div>
    <div v-if="!items.length" class="text-muted text-sm">{{ t('gallery.noPhotos') }}</div>
    
    <!-- Compact Zigzag Grid (2 Columns on XL with Central Spine) -->
    <div v-else class="relative grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-4 py-4">
      <!-- Central Vertical Line (XL only) -->
      <div class="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden xl:block -translate-x-1/2"></div>

      <article
        v-for="(img, i) in items"
        :key="img.url || i"
        class="flex flex-col md:flex-row gap-2 md:gap-6 items-center group cursor-pointer relative z-10"
        :class="{
          'md:flex-row-reverse xl:flex-row': i % 2 === 0, 
          'xl:flex-row-reverse': i % 2 !== 0
        }"
        @click="onSelect(img)"
        @keydown.enter.prevent="onSelect(img)"
        tabindex="0"
      >
        <!-- Image Side (Half width, Fixed compact height) -->
        <div class="w-full md:w-1/2 h-48 md:h-52 relative overflow-hidden rounded-lg shadow-sm border border-border bg-muted/20 transition-transform duration-500 hover:shadow-md hover:scale-[1.01]">
          <img
            :src="img.thumb || img.url"
            :alt="img.title || t('gallery.photoAlt', { number: i+1 })"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            :class="loaded[img.thumb || img.url] ? 'opacity-100' : 'opacity-0'"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            @load="markLoaded(img.thumb || img.url)"
            @error="markLoaded(img.thumb || img.url)"
          />
          <div v-if="!loaded[img.thumb || img.url]" class="absolute inset-0 bg-muted/30 animate-pulse" />
        </div>

        <!-- Text Side (Half width) -->
        <div 
          class="w-full md:w-1/2 flex flex-col justify-center items-start text-left" 
          :class="{
            'md:items-end md:text-right xl:items-end xl:text-right': i % 2 === 0, 
            'md:items-start md:text-left xl:items-start xl:text-left': i % 2 !== 0
          }"
        >
          <h3 class="text-lg md:text-xl font-light text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {{ img.title || t('gallery.photoDetails') }}
          </h3>
          <!-- Separator Line (Hidden on mobile for compactness, visible on MD) -->
          <div class="hidden md:block h-0.5 w-8 bg-border mb-2 transition-all duration-300 group-hover:w-12 group-hover:bg-primary"></div>
          
          <p v-if="img.location" class="text-muted text-sm font-light tracking-wide flex items-center gap-1.5" :class="{'md:flex-row-reverse xl:flex-row': i % 2 === 0}">
            <i class="fas fa-map-marker-alt text-[10px] opacity-50"></i>
            {{ img.location }}
          </p>
          
          <p v-if="img.date" class="text-muted/60 text-xs mt-1 font-mono">
            {{ new Date(img.date).toLocaleDateString() }}
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

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

<style scoped>
</style>
