<script setup>
import AppHeader from '../components/AppHeader.vue'
import EducationList from '../components/EducationList.vue'
import WorkList from '../components/WorkList.vue'
import SkillsList from '../components/SkillsList.vue'
import ColorPickerModal from '../components/ui/ColorPickerModal.vue'
import { ref } from 'vue'

const proficiencySkills = ref([
  { name: "Programming", level: 80 },
  { name: "Machine Learning & Data Science", level: 70 },
  { name: "Web Development", level: 65 },
  { name: "Database Management", level: 75 },
  { name: "Media & Design", level: 70 },
  { name: "English (C1)", level: 90 },
])
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header with name -->
    <AppHeader />


    <!-- Global Color Picker Modal -->
    <ColorPickerModal />

    <!-- Main Content - Auto-fitting Grid Layout -->
    <main class="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto smooth-scroll">
      
      <!-- Profile Photo Card -->
      <div class="card p-4 animate-float-in opacity-0 delay-100 col-span-1">
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
      <section class="card p-5 animate-float-in opacity-0 delay-900 col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2">
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

      <!-- Toolbox Card -->
      <section class="card p-5 animate-float-in opacity-0 delay-500 col-span-1 xl:col-span-4 lg:col-span-1 md:col-span-2 sm:col-span-2">
        <h2 class="text-xl font-medium border-l-2 border-primary pl-3 mb-2">🧰 Tools</h2>
        <p class="text-foreground/90 text-sm mb-4">Explore my collection of utility tools and applications.</p>
        <router-link 
          to="/toolbox"
          class="inline-block px-4 py-2 bg-primary text-background rounded-md hover:opacity-80 transition-opacity">
          View Toolbox
        </router-link>
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
</template>

<style scoped>

</style>
