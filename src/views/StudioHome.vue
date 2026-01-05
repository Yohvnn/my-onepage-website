<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
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
const workHeaderInnerRef = ref(null)
const eduHeaderInnerRef = ref(null)
const rightSectionRef = ref(null)
const bioHeaderRef = ref(null)

const isAnimatingAlign = ref(false)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Reactive large-screen flag to control BIO visibility at lg+
const isLargeScreen = ref(false)
const updateIsLargeScreen = () => {
  if (typeof window === 'undefined') return
  isLargeScreen.value = window.matchMedia('(min-width: 1024px)').matches
}

const toggleAlignment = async () => {
  if (isAnimatingAlign.value) return
  isAnimatingAlign.value = true

  const el = rightSectionRef.value
  const isLg = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  const prevWorkOpen = isWorkOpen.value
  const prevEduOpen = isEduOpen.value
  const prevAboutVisible = isAboutVisible.value

  if (isLg && el) {
    // Direction: move toward current align button (end if right-aligned, start if left-aligned)
    const dir = isRightAligned.value ? 1 : -1 // 1 => right, -1 => left
    const distance = 24

    // 1) Close dropdowns first (height collapse)
    isWorkOpen.value = false
    isEduOpen.value = false
    isAboutVisible.value = false
    await nextTick()

    // 2) Fade + slide out toward the align button
    el.style.willChange = 'transform, opacity'
    el.style.transition = 'transform 250ms ease, opacity 250ms ease'
    el.style.transform = 'translateX(0px)'
    el.style.opacity = '1'
    requestAnimationFrame(() => {
      el.style.transform = `translateX(${dir * distance}px)`
      el.style.opacity = '0'
    })
    await sleep(260)

    // 3) Flip alignment
    isRightAligned.value = !isRightAligned.value
    await nextTick()

    // 4) Prepare on opposite side and fade/slide in
    const newDir = -dir
    el.style.transition = 'none'
    el.style.transform = `translateX(${newDir * distance}px)`
    el.style.opacity = '0'
    requestAnimationFrame(() => {
      el.style.transition = 'transform 250ms ease, opacity 250ms ease'
      el.style.transform = 'translateX(0px)'
      el.style.opacity = '1'
    })
    await sleep(260)

    // 5) Restore dropdown open states
    if (prevWorkOpen) isWorkOpen.value = true
    if (prevEduOpen) isEduOpen.value = true
    if (prevAboutVisible) isAboutVisible.value = true

    // Cleanup inline styles
    setTimeout(() => {
      el.style.willChange = ''
      el.style.transition = ''
      el.style.transform = ''
      el.style.opacity = ''
    }, 50)
  } else {
    // Fallback: simple toggle without animation on smaller screens
    isRightAligned.value = !isRightAligned.value
  }

  isAnimatingAlign.value = false
}

// Per-section dropdowns
const isWorkOpen = ref(true)
const isEduOpen = ref(true)
const isAboutVisible = ref(true)

const scrollMainToBottomMobile = () => {
  if (window.matchMedia('(min-width: 1024px)').matches) return
  setTimeout(() => {
    const sc = document.querySelector('.scroll-container')
    if (sc && typeof sc.scrollTo === 'function') {
      sc.scrollTo({ top: sc.scrollHeight, behavior: 'smooth' })
    } else {
      const h = document.documentElement.scrollHeight || document.body.scrollHeight
      window.scrollTo({ top: h, behavior: 'smooth' })
    }
  }, 320)
}


const toggleWorkOpen = () => {
  const opening = !isWorkOpen.value
  isWorkOpen.value = opening
  if (opening) scrollMainToBottomMobile()
}

const toggleEduOpen = () => {
  const opening = !isEduOpen.value
  isEduOpen.value = opening
  if (opening) scrollMainToBottomMobile()
}

const toggleAboutVisible = () => {
  const opening = !isAboutVisible.value
  isAboutVisible.value = opening
  if (opening) scrollMainToBottomMobile()
}

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
  // Track large-screen breakpoint
  updateIsLargeScreen()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateIsLargeScreen)
  }

  const savedAlign = localStorage.getItem('studio:isRightAligned')
  if (savedAlign !== null) isRightAligned.value = savedAlign === 'true'

  const savedWork = localStorage.getItem('studio:isWorkOpen')
  if (savedWork !== null) isWorkOpen.value = savedWork === 'true'

  const savedEdu = localStorage.getItem('studio:isEduOpen')
  if (savedEdu !== null) isEduOpen.value = savedEdu === 'true'

  const savedAbout = localStorage.getItem('studio:isAboutVisible')
  if (savedAbout !== null) isAboutVisible.value = savedAbout === 'true'
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateIsLargeScreen)
  }
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

watch(isAboutVisible, (val) => {
  localStorage.setItem('studio:isAboutVisible', String(val))
})

</script>

<template>
  <div class="h-full">
    <!-- Two-column responsive layout -->
    <div class="grid lg:grid-cols-2 gap-8 h-full min-h-full">
      <!-- Left: Hero -->
      <section aria-label="Studio tagline" class="flex items-start lg:self-start">
        <div class="max-w-5xl lg:mt-20 mt-10 flex flex-col items-start animate-float-in">
          <h1 class="leading-[0.95] lg:text-6xl text-3xl">
            {{ headline }} <span class="text-muted">{{ subtext }}</span>
          </h1>

        </div>
      </section>

      <!-- Right: Stacked sections -->
      <section aria-label="Resume overview" class="mt-12 lg:mt-0 flex flex-col gap-3 lg:self-center"
        :class="isRightAligned ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'" ref="rightSectionRef">
        <!-- Alignment Toggle (large screens) -->
        <div class="mb-4 hidden lg:flex" :class="isRightAligned ? 'lg:self-end' : 'lg:self-start'">

          <button @click="toggleAlignment"
            class="btn h-8 px-3 rounded-full bg-background border hover:bg-border text-xs shadow-sm transition-colors"
            aria-label="Toggle right column alignment">
            <span class="flex items-center gap-1">
              <i class="fas fa-exchange-alt transition-transform duration-300"
                :class="isRightAligned ? 'rotate-180' : 'rotate-0'"></i>
              <span>{{ isRightAligned ? t('studio.hero.alignLeftButton') : t('studio.hero.alignRightButton') }}</span>
            </span>
          </button>
        </div>
        <!-- Work Experience -->
        <div>
          <h1 class="lg:text-5xl text-2xl">
            {{ t('studio.home.aboutHeading') }}
          </h1>
          <div class="lg:hidden mt-2 inline-flex items-center gap-2">
            <h2 class="text-base">{{ t('studio.home.bioLabel') }}</h2>
            <button ref="bioHeaderRef" @click="toggleAboutVisible"
              class="btn h-7 px-2 rounded-full bg-background border hover:bg-border text-xs shadow-sm transition-colors"
              :aria-expanded="isAboutVisible" aria-controls="bio-collapsible">
              <span class="flex items-center gap-1">
                <i class="fas fa-chevron-down transition-transform duration-300"
                  :class="isAboutVisible ? 'rotate-180' : 'rotate-0'"></i>
                <span>{{ isAboutVisible ? t('studio.common.hide') : t('studio.common.show') }}</span>
              </span>

            </button>
          </div>


          <transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
            <div v-show="isAboutVisible || isLargeScreen" id="bio-collapsible" class="lg:block">
              <p class="lg:mt-4 text-base text-muted max-w-prose">
                {{ aboutText }}<span class="timer-colon-animate">_</span>
              </p>
            </div>
          </transition>

        </div>

        <!-- Work dropdown -->
        <div class="block w-full" :class="isRightAligned ? 'lg:self-end' : 'lg:self-start'">
          <div ref="workHeaderRef" class="flex w-full mb-2"
            :class="isRightAligned ? 'lg:justify-end' : 'lg:justify-start'">
            <div ref="workHeaderInnerRef" class="inline-flex items-center gap-2">
              <h2 class="text-base">{{ workTitle }}</h2>
              <button @click="toggleWorkOpen"
                class="btn h-7 px-2 rounded-full bg-background border hover:bg-border text-xs shadow-sm"
                :aria-expanded="isWorkOpen" aria-controls="work-collapsible">
                <span class="flex items-center gap-1">
                  <i class="fas fa-chevron-down transition-transform duration-200"
                    :class="isWorkOpen ? 'rotate-180' : 'rotate-0'"></i>
                  <span>{{ isWorkOpen ? t('studio.common.hide') : t('studio.common.show') }}</span>
                </span>
              </button>
            </div>
          </div>
          <transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
            <div v-show="isWorkOpen" id="work-collapsible" class="max-w-prose lg:max-w-none">
              <WorkList />
            </div>
          </transition>
        </div>

        <!-- Education dropdown -->
        <div class="block w-full" :class="isRightAligned ? 'lg:self-end' : 'lg:self-start'">
          <div ref="eduHeaderRef" class="flex w-full mb-2"
            :class="isRightAligned ? 'lg:justify-end' : 'lg:justify-start'">
            <div ref="eduHeaderInnerRef" class="inline-flex items-center gap-2">
              <h2 class="text-base">{{ educationTitle }}</h2>
              <button @click="toggleEduOpen"
                class="btn h-7 px-2 rounded-full bg-background border hover:bg-border text-xs shadow-sm"
                :aria-expanded="isEduOpen" aria-controls="edu-collapsible">
                <span class="flex items-center gap-1">
                  <i class="fas fa-chevron-down transition-transform duration-200"
                    :class="isEduOpen ? 'rotate-180' : 'rotate-0'"></i>
                  <span>{{ isEduOpen ? t('studio.common.hide') : t('studio.common.show') }}</span>
                </span>
              </button>
            </div>
          </div>
          <transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
            <div v-show="isEduOpen" id="edu-collapsible" class="max-w-prose lg:max-w-none">
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
