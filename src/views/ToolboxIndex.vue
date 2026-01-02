<template>
  <div class="bg-white dark:bg-black card rounded-lg shadow-lg p-8 animate-fade-in">
    <!-- Header -->
    <div class="mb-8">
      <router-link to="/" class="inline-flex items-center text-primary hover:underline mb-4">
        ← Back to Resume
      </router-link>
      <div class="flex items-center gap-3 mb-2">
        <h2 class="text-xl font-medium border-l-2 border-primary pl-3">Toolbox</h2>
      </div>
      <p class="text-foreground/90 leading-relaxed text-sm">
        A collection of useful tools and utilities for everyday tasks.
      </p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- PDF Tools Card -->
      <router-link 
        to="/toolbox/pdf"
        class="group relative overflow-hidden card border-2 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in "
      >
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative">
          <div class="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">PDF Tools</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Compress, split, and extract pages from PDF files with ease.
          </p>
          <div class="mt-4 flex gap-2">
            <span class="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">Vue 3</span>
            <span class="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs">Python</span>
          </div>
        </div>
      </router-link>

      <!-- Tic Tac Toe Card -->
      <router-link 
        to="/toolbox/tictactoe"
        class="group relative overflow-hidden card border-2 rounded-lg p-6 hover:border-green-500 dark:hover:border-green-400 hover:shadow-lg transition-all cursor-pointer animate-fade-in"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent dark:from-green-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative">
          <div class="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="7" x2="17" y2="17"></line>
              <line x1="17" y1="7" x2="7" y2="17"></line>
            </svg>
          </div>
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Tic Tac Toe</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Classic game of Tic Tac Toe. Play against a friend or the computer.
          </p>
          <div class="mt-4 flex gap-2">
            <span class="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs">Vue 3</span>
          </div>
        </div>
      </router-link>

      <!-- Flip Coin Card -->
      <router-link 
        to="/toolbox/flipcoin"
        class="group relative overflow-hidden card border-2 rounded-lg p-6 hover:border-yellow-500 dark:hover:border-yellow-400 hover:shadow-lg transition-all cursor-pointer animate-fade-in"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent dark:from-yellow-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative">
          <div class="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
              <path d="M12 18V6"></path>
            </svg>
          </div>
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Flip Coin</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            Heads or Tails? Let fate decide with a 3D coin flip.
          </p>
          <div class="mt-4 flex gap-2">
            <span class="inline-block px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs">Vue 3</span>
          </div>
        </div>
      </router-link>

      <!-- RAG Chatbot Card (Coming Soon) -->
      <div 
        class="group relative overflow-hidden border-2 card rounded-lg p-6 opacity-50 "
      >
        <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="relative">
          <div class="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground">
              <rect x="3" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">RAG Chatbot</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            AI-powered document question answering with vector search and LLM integration.
          </p>
          <div class="mt-4 flex gap-2">
            <span class="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs">Next.js</span>
            <span class="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs">FastAPI</span>
          </div>
          <span class="mt-4 inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded text-xs font-semibold">Coming Soon</span>
        </div>
      </div>
    </div>

    <!-- Coming Soon Section -->
    <div class="mt-8">
      <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground">
          <path d="M4.5 16.5c-1.5 1.25-2 5-2 5s3.75-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
        </svg>
        Coming Soon
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        More tools are in development! Check back soon for exciting new features.
      </p>
    </div>
  </div>
</template>

<script setup>
// No script needed for this view
</script>