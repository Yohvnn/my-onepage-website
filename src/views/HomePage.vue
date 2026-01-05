<script setup>
import EducationList from '../components/EducationList.vue'
import WorkList from '../components/WorkList.vue'
import SkillsList from '../components/SkillsList.vue'
</script>

<template>
  <div class="h-full">
    <div class="grid lg:grid-cols-2 gap-8 h-full">
      <!-- Left column: About -->
      <section class="flex items-start">
        <div class="max-w-5xl lg:mt-20 mt-5">
          <h2 class="lg:text-5xl text-3xl font-light mb-3">{{ $t('home.aboutTitle') }}</h2>
          <p class="text-muted lg:text-2xl text-xl max-w-prose">{{ $t('home.aboutText') }}</p>
          
          <!-- Social Links -->
          <div class="mt-4 text-muted">
            <a href="https://github.com/Yohvnn" target="_blank" class=" hover:underline">{{ $t('home.social.github') }}</a>
            <span class="mx-2 text-muted">|</span>
            <a href="https://www.linkedin.com/in/yohanncch" target="_blank" class="hover:underline">{{ $t('home.social.linkedin') }}</a>
            <span class="mx-2 text-muted">|</span>
            <a href="https://strava.app.link/L7dTSyHhFZb" target="_blank" class="hover:underline">{{ $t('home.social.strava') }}</a>
          </div>

          <!-- Link to About the Studio -->
          <div class="">
            <router-link :to="{ name: 'About' }" class="text-muted hover:underline text-base">
              {{ $t('about.title') }} ><span class="timer-colon-animate">_</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Right column: Stacked lists -->
      <section class="mt-5 lg:mt-20">
        <div class="flex flex-col gap-8 lg:pl-8 lg:border-l lg:border-border">
          <div>
            <h2 class="text-base mb-2">{{ $t('home.workTitle') }}</h2>
            <WorkList />
          </div>
          <div>
            <h2 class="text-base mb-2">{{ $t('home.educationTitle') }}</h2>
            <EducationList />
          </div>
          <div>
            <h2 class="text-base mb-2">{{ $t('home.skillsTitle') }}</h2>
            <SkillsList />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>


</style>
