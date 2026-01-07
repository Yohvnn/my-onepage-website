<template>
  <div class="h-full">
    <div class="grid h-full min-h-full">
      <!-- Hero -->
      <section class="flex items-start">
        <div class="max-w-5xl items-start animate-float-in">
          <h1 class=" lg:text-5xl text-3xl font-light overflow-visible leading-tight">
            {{ t('toolbox.title') }}
          </h1>
          <h2 class="text-muted lg:text-2xl text-xl mt-3 font-light">{{ t('toolbox.subtitle') }}<span
              class="timer-colon-animate">_</span>
          </h2>
        </div>
      </section>

      <!-- Tools stack -->
      <section class=" lg:mt-6 gap-4" aria-label="Toolbox overview">

        <div class="flex flex-col gap-3 w-full">
          <ul class="space-y-3">
            <li aria-hidden="true">
              <hr class="divider-bleed" />
            </li>
            <li class="animate-fade-in">
              <div class="flex text-base flex-col items-start">
                <span class="button-link">{{ t('toolbox.pdf.title') }}</span>
                <span class="text-muted">{{ t('toolbox.pdf.desc') }}</span>
                <span class="text-muted underline font-bold text-sm">{{ t('toolbox.pdf.comingSoon') }}</span>
              </div>
            </li>
            <li aria-hidden="true">
              <hr class="divider-bleed" />
            </li>

            <li class="animate-fade-in">
              <div class="flex text-base flex-col items-start">
                <span class="button-link">{{ t('toolbox.tictactoe.title') }}</span>
                <span class="text-muted">{{ t('toolbox.tictactoe.desc') }}</span>
                <span class="text-muted underline font-bold text-sm">{{ t('toolbox.tictactoe.comingSoon') }}</span>
              </div>
            </li>
            <li aria-hidden="true">
              <hr class="divider-bleed" />
            </li>

            <li class="animate-fade-in ">
              <div class="flex text-base flex-col items-start">
                <span class="button-link">{{ t('toolbox.flipcoin.title') }}</span>
                <span class="text-muted">{{ t('toolbox.flipcoin.desc') }}</span>
                <span class="text-muted underline font-bold text-sm">{{ t('toolbox.flipcoin.comingSoon') }}</span>
              </div>
            </li>
            <li aria-hidden="true">
              <hr class="divider-bleed" />
            </li>

            <li class="animate-fade-in">
              <div class="flex text-base flex-col items-start">
                <span class="button-link">{{ t('toolbox.rag.title') }}</span>
                <span class="text-muted">{{ t('toolbox.rag.desc') }}</span>
                <span class="text-muted underline font-bold text-sm">{{ t('toolbox.rag.comingSoon') }}</span>
                <!-- Preview images for RAG tool -->
                <div class="mt-3">
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li>
                      <figure>
                        <img src="/rag_tool_document.png" alt="RAG tool document preview"
                          class="w-full rounded-md border border-border shadow-sm cursor-zoom-in" loading="lazy"
                          role="button" tabindex="0"
                          @click="openPreview('/rag_tool_document.png', 'RAG tool document preview')"
                          @keydown.enter="openPreview('/rag_tool_document.png', 'RAG tool document preview')" />
                        <figcaption class="text-xs text-muted mt-1">{{ t('toolbox.rag.figcaption1') }}</figcaption>
                      </figure>
                    </li>
                    <li>
                      <figure>
                        <img src="/rag_tool_conversation.png" alt="RAG tool conversation preview"
                          class="w-full rounded-md border border-border shadow-sm cursor-zoom-in" loading="lazy"
                          role="button" tabindex="0"
                          @click="openPreview('/rag_tool_conversation.png', 'RAG tool conversation preview')"
                          @keydown.enter="openPreview('/rag_tool_conversation.png', 'RAG tool conversation preview')" />
                        <figcaption class="text-xs text-muted mt-1">{{ t('toolbox.rag.figcaption2') }}</figcaption>
                      </figure>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li aria-hidden="true">
              <hr class="divider-bleed" />
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
    <!-- Image preview modal -->
    <ModalPhoto v-model="modalOpen">
      <div class="max-w-7xl w-full">
        <img :src="modalSrc" :alt="modalAlt"
          class="max-h-[80vh] w-auto mx-auto rounded-md border border-border shadow-xl" />
      </div>
    </ModalPhoto>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import ModalPhoto from '@/components/ui/ModalPhoto.vue'
const { t } = useI18n({ useScope: 'global' })

const modalOpen = ref(false)
const modalSrc = ref('')
const modalAlt = ref('')

function openPreview(src, alt) {
  modalSrc.value = src
  modalAlt.value = alt
  modalOpen.value = true
}
</script>