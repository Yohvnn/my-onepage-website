
<template>
  <div class="w-full max-w-6xl mx-auto">
    <AppHeader />
    <ColorPickerModal />
    <router-view />
  </div>
</template>


<script setup>
import AppHeader from '../components/AppHeader.vue'
import ColorPickerModal from '../components/ui/ColorPickerModal.vue'
</script>

<style scoped>

</style>
