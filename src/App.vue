<template>
  <div :class="{ 'dark': isDarkMode }"
    class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-8 lg:p-16">
    <div
      class="border-2 border-customLightBorder dark:border-customDarkBorder flex max-w-[1600px] flex-col lg:flex-row bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden">
      <aside class="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-4 p-8">
        <div class="lg:text-left text-center mb-8">
          <img src="@/assets/profile_bw.jpg" alt="Profile Photo"
            class="w-full max-w-xs lg:max-w-md h-auto mb-4">
          <div class="inline-block">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">YOHANN</h1>
            <hr class="border-2 border-gray-900 dark:border-white my-2 w-full">
          </div>
          <div class="text-lg">
            <p class="text-gray-500 dark:text-gray-300">CHAN CHEW HONG</p>
            <p class="text-gray-500 dark:text-gray-300">Junior Gen AI Engineer</p>
            <p class="text-gray-500 dark:text-gray-300">
              <a href="tel:+33754185986" class="hover:underline">+33 7 54 18 59 86</a>
            </p>
            <p class="text-gray-500 dark:text-gray-300">
              <a href="mailto:cchongyohann@gmail.com" class="hover:underline">cchongyohann@gmail.com</a>
            </p>
          </div>

        </div>
      </aside>
      <main class="w-full lg:space-y-8 lg:pl-16 p-8">
        <Section title="About Me">
          <div class="mb-8">
            <p class="text-gray-600 dark:text-gray-300 mt-2">
              I am a Junior Production Software Engineer specializing in Front-End Generative AI Applications based in
              Paris.
              Currently studying Data Science, my interests span across IoT, AI, web development, esports, NTIC, web
              design,
              PC assembly, music, photography and videography. As a French Malagasy and Chinese individual,
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
    };
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
</style>