<template>
  <div class="mb-8">
    <ul class="text-gray-600 dark:text-gray-200">
      <!-- Programming & Data Science -->
      <li class="mb-4">
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <span class="w-full sm:w-64 font-semibold">Programming & Data Science</span>
          <span>C, C++, Python, Java, R, TensorFlow, PyTorch, RDF, SPARQL, ontologies</span>
        </div>
      </li>

      <!-- Databases & Data Management -->
      <li class="mb-4">
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <span class="w-full sm:w-64 font-semibold">Databases & Data Management</span>
          <span>SQL (PL/SQL, MariaDB, MySQL), NoSQL (Neo4j), SAS, AWS, Git, Unix/Linux CLI, Bash</span>
        </div>
      </li>

      <!-- Web Development & Systems -->
      <li class="mb-4">
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <span class="w-full sm:w-64 font-semibold">Web Development & Systems</span>
          <span>Vue.js, Tailwind, Lambda function, embedding, Windows, RAG (retrieval-augmented generation), vectorization</span>
        </div>
      </li>

      <!-- Media & Design -->
      <li class="mb-4">
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <span class="w-full sm:w-64 font-semibold">Media & Design</span>
          <span>Premiere Pro, Lightroom, Photoshop, Figma, Canva, WordPress</span>
        </div>
      </li>

      <!-- Documentation & Office Tools -->
      <li class="mb-4">
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <span class="w-full sm:w-64 font-semibold">Documentation & Office Tools</span>
          <span>Microsoft Office, Markdown, LaTeX, Excel, PowerBI, VBA</span>
        </div>
      </li>

      <!-- GIS -->
      <li class="mb-4">
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <span class="w-full sm:w-64 font-semibold">GIS</span>
          <span>QGIS</span>
        </div>
      </li>
    </ul>
  </div>


  <div>
    <ul class="mt-4 space-y-4">
      <li v-for="(skill, index) in skills" :key="index" class="flex items-center">
        <span class="w-1/4">{{ skill.name }}</span>
        <div class="w-3/4 bg-gray-200 rounded-full h-2">
          <div :style="{ width: skill.level + '%' }" class="bg-gray-500 h-2 "></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skills: [
        // {name : "Programming", level: 80},
        // {name : "Databases", level: 75},
        // {name : "Machine Learning & Data Science", level: 70},
        // {name : "Web Development", level: 65},
        // {name : "Data Management", level: 70},
        // {name : "Systems & Tools", level: 75},
        // {name : "GIS", level: 60},
        // {name : "Media & Design", level: 70},
        // {name : "Documentation & Office Tools", level: 80},
        
      ],
    };
  },
};
</script>
