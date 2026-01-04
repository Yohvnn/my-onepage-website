<template>
  <Teleport to="body">
    <Transition name="modal-overlay" appear>
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        @click.self="emitClose"
      >
        <Transition name="modal-content" appear>
          <div class="modal-content">
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
  <!-- Focus sentinel to trap focus when open -->
  <span v-if="modelValue" ref="sentinel" class="sr-only" aria-hidden="true"></span>
</template>

<script setup>
import { watch, ref, nextTick, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'close'])

const sentinel = ref(null)
let touchMoveHandler = null
let wheelHandler = null

function emitClose() {
  emit('update:modelValue', false)
  emit('close')
}

function lockScroll() {
  // Prevent background scrolling via touch/wheel while modal is open
  touchMoveHandler = (e) => {
    const modal = document.querySelector('[role="dialog"]')
    if (modal && modal.contains(e.target)) return
    e.preventDefault()
  }
  wheelHandler = (e) => {
    const modal = document.querySelector('[role="dialog"]')
    if (modal && modal.contains(e.target)) return
    e.preventDefault()
  }
  document.addEventListener('touchmove', touchMoveHandler, { passive: false })
  document.addEventListener('wheel', wheelHandler, { passive: false })
}

function unlockScroll() {
  if (touchMoveHandler) {
    document.removeEventListener('touchmove', touchMoveHandler)
    touchMoveHandler = null
  }
  if (wheelHandler) {
    document.removeEventListener('wheel', wheelHandler)
    wheelHandler = null
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') emitClose()
}

watch(() => props.modelValue, async (open) => {
  if (open) {
    lockScroll()
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    if (sentinel.value && typeof sentinel.value.focus === 'function') {
      sentinel.value.focus()
    }
  } else {
    document.removeEventListener('keydown', onKeydown)
    unlockScroll()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  unlockScroll()
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Overlay fade */
.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: opacity 200ms ease;
}
.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}

/* Dialog scale + fade */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
  will-change: transform, opacity;
}
.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(4px);
}

</style>
