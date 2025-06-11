<template>
  <div>
    <!-- <div v-if="isLoading" class="loading-screen">
      <div class="">
        <div class="loading-message">{{ currentMessage }}</div>
      </div>
    </div> -->

    <div :class="{ 'dark': isDarkMode }"
      class="relative flex items-center justify-center min-h-screen bg-cover bg-center p-8 lg:p-16 transition-colors duration-500 ease-in-out">
      <div class="absolute inset-0 bg-black transition-opacity duration-500 ease-in-out"
        :class="{ 'opacity-50': isDarkMode, 'opacity-0': !isDarkMode }"></div>
      <div class="absolute inset-0 bg-grain"></div>
      <div
        class="relative border-2 border-customLightBorder dark:border-customDarkBorder flex max-w-[1600px] flex-col lg:flex-row bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden animate-fade-in">
        <aside class="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-4 p-8 animate-slide-in-left">
          <div class="lg:text-left text-center mb-8">
            <img src="@/assets/profile_bw.jpg" alt="Profile Photo" class="w-full max-w-xs lg:max-w-md h-auto mb-4">
            <div class="inline-block">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">YOHANN</h1>
              <hr class="border-2 border-gray-900 dark:border-white my-2 w-full">
            </div>
            <div class="text-lg">
              <p class="text-gray-500 dark:text-gray-300">CHAN CHEW HONG</p>
              <p class="text-gray-500 dark:text-gray-300">Junior Gen AI Research Engineer</p>
              <!-- <p class="text-gray-500 dark:text-gray-300">
                <a href="tel:+33754185986" class="hover:underline">+33 7 54 18 59 86</a>
              </p> -->
              <p class="text-gray-500 dark:text-gray-300">
                <a href="mailto:cchongyohann@gmail.com" class="hover:underline">cchongyohann@gmail.com</a>
              </p>
              <p class="text-gray-500 dark:text-gray-300">
              Paris, France
              </p>
            </div>
          </div>
        </aside>
        <main class="w-full lg:space-y-8 lg:pl-16 p-8 animate-slide-in-right">
          <Section title="About Me">
            <div class="mb-8">
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                I am a Junior Research Engineer specializing in Front-End Generative AI Applications based in
                Paris, France.
                Currently studying Data Science, my interests span across IoT, AI, web development, esports, NTIC, web
                design,
                PC assembly, gravel biking, music, photography and videography. As a French Malagasy and Chinese
                individual,
                I am fluent in English, French, and Malagasy, with an understanding of Spanish and basic knowledge of
                Mandarin.
              </p>
            </div>
          </Section>
          <Section title="Education">
            <EducationList />
          </Section>
          <Section title="Work">
            <WorkList />
          </Section>
          <Section title="Skills">
            <SkillsList />
          </Section>
        </main>
      </div>
      <button @click="toggleDarkMode"
        class="fixed bottom-4 right-4 border-2 border-customLightBorder hover:border-customDarkBorder bg-white dark:bg-black shadow-lg dark:border-customDarkBorder text-gray-700 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition duration-300 ease-in-out hover:bg-customDarkBorder hover:text-white focus:outline-none dark:text-gray-200 dark:hover:bg-customDarkBorder">
        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Section from './components/SectionList.vue';
import EducationList from './components/EducationList.vue';
import WorkList from './components/WorkList.vue';
import SkillsList from './components/SkillsList.vue';

export default {
  components: {
    Section,
    EducationList,
    WorkList,
    SkillsList,
  },
  data() {
    return {
      isDarkMode: localStorage.getItem('isDarkMode') === 'true',
      isLoading: true,
      messages: ["Just a moment...", "Almost there...", "Loading..."],
      currentMessageIndex: 0,
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentMessageIndex];
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simulate loading time

    setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
    }, 2000); // Change message every second
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', this.isDarkMode);
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
  },
};
</script>

<style scoped>
.hover-zoom {
  transition: transform 0.3s ease-in-out;
}

.hover-zoom:hover {
  transform: scale(1.05);
}

body {
  font-family: 'Geist', 'bricolage-grotesque', 'Montserrat', 'Roboto', Arial, sans-serif;
}

.bg-cover {
  background-image: url('@/assets/0E8A5111.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-grain {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6l5nAAAAABJRU5ErkJggg==');
  opacity: 0.2;
  mix-blend-mode: overlay;
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  /* Black background */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  /* Ensure it is above all other elements */
}


.loading-message {
  font-size: 1.2rem;
  color: #ffffff;
  /* Light blue */
  animation: fade 2s infinite;
  /* Fading effect */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    /* Start position */
  }

  100% {
    transform: rotate(360deg);
    /* Complete spin */
  }
}

@keyframes fade {

  0%,
  100% {
    opacity: 0;
    /* Fully transparent */
  }

  50% {
    opacity: 1;
    /* Fully visible */
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-in-out;
}

.animate-slide-in-right {
  animation: slideInRight 1s ease-in-out;
}
</style>