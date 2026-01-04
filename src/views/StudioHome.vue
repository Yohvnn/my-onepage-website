<script setup>
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import WorkList from '@/components/WorkList.vue'
import EducationList from '@/components/EducationList.vue'

const { t } = useI18n()

const headline = computed(() => t('studio.hero.headline'))
const subtext = computed(() => t('studio.hero.subtext'))

const aboutText = computed(() => t('home.aboutText'))
const workTitle = computed(() => t('home.workTitle'))
const educationTitle = computed(() => t('home.educationTitle'))

// Toggle right column alignment on large screens
const isRightAligned = ref(true)
const workHeaderRef = ref(null)
const eduHeaderRef = ref(null)

const flipAnimate = (el) => {
  if (!el) return
  const first = el.getBoundingClientRect()
  return (lastEl) => {
    const last = lastEl.getBoundingClientRect()
    const invertX = first.left - last.left
    el.style.transform = `translateX(${invertX}px)`
    el.style.transition = 'transform 300ms ease'
    // animate to new position
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(0)'
    })
    const handler = (e) => {
      if (e.propertyName === 'transform') {
        el.removeEventListener('transitionend', handler)
        el.style.transform = ''
        el.style.transition = ''
      }
    }
    el.addEventListener('transitionend', handler)
  }
}

const toggleAlignment = async () => {
  const workFlip = flipAnimate(workHeaderRef.value)
  const eduFlip = flipAnimate(eduHeaderRef.value)
  isRightAligned.value = !isRightAligned.value
  await nextTick()
  if (workFlip && workHeaderRef.value) workFlip(workHeaderRef.value)
  if (eduFlip && eduHeaderRef.value) eduFlip(eduHeaderRef.value)
}

// Per-section dropdowns
const isWorkOpen = ref(true)
const isEduOpen = ref(true)
const toggleWorkOpen = () => { isWorkOpen.value = !isWorkOpen.value }
const toggleEduOpen = () => { isEduOpen.value = !isEduOpen.value }

// Smooth height transition for collapse/expand (with proper enter/leave hooks)
const onBeforeEnter = (el) => {
  el.style.height = '0px'
  el.style.overflow = 'hidden'
  el.style.transition = 'height 300ms ease'
}
const onEnter = (el, done) => {
  // Expand to content height
  const h = el.scrollHeight
  requestAnimationFrame(() => { el.style.height = h + 'px' })
  const handler = (e) => {
    if (e.propertyName === 'height') {
      el.removeEventListener('transitionend', handler)
      el.style.height = 'auto'
      el.style.overflow = ''
      el.style.transition = ''
      done && done()
    }
  }
  el.addEventListener('transitionend', handler)
}
const onBeforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.style.overflow = 'hidden'
  el.style.transition = 'height 300ms ease'
}
const onLeave = (el, done) => {
  // Collapse to zero height
  requestAnimationFrame(() => { el.style.height = '0px' })
  const handler = (e) => {
    if (e.propertyName === 'height') {
      el.removeEventListener('transitionend', handler)
      el.style.height = ''
      el.style.overflow = ''
      el.style.transition = ''
      done && done()
    }
  }
  el.addEventListener('transitionend', handler)
}

// Persist UI state across navigations
onMounted(() => {
  const savedAlign = localStorage.getItem('studio:isRightAligned')
  if (savedAlign !== null) isRightAligned.value = savedAlign === 'true'

  const savedWork = localStorage.getItem('studio:isWorkOpen')
  if (savedWork !== null) isWorkOpen.value = savedWork === 'true'

  const savedEdu = localStorage.getItem('studio:isEduOpen')
  if (savedEdu !== null) isEduOpen.value = savedEdu === 'true'
})

watch(isRightAligned, (val) => {
  localStorage.setItem('studio:isRightAligned', String(val))
})

watch(isWorkOpen, (val) => {
  localStorage.setItem('studio:isWorkOpen', String(val))
})

watch(isEduOpen, (val) => {
  localStorage.setItem('studio:isEduOpen', String(val))
})
</script>

<template>
  <div class="h-full">
    <!-- Two-column responsive layout -->
    <div class="grid lg:grid-cols-2 gap-8 h-full">
      <!-- Left: Hero -->
      <section aria-label="Studio tagline" class="flex items-start">
        <div class="max-w-5xl lg:mt-20 mt-10 flex flex-col items-start animate-float-in">
          <h1 class="leading-[0.95] text-6xl">
            {{ headline }}
          </h1>
          <p class="mt-6 text-6xl text-muted max-w-prose">
            {{ subtext }}
          </p>
          
        </div>
      </section>

      <!-- Right: Stacked sections -->
      <section
        aria-label="Resume overview"
        class="mt-12 lg:mt-60 gap-3"
        :class="isRightAligned ? 'lg:flex lg:flex-col lg:items-end lg:text-right' : 'lg:flex lg:flex-col lg:items-start lg:text-left'"
      >
          <!-- Alignment Toggle (large screens) -->
          <div class="mb-4 lg:self-end flex">
            <button @click="toggleAlignment" class="btn h-8 px-3 rounded-full bg-background border hover:bg-border text-xs shadow-sm transition-colors" aria-label="Toggle right column alignment">
              <span class="flex items-center gap-1">
                <i class="fas fa-exchange-alt transition-transform duration-300" :class="isRightAligned ? 'rotate-180' : 'rotate-0'"></i>
                <span>{{ isRightAligned ? 'Align Left' : 'Align Right' }}</span>
              </span>
            </button>
          </div>
          <!-- Work Experience -->
          <div>
              <h1 class="text-5xl">
                  About Yohann.
              </h1>
                <p class="mt-4 text-base text-muted max-w-prose">
                    {{ aboutText }}
                </p>
          </div>

          <!-- Work dropdown -->
          <div class="inline-block" :class="isRightAligned ? 'lg:self-end' : 'lg:self-start'">
            <div ref="workHeaderRef" class="flex items-center gap-2 mb-2" :class="isRightAligned ? 'lg:justify-end' : 'lg:justify-start'">
              <h2 class="text-base">{{ workTitle }}</h2>
              <button
                @click="toggleWorkOpen"
                class="btn h-7 px-2 rounded-full bg-background border hover:bg-border text-xs shadow-sm"
                :aria-expanded="isWorkOpen"
                aria-controls="work-collapsible"
              >
                <span class="flex items-center gap-1">
                  <i class="fas fa-chevron-down transition-transform duration-200" :class="isWorkOpen ? 'rotate-180' : 'rotate-0'"></i>
                  <span>{{ isWorkOpen ? 'Hide' : 'Show' }}</span>
                </span>
              </button>
            </div>
            <transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
              <div v-show="isWorkOpen" id="work-collapsible" class="max-w-prose">
                <WorkList />
              </div>
            </transition>
          </div>

          <!-- Education dropdown -->
          <div class="inline-block" :class="isRightAligned ? 'lg:self-end' : 'lg:self-start'">
            <div ref="eduHeaderRef" class="flex items-center gap-2 mb-2" :class="isRightAligned ? 'lg:justify-end' : 'lg:justify-start'">
              <h2 class="text-base">{{ educationTitle }}</h2>
              <button
                @click="toggleEduOpen"
                class="btn h-7 px-2 rounded-full bg-background border hover:bg-border text-xs shadow-sm"
                :aria-expanded="isEduOpen"
                aria-controls="edu-collapsible"
              >
                <span class="flex items-center gap-1">
                  <i class="fas fa-chevron-down transition-transform duration-200" :class="isEduOpen ? 'rotate-180' : 'rotate-0'"></i>
                  <span>{{ isEduOpen ? 'Hide' : 'Show' }}</span>
                </span>
              </button>
            </div>
            <transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
              <div v-show="isEduOpen" id="edu-collapsible" class="max-w-prose">
                <EducationList />
              </div>
            </transition>
          </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
</style>
