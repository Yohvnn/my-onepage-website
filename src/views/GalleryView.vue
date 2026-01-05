<template>
  <div class="h-full">
    <div class="grid lg:grid-cols-2 gap-8 h-full min-h-full">
      <!-- Left: Hero -->
      <section class="flex items-start lg:self-start">
        <div class="max-w-5xl lg:mt-20 mt-5 flex flex-col items-start animate-float-in">
          <h1 class="leading-[0.95] lg:text-5xl text-3xl font-light">
            {{ $t('gallery.title') }}
          </h1>
          <p class="text-muted lg:text-2xl text-xl mt-3 font-light">
            {{ $t('gallery.subtitle') }}
          </p>
        </div>
      </section>

      <!-- Right: Gallery Grid -->
      <section class="mt-12 lg:mt-0 flex flex-col gap-4 lg:self-center" aria-label="Gallery overview">
        <div class="flex flex-col gap-3 lg:pl-6 lg:border-l lg:border-border w-full">
          <div v-if="isLoading">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div v-for="n in 10" :key="n" class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-muted/20">
                <div class="w-full h-40 bg-muted/30 animate-pulse" />
                <div class="p-2">
                  <div class="h-3 w-24 bg-muted/30 animate-pulse rounded" />
                  <div class="h-3 w-16 bg-muted/20 animate-pulse rounded mt-2" />
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>
          <GalleryGrid v-else :items="images" @select="openExifModal" />
        </div>
      </section>
    </div>

    <!-- EXIF Modal -->
    <Modal v-model="modalOpen" @close="closeExifModal">
      <div class="card rounded-lg p-6 w-full max-w-4xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium">{{ selected?.title || $t('gallery.photoDetails') }}</h3>
          <button class="btn h-8 px-3 rounded-full bg-background border" @click="closeExifModal">{{ $t('gallery.close') }}</button>
        </div>
        <div class="relative w-full max-h-[80vh] flex items-center justify-center">
          <img
            :src="selected?.url"
            :alt="selected?.title || $t('gallery.photoDetails')"
            class="object-contain max-w-full max-h-full rounded-md"
          />
        </div>
        <div v-if="exifLoading" class="text-muted mt-4">{{ $t('gallery.readingExif') }}</div>
        <div v-else-if="exifError" class="text-red-600 dark:text-red-400 mt-4">{{ $t('gallery.exifError') }}</div>
        <div v-else-if="exif" class="space-y-2 text-sm mt-4">
          <div v-if="exif.make || exif.model">
            <span class="text-muted">{{ $t('gallery.camera') }}</span> {{ [exif.make, exif.model].filter(Boolean).join(' ') }}
          </div>
          <div v-if="exif.lens">
            <span class="text-muted">{{ $t('gallery.lens') }}</span> {{ exif.lens }}
          </div>
          <div class="grid grid-cols-2 gap-x-4 gap-y-2">
            <div v-if="exif.focalLength">
              <span class="text-muted">{{ $t('gallery.focal') }}</span> {{ exif.focalLength }}
            </div>
            <div v-if="exif.aperture">
              <span class="text-muted">{{ $t('gallery.aperture') }}</span> {{ exif.aperture }}
            </div>
            <div v-if="exif.shutter">
              <span class="text-muted">{{ $t('gallery.shutter') }}</span> {{ exif.shutter }}
            </div>
            <div v-if="exif.iso">
              <span class="text-muted">{{ $t('gallery.iso') }}</span> {{ exif.iso }}
            </div>
            <div v-if="exif.dimensions">
              <span class="text-muted">{{ $t('gallery.size') }}</span> {{ exif.dimensions }}
            </div>
            <div v-if="exif.date">
              <span class="text-muted">{{ $t('gallery.taken') }}</span> {{ exif.date }}
            </div>
          </div>
          <div v-if="exif.gps">
            <span class="text-muted">{{ $t('gallery.gps') }}</span> {{ exif.gps }}
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import GalleryGrid from '../components/GalleryGrid.vue'
import Modal from '../components/ui/ModalPhoto.vue'

const images = ref([])
const isLoading = ref(true)
const error = ref(null)

// EXIF modal state
const selected = ref(null)
const modalOpen = ref(false)
const exif = ref(null)
const exifLoading = ref(false)
const exifError = ref(false)

async function openExifModal(item) {
  selected.value = item
  exif.value = null
  exifError.value = null
  exifLoading.value = true
  modalOpen.value = true
  try {
    const mod = await import('exifr')
    const parseFn = mod.parse || (mod.default && mod.default.parse)
    const data = parseFn ? await parseFn(item.url) : (mod.default ? await mod.default(item.url) : null)
    exif.value = normalizeExif(data)
  } catch (e) {
    exifError.value = e?.message || 'Failed to read EXIF data'
  } finally {
    exifLoading.value = false
  }
  await nextTick()
}

function closeExifModal() {
  selected.value = null
  exif.value = null
  exifError.value = null
  exifLoading.value = false
  modalOpen.value = false
}

function normalizeExif(data) {
  if (!data || typeof data !== 'object') return null
  const toFraction = (v) => {
    if (!v || typeof v !== 'number') return null
    if (v >= 1) return v.toFixed(1) + 's'
    const denom = Math.round(1 / v)
    return `1/${denom}` + 's'
  }
  const toGps = (lat, lon) => {
    if (lat == null || lon == null) return null
    const ns = lat >= 0 ? 'N' : 'S'
    const ew = lon >= 0 ? 'E' : 'W'
    return `${Math.abs(lat).toFixed(5)}° ${ns}, ${Math.abs(lon).toFixed(5)}° ${ew}`
  }
  return {
    make: data.Make || null,
    model: data.Model || null,
    lens: data.LensModel || data.Lens || null,
    focalLength: data.FocalLength ? `${data.FocalLength}mm` : null,
    aperture: data.FNumber ? `f/${data.FNumber}` : null,
    shutter: data.ExposureTime ? toFraction(data.ExposureTime) : null,
    iso: data.ISO || data.ISOSpeedRatings || null,
    date: data.DateTimeOriginal || data.CreateDate || null,
    gps: toGps(data.latitude ?? data.GPSLatitude, data.longitude ?? data.GPSLongitude),
    dimensions: data.ExifImageWidth && data.ExifImageHeight ? `${data.ExifImageWidth}×${data.ExifImageHeight}` : null,
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeExifModal()
  }
}

onMounted(async () => {
  try {
    const res = await fetch('/gallery/index.json', { cache: 'no-cache' })
    if (!res.ok) throw new Error('Failed to load gallery index')
    const data = await res.json()
    images.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
</style>
