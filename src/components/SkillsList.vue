<template>
  <div class="s">
    <!-- Skills Categories -->
    <div class="grid grid-cols-2 gap-8">
      <!-- Programming & Data Science -->
      <div class="animate-float-in opacity-0 delay-100">
        <h3 class="font-medium text-black dark:text-foreground mb-3 flex items-center">
          <i class="fas fa-code mr-2 text-accent"></i> Programming & Data Science
        </h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="(skill, index) in programmingSkills" :key="index"
            class="text-xs px-2.5 py-1 rounded-md bg-border dark:bg-border text-foreground">
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Databases & Data Management -->
      <div class="animate-float-in opacity-0 delay-200">
        <h3 class="font-medium text-black dark:text-foreground mb-3 flex items-center">
          <i class="fas fa-database mr-2 text-accent"></i> Databases & Data Management
        </h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="(skill, index) in databaseSkills" :key="index"
            class="text-xs px-2.5 py-1 rounded-md bg-border dark:bg-border text-foreground">
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Web Development & Systems -->
      <div class="animate-float-in opacity-0 delay-300">
        <h3 class="font-medium text-black dark:text-foreground mb-3 flex items-center">
          <i class="fas fa-globe mr-2 text-accent"></i> Web Development & Systems
        </h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="(skill, index) in webSkills" :key="index"
            class="text-xs px-2.5 py-1 rounded-md bg-border dark:bg-border text-foreground">
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Media & Design -->
      <div class="animate-float-in opacity-0 delay-400">
        <h3 class="font-medium text-black dark:text-foreground mb-3 flex items-center">
          <i class="fas fa-paint-brush mr-2 text-accent"></i> Media & Design
        </h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="(skill, index) in mediaSkills" :key="index"
            class="text-xs px-2.5 py-1 rounded-md bg-border dark:bg-border text-foreground">
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      programmingSkills: ["C", "C++", "Python", "Java", "R", "TensorFlow", "PyTorch", "RDF", "SPARQL"],
      databaseSkills: ["SQL", "PL/SQL", "MariaDB", "MySQL", "Neo4j", "SAS", "AWS", "Git", "Bash"],
      webSkills: ["Vue.js", "Nest", "Typescript", "Tailwind", "Lambda", "RAG", "Vectorization"],
      mediaSkills: ["Premiere Pro", "Lightroom", "Photoshop", "Figma", "Canva", "WordPress"],
    };
  },
};
</script>

<style scoped>
/* Animation for skill bars is managed by tailwind classes */
</style>