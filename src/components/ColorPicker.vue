<template>
  <div class="fixed bottom-4 left-4 z-50 flex items-center">
    <button @click="isOpen = !isOpen" 
      class="card p-2 rounded-full flex items-center justify-center w-12 h-12 text-primary hover:text-accent transition-all">
      <i class="fas fa-palette"></i>
    </button>
    
    <transition name="slide-fade">
      <div v-if="isOpen" class="card ml-3 p-4 rounded-lg shadow-lg animate-float">
        <h3 class="chinese-heading text-sm mb-3 text-primary dark:text-white">主题 (Theme)</h3>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <button @click="setTheme('theme-classic')" 
            class="theme-button"
            :class="{ 'ring-2 ring-offset-2 ring-accent': currentTheme === 'theme-classic' }">
            <div class="w-full h-full rounded-full" style="background: linear-gradient(135deg, #c41e3a 0%, #1e3a8a 100%)"></div>
          </button>
          
          <button @click="setTheme('theme-ink')" 
            class="theme-button"
            :class="{ 'ring-2 ring-offset-2 ring-accent': currentTheme === 'theme-ink' }">
            <div class="w-full h-full rounded-full" style="background: linear-gradient(135deg, #111827 0%, #4b5563 100%)"></div>
          </button>
          
          <button @click="setTheme('theme-jade')" 
            class="theme-button"
            :class="{ 'ring-2 ring-offset-2 ring-accent': currentTheme === 'theme-jade' }">
            <div class="w-full h-full rounded-full" style="background: linear-gradient(135deg, #047857 0%, #064e3b 100%)"></div>
          </button>
          
          <button @click="setTheme('theme-porcelain')" 
            class="theme-button"
            :class="{ 'ring-2 ring-offset-2 ring-accent': currentTheme === 'theme-porcelain' }">
            <div class="w-full h-full rounded-full" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%)"></div>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      currentTheme: localStorage.getItem('theme') || 'theme-classic',
    };
  },
  mounted() {
    // Apply the saved theme on mount
    this.applyTheme(this.currentTheme);
  },
  methods: {
    setTheme(theme) {
      this.currentTheme = theme;
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    },
    applyTheme(theme) {
      // Remove all theme classes
      document.body.classList.remove(
        'theme-classic', 'theme-ink', 'theme-jade', 'theme-porcelain',
        'theme-zen', 'theme-sakura', 'theme-indigo', 'theme-matcha'
      );
      // Add the selected theme class
      document.body.classList.add(theme);
    }
  }
};
</script>

<style scoped>
.theme-button {
  @apply w-8 h-8 rounded-full overflow-hidden cursor-pointer transition-all hover:scale-110 focus:outline-none;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>