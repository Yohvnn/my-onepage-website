<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" @click="close">
    <div class="bg-background border border-border rounded-lg p-6 max-w-sm w-full mx-4" @click.stop>
      <h3 class="text-lg font-semibold mb-4 text-foreground">Choose Primary Color</h3>
      <!-- Hex Input -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-foreground mb-2">Hex Color Code</label>
        <div class="flex gap-2">
          <input 
            v-model="hexColor" 
            type="text" 
            placeholder="#000000"
            class="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            @input="validateHex">
          <div 
            class="w-10 h-10 rounded-md border border-border"
            :style="{ backgroundColor: isValidHex ? hexColor : '#000000' }">
          </div>
        </div>
        <p v-if="!isValidHex && hexColor" class="text-red-500 text-xs mt-1">Invalid hex color</p>
      </div>
      <!-- Quick Color Presets -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-foreground mb-2">Quick Colors</label>
        <div class="grid grid-cols-6 gap-2">
          <button 
            v-for="color in filteredColorPresets" 
            :key="color"
            @click="selectColor(color)"
            class="w-8 h-8 rounded-md border border-border hover:scale-110 transition-transform duration-200"
            :style="{ backgroundColor: color }">
          </button>
        </div>
      </div>
      <!-- Action Buttons -->
      <div class="flex gap-2 justify-end">
        <button 
          @click="resetToDefault"
          class="px-4 py-2 text-sm border border-border rounded-md hover:bg-border transition-colors duration-200">
          Reset
        </button>
        <button 
          @click="applyColor"
          :disabled="!isValidHex"
          class="px-4 py-2 text-sm bg-primary text-background rounded-md hover:opacity-80 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          Apply
        </button>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50 animate-slide-in">
      <div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <i class="fas fa-exclamation-triangle"></i>
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useColorPickerStore } from '@/lib/colorPickerStore'

const store = useColorPickerStore()
const isVisible = computed(() => store.isVisible)
const hexColor = computed({
  get: () => store.hexColor,
  set: (val) => store.setHexColor(val)
})
const isValidHex = computed(() => store.isValidHex)
const filteredColorPresets = computed(() => store.filteredColorPresets)
const showToast = computed(() => store.showToast)
const toastMessage = computed(() => store.toastMessage)

function validateHex() {
  store.validateHex()
}
function selectColor(color) {
  store.selectColor(color)
}
function resetToDefault() {
  store.resetToDefault()
}
function applyColor() {
  store.applyColor()
}
function close() {
  store.close()
}
</script>

<style scoped>
</style>
