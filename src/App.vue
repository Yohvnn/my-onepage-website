<template>
  <div class="h-screen chinese-pattern bg-background text-foreground transition-colors duration-500 overflow-hidden flex flex-col">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
      <div class="w-20 h-20 relative">
        <!-- Chinese-inspired loading animation -->
        <div class="absolute inset-0 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
        <div class="absolute inset-1 border-2 border-l-transparent border-accent rounded-full animate-spin" style="animation-duration: 1.5s;"></div>
      </div>
      <div class="mt-6 text-xl font-display tracking-wider text-primary">
        {{ currentMessage }}
      </div>
    </div>

    <div v-else class="container mx-auto p-3 relative flex-grow flex flex-col h-full overflow-auto">
      <!-- Full screen vertical layout -->
      <div class="flex flex-col h-full">
        
        <!-- Header with name and Chinese character -->
        <header class="py-3 mb-12 border-b border-border">
          <div class="mb-1 flex flex-col md:flex-row items-center md:justify-between">
            <div class="flex items-center mb-4 md:mb-0">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-full flex items-center justify-center mr-2">
                <span class="text-3xl md:text-4xl font-display text-primary">陳</span>
              </div>
              <div>
                <h1 class="text-2xl md:text-3xl font-display tracking-wider text-primary">YOHANN CHAN CHEW HONG</h1>
                <p class="text-muted">Junior Gen AI Research Engineer</p>
              </div>
            </div>
            <div class="flex space-x-3 items-center">
              <!-- Dark Mode Toggle Button -->
              <button @click="toggleDarkMode"
                class="rounded-md flex items-center justify-center
                btn btn-outline text-sm flex items-center w-9 h-9">
                <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-primary"></i>
              </button>
              
              <!-- Theme Button (triggers ColorPicker) -->
              <!-- <button @click="toggleColorPicker"
                class="card p-2 rounded-md flex items-center justify-center
                transition duration-200 ease-in-out hover:shadow-md focus:outline-none w-9 h-9">
                <i class="fas fa-palette text-primary"></i>
              </button> -->
              
              <a href="mailto:cchongyohann@gmail.com" class="btn btn-outline text-sm flex items-center">
                <i class="fas fa-envelope mr-2"></i> Contact Me
              </a>
            </div>
          </div>
        </header>

        <!-- Main Content - Three Column Layout -->
        <main class="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-auto">
          
          <!-- Column 1: Photos and About Me -->
          <div class="space-y-6">
            <!-- Profile Photo -->
            <div class="card p-0 overflow-hidden">
              <div class="relative flex justify-center">
                <img src="@/assets/profile_pic.jpg" alt="Profile Photo" 
                     class="mt-8 w-full max-w-xs h-auto rounded-full" 
                     loading="eager" 
                     width="320" 
                     height="320"
                     fetchpriority="high">
                <div class="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-30"></div>
              </div>
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-muted text-sm">Paris, France</p>
                  </div>
                  <div class="flex space-x-3">
                    <a href="https://www.linkedin.com/in/yohanncch/" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-accent transition-colors"><i class="fab fa-linkedin"></i></a>
                    <a href="https://github.com/Yohvnn/" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-accent transition-colors"><i class="fab fa-github"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <!-- About Me -->
            <div class="card p-5 animate-float-in opacity-0 delay-100">
              <h2 class="chinese-heading text-xl font-medium border-l-2 border-primary pl-3 mb-4">关于我 <span class="text-base text-muted">(About Me)</span></h2>
              <p class="text-foreground/90 leading-relaxed">
                I am a Junior Research Engineer based in Paris, specializing in Front-End Generative AI Applications.
                <br><br>
               Currently pursuing a Master's in Data Science & AI, I work with Vue.js, TypeScript, and fullstack systems integrating LLMs and RAG. 
               <br><br>
               Passionate about both tech and creativity, I explore IoT, web development, UX/UI design, photography, videography, and gravel biking. Multicultural and multilingual, I am French Malagasy and Chinese, fluent in English, French, and Malagasy.
              </p>
            </div>
            
            <!-- Add a decorative Chinese element -->
            <!-- <div class="card p-4">
              <div class="flex justify-center">
                <div class="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center">
                  <span class="text-6xl font-serif text-primary">智</span>
                </div>
              </div>
            </div> -->

            <!-- Additional Photo Gallery -->
            <div class="grid grid-cols-4 gap-3 will-change-transform">
              <div class="card p-0 overflow-hidden">
                <img src="@/assets/DSC00305.jpg" alt="Gallery Photo" class="w-full h-20 object-cover"
                     loading="lazy" width="160" height="80">
              </div>
              <div class="card p-0 overflow-hidden">
                <img src="@/assets/DSC00396.jpg" alt="Gallery Photo" class="w-full h-20 object-cover"
                     loading="lazy" width="160" height="80">
              </div>
              <div class="card p-0 overflow-hidden">
                <img src="@/assets/marseille_sea.jpg" alt="Gallery Photo" class="w-full h-20 object-cover"
                     loading="lazy" width="160" height="80">
              </div>
              <div class="card p-0 overflow-hidden">
                <img src="@/assets/sete_water.jpg" alt="Gallery Photo" class="w-full h-20 object-cover"
                     loading="lazy" width="160" height="80">
              </div>
            </div>
          </div>
          
          <!-- Column 2: Education and Work Experience -->
          <div class="space-y-6">
            <!-- Education Section -->
            <section class="card p-5 animate-float-in opacity-0 delay-200">
              <h2 class="chinese-heading text-xl font-medium border-l-2 border-primary pl-3 mb-4">教育 <span class="text-base text-muted">(Education)</span></h2>
              <EducationList />
            </section>

            <!-- Work Section -->
            <section class="card p-5 animate-float-in opacity-0 delay-300">
              <h2 class="chinese-heading text-xl font-medium border-l-2 border-primary pl-3 mb-4">工作经验 <span class="text-base text-muted">(Work Experience)</span></h2>
              <WorkList />
            </section>
          </div>
          
          <!-- Column 3: Skills -->
          <div class="space-y-6">
            <!-- Skills Section -->
            <section class="card p-5  animate-float-in opacity-0 delay-400">
              <h2 class="chinese-heading text-xl font-medium border-l-2 border-primary pl-3 mb-4">技能 <span class="text-base text-muted">(Skills)</span></h2>
              <SkillsList />
            </section>
          </div>
        </main>

        <!-- Footer -->
        <footer class="py-4 border-t border-border">
          <div class="mt-2 flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-muted mb-2 md:mb-0">© {{ new Date().getFullYear() }} Yohann Chan Chew Hong</p>
            <div class="flex space-x-6">
              <span class="text-xs text-muted">Built with ♥️ in Vue.js & Tailwind CSS ✨</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
    
    <!-- Color Theme Picker (now hidden by default and toggled) -->
    <!-- <div v-if="isColorPickerVisible" class="fixed bottom-4 left- z-50">
      <div class="card p-4 rounded-lg shadow-lg animate-float">
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
    </div> -->
  </div>
</template>

<script>
import EducationList from './components/EducationList.vue';
import WorkList from './components/WorkList.vue';
import SkillsList from './components/SkillsList.vue';

export default {
  components: {
    EducationList,
    WorkList,
    SkillsList,
  },
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      isLoading: true,
      // isColorPickerVisible: false,
      currentTheme: localStorage.getItem('theme') || 'theme-classic',
      messages: ["加载中... (Loading...)", "请稍等... (Please wait...)", "即将完成... (Almost done...)"],
      currentMessageIndex: 0,
      imageObserver: null,
      imagesLoaded: 0,
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentMessageIndex];
    },
  },
  mounted() {
    // Apply saved theme or default theme
    document.body.classList.add(this.currentTheme);
    
    // Apply dark mode if needed
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    }
    
    // Setup Intersection Observer for lazy loading
    this.setupImageLazyLoading();
    
    // Show loading screen
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
    }, 1000);
    
    // Performance optimizations for scrolling
    this.optimizeScrollPerformance();
  },
  beforeUnmount() {
    // Disconnect observer to prevent memory leaks
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
    
    // Remove event listeners
    window.removeEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', this.isDarkMode);
      document.body.classList.toggle('dark', this.isDarkMode);
    },
    setupImageLazyLoading() {
      // Setup Intersection Observer for images
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };
      
      this.imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              this.imagesLoaded++;
            }
            
            observer.unobserve(img);
          }
        });
      }, options);
      
      // Start observing images after component mounts
      this.$nextTick(() => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => this.imageObserver.observe(img));
      });
    },
    optimizeScrollPerformance() {
      // Force browsers to use hardware acceleration
      const contentContainer = document.querySelector('.overflow-auto');
      if (contentContainer) {
        contentContainer.style.willChange = 'transform';
        contentContainer.style.transform = 'translateZ(0)';
        
        // Add passive event listeners for better scroll performance
        const throttledScrollHandler = this.throttle(() => {
          // Could add scroll-based animations here
        }, 100);
        
        contentContainer.addEventListener('scroll', throttledScrollHandler, { passive: true });
        this.throttledScrollHandler = throttledScrollHandler;
      }
    },
    throttle(callback, limit) {
      let waiting = false;
      return function() {
        if (!waiting) {
          callback.apply(this, arguments);
          waiting = true;
          setTimeout(() => {
            waiting = false;
          }, limit);
        }
      };
    }
    // Other existing methods...
  }
};
</script>

<style>
html, body {
  scroll-behavior: smooth;
  font-family: 'Noto Sans SC', 'Inter', 'ui-sans-serif', 'system-ui', sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  height: 100%;
}

/* Performance optimizations */
img {
  backface-visibility: hidden; /* Prevents flickering during animations */
}

.overflow-auto {
  -webkit-overflow-scrolling: touch; /* Smoother scrolling on iOS */
}

/* Reduce paint operations during scrolling */
.will-change-transform {
  will-change: transform;
  transform: translateZ(0); /* Force GPU acceleration */
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-background);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 6px;
  border: 3px solid var(--color-background);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-muted);
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>