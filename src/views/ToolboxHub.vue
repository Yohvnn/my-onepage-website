<template>
  <div class="h-full">
    <div class="flex flex-col h-full min-h-full space-y-8">
      <!-- Hero -->
      <section class="flex items-start">
        <div class="max-w-5xl items-start animate-float-in">
          <h1 class="lg:text-5xl text-3xl font-light overflow-visible leading-tight">
            {{ t('toolbox.title') }}
          </h1>
          <h2 class="text-muted lg:text-2xl text-xl mt-3 font-light">
            {{ t('toolbox.subtitle') }}<span class="timer-colon-animate">_</span>
          </h2>
        </div>
      </section>

      <!-- Ready Tools Grid -->
      <section class="animate-fade-in" aria-label="Toolbox overview">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <component v-for="tool in readyTools" :is="tool.link ? 'a' : 'article'" :key="tool.id" :href="tool.link"
            target="_blank" rel="noopener"
            :class="['group relative flex flex-col bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300', tool.status === 'coming-soon' ? 'is-coming-soon' : '']">
            <div class="p-6 flex flex-col h-full">
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-medium text-lg leading-snug">
                  <span class="title-linkable text-foreground">{{ tool.title }}</span>
                </h3>
              </div>
              <p class="text-muted text-sm leading-relaxed mb-6 flex-grow">
                {{ tool.desc }}
              </p>
              <div v-if="tool.images && tool.images.length > 0" class="mt-auto space-y-2">
                <div :class="['grid gap-2', tool.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1']">
                  <figure v-for="(img, imgIndex) in tool.images" :key="imgIndex"
                    class="relative overflow-hidden rounded-lg border border-border aspect-video group/image cursor-zoom-in bg-secondary/5"
                    @click.stop.prevent="openPreview(img.src, img.alt)" @keydown.enter.stop.prevent="openPreview(img.src, img.alt)"
                    tabindex="0" role="button">
                    <img :src="img.src" :alt="img.alt"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                      loading="lazy" />
                  </figure>
                </div>
                <p v-if="tool.images[0].caption" class="text-xs text-muted truncate">
                  {{ tool.images[0].caption }}
                </p>
              </div>
            </div>
          </component>
        </div>
      </section>

      <!-- Preview Tools Grid (Coming Soon with Images) -->
      <section class="animate-fade-in" aria-label="Preview Tools">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <component v-for="tool in previewTools" :is="tool.link ? 'a' : 'article'" :key="tool.id" :href="tool.link"
            target="_blank" rel="noopener"
            :class="['group relative flex flex-col bg-background border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300 opacity-90 hover:opacity-100', tool.status === 'coming-soon' ? 'is-coming-soon' : '']">
            <div class="p-6 flex flex-col h-full">
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-medium text-lg leading-snug">
                  <span class="title-linkable text-foreground">{{ tool.title }}</span>
                </h3>
                <span
                  class="text-[10px] uppercase tracking-wider font-bold text-muted border border-border px-2 py-1 rounded-full whitespace-nowrap ml-2">
                  {{ t('toolbox.comingSoonTitle') || 'SOON' }}
                </span>
              </div>
              <p class="text-muted text-sm leading-relaxed mb-6 flex-grow">
                {{ tool.desc }}
              </p>
              <div v-if="tool.images && tool.images.length > 0" class="mt-auto space-y-2">
                <div :class="['grid gap-2', tool.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1']">
                  <figure v-for="(img, imgIndex) in tool.images" :key="imgIndex"
                    class="relative overflow-hidden rounded-lg border border-border aspect-video group/image cursor-zoom-in bg-secondary/5"
                    @click.stop.prevent="openPreview(img.src, img.alt)" @keydown.enter.stop.prevent="openPreview(img.src, img.alt)"
                    tabindex="0" role="button">
                    <img :src="img.src" :alt="img.alt"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                      loading="lazy" />
                  </figure>
                </div>
                <p v-if="tool.images[0].caption" class="text-xs text-muted truncate">
                  {{ tool.images[0].caption }}
                </p>
              </div>
            </div>
          </component>

          <!-- SEE MORE textual toggle (non-card) placed inside preview grid for large screens -->
          <div class="col-span-full lg:col-span-1 flex flex-col justify-start">
            <div class="px-0 md:px-2 lg:px-0">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-lg leading-snug text-foreground">{{ t('toolbox.seeMore') || 'SEE MORE' }}
                </h3>
                <button @click="toggleComingSoon"
                  class="h-7 px-2 rounded-full bg-transparent border border-transparent hover:border-border text-xs transition-colors"
                  :aria-expanded="isComingSoonOpen" aria-controls="coming-soon-collapsible">
                  <span class="flex items-center gap-1 text-muted">
                    <i class="fas fa-chevron-down transition-transform duration-300"
                      :class="isComingSoonOpen ? 'rotate-180' : 'rotate-0'"></i>
                    <span class="text-sm">{{ isComingSoonOpen ? t('studio.common.hide') : t('studio.common.show')
                      }}</span>
                  </span>
                </button>
              </div>
              <p class="text-muted text-sm mb-3">{{ t('toolbox.comingSoonText') }}</p>

              <transition @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave" @leave="onLeave">
                <div v-show="isComingSoonOpen" id="coming-soon-collapsible" class="overflow-hidden">
                  <ul class="space-y-3 text-sm text-muted">
                    <li v-for="tool in comingSoonTools" :key="tool.id" class="">
                      <div class="font-medium text-foreground">{{ tool.title }}</div>
                      <div class="text-muted text-sm">{{ tool.desc }}</div>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <!-- Coming Soon content moved into preview grid for large screens -->
    </div>

    <!-- Image preview modal -->
    <ModalPhoto v-model="modalOpen">
      <div class="max-w-7xl w-full p-4">
        <img :src="modalSrc" :alt="modalAlt"
          class="max-h-[85vh] w-auto mx-auto rounded-lg border border-border shadow-2xl" />
        <p class="text-center text-white/90 mt-4 font-light tracking-wide">{{ modalAlt }}</p>
      </div>
    </ModalPhoto>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import ModalPhoto from '@/components/ui/ModalPhoto.vue'

const { t } = useI18n({ useScope: 'global' })

const modalOpen = ref(false)
const modalSrc = ref('')
const modalAlt = ref('')
const isComingSoonOpen = ref(false)

function openPreview(src, alt) {
  modalSrc.value = src
  modalAlt.value = alt
  modalOpen.value = true
}

function toggleComingSoon() {
  isComingSoonOpen.value = !isComingSoonOpen.value
}

// Smooth height transition for collapse/expand
const onBeforeEnter = (el) => {
  el.style.height = '0px'
  el.style.overflow = 'hidden'
  el.style.transition = 'height 300ms ease'
}
const onEnter = (el, done) => {
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

const allTools = computed(() => [
  {
    id: 'hawk-mcp',
    title: t('toolbox.hawkMcp.title'),
    desc: t('toolbox.hawkMcp.desc'),
    link: t('toolbox.hawkMcp.github'),
    status: 'ready',
    images: [
      {
        src: '/hawk-mcp.png',
        alt: t('toolbox.hawkMcp.title'),
        caption: t('toolbox.hawkMcp.figcaption')
      }
    ]
  },
  {
    id: 'hawk-mobile',
    title: t('toolbox.hawkMobile.title'),
    desc: t('toolbox.hawkMobile.desc'),
    link: t('toolbox.hawkMobile.github'),
    status: 'ready',
    images: [
      {
        src: '/hawk-mobile-app.png',
        alt: t('toolbox.hawkMobile.title') + ' chat',
        caption: t('toolbox.hawkMobile.figcaption1')
      }
    ]
  },
  {
    id: 'pixel-widgets',
    title: t('toolbox.pixelWidgets.title'),
    desc: t('toolbox.pixelWidgets.desc'),
    link: t('toolbox.pixelWidgets.github'),
    status: 'ready',
    images: [
      {
        src: '/ysstudiowidget.png',
        alt: t('toolbox.pixelWidgets.title'),
        caption: t('toolbox.pixelWidgets.figcaption')
      }
    ]
  },
  {
    id: 'rag-chatbot',
    title: t('toolbox.rag.title'),
    desc: t('toolbox.rag.desc'),
    link: null,
    status: 'coming-soon',
    comingSoonText: t('toolbox.rag.comingSoon'),
    images: [
      {
        src: '/rag_tool_document.png',
        alt: 'RAG tool document preview',
        caption: t('toolbox.rag.figcaption1')
      },
      {
        src: '/rag_tool_conversation.png',
        alt: 'RAG tool conversation preview',
        caption: t('toolbox.rag.figcaption2')
      }
    ]
  },
  {
    id: 'pdf-tools',
    title: t('toolbox.pdf.title'),
    desc: t('toolbox.pdf.desc'),
    link: null,
    status: 'coming-soon',
    comingSoonText: t('toolbox.pdf.comingSoon'),
    images: []
  },
  {
    id: 'tictactoe',
    title: t('toolbox.tictactoe.title'),
    desc: t('toolbox.tictactoe.desc'),
    link: null,
    status: 'coming-soon',
    comingSoonText: t('toolbox.tictactoe.comingSoon'),
    images: []
  },
  {
    id: 'flipcoin',
    title: t('toolbox.flipcoin.title'),
    desc: t('toolbox.flipcoin.desc'),
    link: null,
    status: 'coming-soon',
    comingSoonText: t('toolbox.flipcoin.comingSoon'),
    images: []
  }
])

const readyTools = computed(() => allTools.value.filter(t => t.status === 'ready'))
const previewTools = computed(() => allTools.value.filter(t => t.status === 'coming-soon' && t.images && t.images.length > 0))
const comingSoonTools = computed(() => allTools.value.filter(t => t.status === 'coming-soon' && (!t.images || t.images.length === 0)))
</script>
