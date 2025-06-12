<template>
  <div class="mb-2">
    <!-- Skills Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <!-- Programming & Data Science -->
      <div class="card card-hover p-4 animate-float-in opacity-0 delay-100">
        <h3 class="font-medium text-primary dark:text-foreground mb-3 flex items-center">
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
      <div class="card card-hover p-4 animate-float-in opacity-0 delay-200">
        <h3 class="font-medium text-primary dark:text-foreground mb-3 flex items-center">
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
      <div class="card card-hover p-4 animate-float-in opacity-0 delay-300">
        <h3 class="font-medium text-primary dark:text-foreground mb-3 flex items-center">
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
      <div class="card card-hover p-4 animate-float-in opacity-0 delay-400">
        <h3 class="font-medium text-primary dark:text-foreground mb-3 flex items-center">
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

    <!-- Skill Bars -->
    <div class="mt-6 card animate-float-in opacity-0 delay-500 p-4">
      <h3 class="font-medium text-primary dark:text-foreground mb-4 flex items-center">
        <i class="fas fa-chart-bar mr-2 text-accent"></i> Proficiency
      </h3>

      <ul class="space-y-5">
        <li v-for="(skill, index) in skills" :key="index" class="flex flex-col space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-foreground">{{ skill.name }}</span>
            <span class="text-xs text-muted">{{ skill.level }}%</span>
          </div>
          <div class="h-1.5 bg-border dark:bg-border/50 rounded-full overflow-hidden">
            <div :style="{ width: skill.level + '%' }"
              class="h-full bg-primary dark:bg-primary rounded-full transition-all duration-1000"></div>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-6 animate-float-in opacity-0 delay-500 p-3">
      <div class="flex justify-center">
        <div class="w-auto h-1 bg-primary/5 rounded-full flex items-center justify-center">
          <span class="text-xl font-serif text-primary">“数据驱动经济”<span class="text-sm text-muted">("Data drive the economy")</span> </span>
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
      skills: [
        { name: "Programming", level: 80 },
        { name: "Machine Learning & Data Science", level: 70 },
        { name: "Web Development", level: 65 },
        { name: "Database Management", level: 75 },
        { name: "Media & Design", level: 70 },
      ],
    };
  },
};
</script>

<style scoped>
/* Animation for skill bars is managed by tailwind classes */
</style>
