<template>
  <div class="h-screen bg-background text-foreground overflow-hidden flex flex-col transition-all duration-300 ease-in-out">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
      <!-- Geeky AI Loading Animation -->
      <div class="relative mb-8">
        <!-- Matrix-style background -->
        <div class="absolute inset-0 overflow-hidden opacity-10">
          <div class="matrix-rain"></div>
        </div>
        
        <!-- Neural Network Visualization -->
        <div class="relative w-32 h-32 flex items-center justify-center">
          <!-- Central AI Core -->
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative animate-pulse">
            <span class="text-white font-bold text-xl">YC</span>
            <!-- Data points around the core -->
            <div class="absolute -top-2 -left-2 w-4 h-4 bg-accent rounded-full animate-ping"></div>
            <div class="absolute -top-2 -right-2 w-3 h-3 bg-accent rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
            <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full animate-ping" style="animation-delay: 1s;"></div>
            <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-accent rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
          </div>
          
          <!-- Orbiting Data Nodes -->
          <div class="absolute inset-0 animate-spin" style="animation-duration: 3s;">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
            <div class="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
            <div class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
          </div>
          
          <!-- Counter-rotating ring -->
          <div class="absolute inset-2 border-2 border-primary/30 rounded-full animate-spin" style="animation-duration: 2s; animation-direction: reverse;"></div>
        </div>
      </div>
      
      <!-- Geeky Loading Message -->
      <div class="text-center w-96 max-w-sm mx-auto px-4">
        <div class="text-xl font-bold text-primary mb-2 font-mono h-8 flex items-center justify-center">
          {{ currentMessage }}
        </div>
        <div class="text-sm text-muted font-mono h-6 flex items-center justify-center">
          {{ currentSubMessage }}
        </div>
        
        <!-- Progress Bar - Fixed width -->
        <div class="w-80 bg-border rounded-full h-2 mt-6 overflow-hidden mx-auto">
          <div class="bg-primary h-2 rounded-full animate-pulse transition-all duration-300" :style="{ width: loadingProgress + '%' }"></div>
        </div>
        
        <!-- Terminal-style output - Fixed size -->
        <div class="mt-6 text-left bg-black/10 rounded-md p-4 font-mono text-xs text-muted border w-80 h-32 mx-auto overflow-hidden">
          <div class="h-full flex flex-col justify-end">
            <div v-for="(log, index) in terminalLogs.slice(-4)" :key="index" class="animate-fade-in leading-tight">
              <span class="text-accent">></span> {{ log }}
            </div>
            <div class="flex items-center">
              <span class="text-accent">></span>
              <span class="animate-pulse ml-1">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container mx-auto p-3 relative flex-grow flex flex-col h-full overflow-auto smooth-scroll scroll-container">
      <!-- Full screen vertical layout -->
      <div class="flex flex-col h-full">
        
        <!-- Header with name -->
        <header class="py-3">
          <div class="flex flex-col md:flex-row items-center md:justify-between">
            <div class="flex items-center  md:mb-0 mb-3">
              <div>
                <h1 class="text-2xl md:text-3xl font-bold tracking-wide text-foreground">YOHANN CHAN CHEW HONG</h1>
                <p class="text-muted">Junior Gen AI Research Engineer</p>
              </div>
            </div>
            <div class="flex space-x-2 items-center">
              <!-- Dark Mode Toggle Button -->
              <button @click="toggleDarkMode"
                class="rounded-md flex items-center justify-center p-2
                btn text-sm flex items-center w-9 h-9 hover:bg-border transition-colors duration-200">
                <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-muted transition-colors duration-200"></i>
              </button>
              
              <!-- Theme Button (triggers ColorPicker) -->
              <button @click="toggleColorPicker"
                class="rounded-md flex items-center justify-center p-2
                btn text-sm flex items-center w-9 h-9 hover:bg-border transition-colors duration-200">
                <i class="fas fa-palette text-muted transition-colors duration-200"></i>
              </button>

              <a href="mailto:cchongyohann@gmail.com" class="btn py-2 px-4 rounded-md btn-contact bg-accent dark:bg-accent text-sm flex items-center">
                <i class="fas fa-envelope mr-2 "></i> Contact Me
              </a>
            </div>
          </div>
        </header>

        <!-- Color Picker Modal -->
        <div v-if="isColorPickerVisible" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" @click="closeColorPicker">
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
        </div>

        <!-- Toast Notification -->
        <div v-if="showToast" class="fixed top-4 right-4 z-50 animate-slide-in">
          <div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <i class="fas fa-exclamation-triangle"></i>
            <span>{{ toastMessage }}</span>
          </div>
        </div>

        <!-- Main Content - Auto-fitting Grid Layout -->
        <main class="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto smooth-scroll">
          
          <!-- Profile Photo Card -->
          <div class="card p-4 col-span-1">
            <div class="relative flex justify-center mb-2">
              <img src="@/assets/profile_pic.jpg" alt="Profile Photo" 
                   class="w-full max-w-xs h-auto rounded-full" 
                   loading="eager" 
                   width="320" 
                   height="320"
                   fetchpriority="high">
            </div>
            <div class="text-center">
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

          <!-- About Me Card -->
          <div class="card p-5 animate-float-in opacity-0 delay-100 col-span-1">
            <h2 class="text-xl font-medium border-l-2 border-primary pl-3 mb-2">About Me</h2>
            <p class="text-foreground/90 leading-relaxed text-sm ">
              I am a Junior Research Engineer based in Paris, specializing in Front-End Generative AI Applications.
              <br><br>
             Currently pursuing a Master's in Data Science & AI, I work with Vue.js, TypeScript, and fullstack systems integrating LLMs and RAG. 
             <br><br>
             Passionate about both tech and creativity, I explore IoT, web development, UX/UI design, photography, videography, and gravel biking.
            </p>
            
            <!-- Photography Row -->
            <div class="grid grid-cols-4 gap-2 mt-4">
              <div class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                <img src="@/assets/DSC00305.jpg" alt="Gallery Photo 1" class="w-full h-16 object-cover"
                     loading="lazy" width="80" height="64">
              </div>
              <div class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                <img src="@/assets/djigravel.jpg" alt="Gallery Photo 2" class="w-full h-16 object-cover"
                     loading="lazy" width="80" height="64">
              </div>
              <div class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                <img src="@/assets/R0007022.jpg" alt="Gallery Photo 3" class="w-full h-16 object-cover"
                     loading="lazy" width="80" height="64">
              </div>
              <div class="overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                <img src="@/assets/R0008751.jpg" alt="Gallery Photo 4" class="w-full h-16 object-cover"
                     loading="lazy" width="80" height="64">
              </div>
            </div>
          </div>

          <!-- Education Card -->
          <section class="card p-5 animate-float-in opacity-0 delay-200 col-span-1">
            <h2 class="text-xl font-medium border-l-2 border-primary pl-3 mb-2">Education</h2>
            <EducationList />
          </section>

          <!-- Work Experience Card -->
          <section class="card p-5 animate-float-in opacity-0 delay-300 col-span-1">
            <h2 class="text-xl font-medium border-l-2 border-primary pl-3 mb-2">Work Experience</h2>
            <WorkList />
          </section>

          <!-- Skills Card -->
          <section class="card p-5 animate-float-in opacity-0 delay-400 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
            <h2 class="text-xl font-medium border-l-2 border-primary pl-3 mb-2">Skills</h2>
            <SkillsList />
          </section>

          <!-- Proficiency Card -->
          <section class="card p-5 animate-float-in opacity-0 delay-900 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2">
            <h2 class="text-xl font-medium border-l-2 border-primary pl-3 mb-2">Proficiency</h2>
            <div class="grid grid-cols-1 gap-y-4">
              <div v-for="(skill, index) in proficiencySkills" :key="index" class="flex flex-col space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-foreground">{{ skill.name }}</span>
                  <span class="text-xs text-muted">{{ skill.level }}%</span>
                </div>
                <div class="h-1.5 bg-border dark:bg-border/50 rounded-full overflow-hidden">
                  <div :style="{ width: skill.level + '%' }"
                    class="h-full bg-primary dark:bg-primary rounded-full transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </section>

          
        </main>

        <!-- Footer -->
        <footer class="py-4">
          <div class=" flex flex-col md:flex-row justify-between items-center">
            <p class="text-sm text-muted mb-2 md:mb-0">© {{ new Date().getFullYear() }} Yohann Chan Chew Hong</p>
            <div class="flex space-x-6">
                <span class="text-xs text-muted">Built with &lt;3 in Vue.js & Tailwind CSS</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
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
      isColorPickerVisible: false,
      currentTheme: 'default',
      hexColor: '#000000',
      colorPresets: ['#000000', '#ffffff', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
      showToast: false,
      toastMessage: '',
      proficiencySkills: [
        { name: "Programming", level: 80 },
        { name: "Machine Learning & Data Science", level: 70 },
        { name: "Web Development", level: 65 },
        { name: "Database Management", level: 75 },
        { name: "Media & Design", level: 70 },
        { name: "English (C1)", level: 90 },
      ],
      messages: [
        "Training neural networks...",
        "Optimizing algorithms...",
        "Processing data tensors...",
        "Calibrating AI models...",
        "Initializing machine learning...",
        "Compiling deep learning layers...",
        "Loading feature vectors...",
        "Synchronizing data pipelines..."
      ],
      subMessages: [
        "Gradient descent in progress...",
        "Backpropagation active...",
        "Feature engineering complete",
        "Model weights converging...",
        "Data preprocessing finished",
        "Hyperparameter tuning...",
        "Cross-validation running...",
        "Ensemble methods loading..."
      ],
      terminalLogs: [],
      currentMessageIndex: 0,
      currentSubMessageIndex: 0,
      loadingProgress: 0,
      imageObserver: null,
      imagesLoaded: 0,
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentMessageIndex];
    },
    currentSubMessage() {
      return this.subMessages[this.currentSubMessageIndex];
    },
    isValidHex() {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.hexColor);
    },
    filteredColorPresets() {
      if (this.isDarkMode) {
        // In dark mode, hide black color (#000000)
        return this.colorPresets.filter(color => color !== '#000000');
      } else {
        // In light mode, hide white color (#ffffff)
        return this.colorPresets.filter(color => color !== '#ffffff');
      }
    },
  },
  mounted() {
    // Load saved color first
    this.loadSavedColor();
    
    // Apply dark mode if needed with smooth transition
    if (this.isDarkMode) {
      // Add transition class for initial load
      const appElement = document.getElementById('app');
      if (appElement) {
        appElement.classList.add('dark-mode-transition');
      }
      document.documentElement.classList.add('dark-mode-transition');
      document.body.classList.add('dark-mode-transition');
      
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      
      // Clean up transitions after initial load
      setTimeout(() => {
        if (appElement) {
          appElement.classList.remove('dark-mode-transition');
        }
        document.documentElement.classList.remove('dark-mode-transition');
        document.body.classList.remove('dark-mode-transition');
      }, 300);
    }
    
    // Setup Intersection Observer for lazy loading
    this.setupImageLazyLoading();
    
    // Enhanced geeky loading sequence
    const loadingDuration = 3500; // 3.5 seconds
    const logMessages = [
      "Initializing neural pathways...",
      "Loading training datasets...",
      "Configuring transformer models...",
      "Establishing data connections...",
      "Optimizing inference speed...",
      "Ready to rock!"
    ];
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      this.loadingProgress += 2;
      if (this.loadingProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 80);
    
    // Terminal logs animation
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        this.terminalLogs.push(logMessages[logIndex]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 600);
    
    // Main message rotation
    const messageInterval = setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
      this.currentSubMessageIndex = (this.currentSubMessageIndex + 1) % this.subMessages.length;
    }, 500);
    
    // Hide loading screen
    setTimeout(() => {
      this.isLoading = false;
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearInterval(logInterval);
    }, loadingDuration);
    
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
    
    // Clean up custom color style element
    this.removePrimaryColorOverride();
  },
  methods: {
    toggleDarkMode() {
      // Add transition class for synchronized animation
      const appElement = document.getElementById('app');
      if (appElement) {
        appElement.classList.add('dark-mode-transition');
      }
      document.documentElement.classList.add('dark-mode-transition');
      document.body.classList.add('dark-mode-transition');
      
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', this.isDarkMode);
      
      // Apply dark mode to both document and body synchronously
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      
      // Maintain custom primary color after theme switch
      this.loadSavedColor(true); // Pass silent=true to avoid toast during theme switch
      
      // Remove transition classes after animation completes
      setTimeout(() => {
        if (appElement) {
          appElement.classList.remove('dark-mode-transition');
        }
        document.documentElement.classList.remove('dark-mode-transition');
        document.body.classList.remove('dark-mode-transition');
      }, 300);
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
    },
    // Color Picker Methods
    toggleColorPicker() {
      this.isColorPickerVisible = !this.isColorPickerVisible;
      if (this.isColorPickerVisible) {
        // Get current primary color from localStorage or use current computed color
        const savedColor = localStorage.getItem('primaryColor');
        if (savedColor) {
          this.hexColor = savedColor;
        } else {
          const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
          this.hexColor = currentColor || (this.isDarkMode ? '#ffffff' : '#000000');
        }
      }
    },
    closeColorPicker() {
      this.isColorPickerVisible = false;
    },
    validateHex() {
      // Auto-add # if not present
      if (this.hexColor && !this.hexColor.startsWith('#')) {
        this.hexColor = '#' + this.hexColor;
      }
    },
    selectColor(color) {
      // Check if the color is allowed in current theme
      if (this.isDarkMode && color === '#000000') {
        this.showToastMessage("You can't do that! Black color is not allowed in dark mode.");
        return;
      }
      if (!this.isDarkMode && color === '#ffffff') {
        this.showToastMessage("You can't do that! White color is not allowed in light mode.");
        return;
      }
      
      this.hexColor = color;
    },
    applyColor() {
      if (this.isValidHex) {
        // Additional validation for manual hex input
        if (this.isDarkMode && this.hexColor.toLowerCase() === '#000000') {
          this.showToastMessage("You can't do that! Black color is not allowed in dark mode.");
          return;
        }
        if (!this.isDarkMode && this.hexColor.toLowerCase() === '#ffffff') {
          this.showToastMessage("You can't do that! White color is not allowed in light mode.");
          return;
        }
        
        this.setPrimaryColor(this.hexColor);
        
        // Store in localStorage for persistence
        localStorage.setItem('primaryColor', this.hexColor);
        
        // Close the picker
        this.closeColorPicker();
      }
    },
    resetToDefault() {
      // Remove custom color
      localStorage.removeItem('primaryColor');
      this.removePrimaryColorOverride();
      
      // Set default color based on theme
      const defaultColor = this.isDarkMode ? '#ffffff' : '#000000';
      this.hexColor = defaultColor;
      
      this.closeColorPicker();
    },
    loadSavedColor(silent = false) {
      const savedColor = localStorage.getItem('primaryColor');
      if (savedColor && this.isValidColorFormat(savedColor)) {
        // Validate that the saved color is appropriate for current theme
        if (this.isDarkMode && savedColor.toLowerCase() === '#000000') {
          if (!silent) {
            this.showToastMessage("You can't do that! Removing incompatible black color from dark mode.");
          }
          localStorage.removeItem('primaryColor');
          this.removePrimaryColorOverride();
          return;
        }
        if (!this.isDarkMode && savedColor.toLowerCase() === '#ffffff') {
          if (!silent) {
            this.showToastMessage("You can't do that! Removing incompatible white color from light mode.");
          }
          localStorage.removeItem('primaryColor');
          this.removePrimaryColorOverride();
          return;
        }
        
        this.setPrimaryColor(savedColor);
        this.hexColor = savedColor;
      } else {
        // Remove any custom color override to use theme defaults
        this.removePrimaryColorOverride();
      }
    },
    setPrimaryColor(color) {
      // Create or update a style element to override CSS custom properties
      let styleElement = document.getElementById('custom-primary-color');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'custom-primary-color';
        document.head.appendChild(styleElement);
      }
      
      // Use high specificity CSS to override both light and dark mode
      styleElement.textContent = `
        :root {
          --color-primary: ${color} !important;
        }
        .dark {
          --color-primary: ${color} !important;
        }
        html.dark {
          --color-primary: ${color} !important;
        }
        body.dark {
          --color-primary: ${color} !important;
        }
      `;
    },
    removePrimaryColorOverride() {
      const styleElement = document.getElementById('custom-primary-color');
      if (styleElement) {
        styleElement.remove();
      }
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    isValidColorFormat(color) {
      // Validate hex color format
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    }
    // Other existing methods...
  }
};
</script>

<style>
html, body {
  scroll-behavior: smooth;
  font-family: 'Inter', 'Poppins', 'ui-sans-serif', 'system-ui', sans-serif;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  height: 100%;
}

/* Performance optimizations for smooth scrolling */
img {
  backface-visibility: hidden; /* Prevents flickering during animations */
  transform: translateZ(0); /* Force GPU acceleration */
}

.overflow-auto {
  -webkit-overflow-scrolling: touch; /* Smoother scrolling on iOS */
  scroll-behavior: smooth;
  will-change: scroll-position;
}

/* Reduce paint operations during scrolling */
.will-change-transform {
  will-change: transform;
  transform: translateZ(0); /* Force GPU acceleration */
}

/* Enhanced scrolling performance */
.container {
  will-change: scroll-position;
  transform: translateZ(0);
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

/* Toast slide-in animation */
.animate-slide-in {
  animation: slideInFromRight 0.3s ease-out;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>