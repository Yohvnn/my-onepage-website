<template>
  <div :class="darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'">
    <!-- Navigation -->
    <nav :class="darkMode ? 'bg-gray-800 shadow-md text-white' : 'bg-white shadow-md'">
      <div class="container mx-auto px-6 py-3 flex justify-between items-center">
        <a class="font-bold text-xl">Yohann CcH.</a>
        <div class="space-x-4">
          <a @click="scrollTo('home')" class="cursor-pointer">Home</a>
          <a @click="scrollTo('cv')" class="cursor-pointer">CV</a>
          <a @click="scrollTo('projects')" class="cursor-pointer">Projects</a>
          <a @click="scrollTo('gallery')" class="cursor-pointer">Gallery</a>
          <a @click="scrollTo('chatbot')" class="cursor-pointer">Chatbot</a>
        </div>
        <!-- Dark Mode Toggle -->
        <button @click="toggleDarkMode" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
          {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>
    </nav>

    <!-- Home Section -->
    <section id="home" class="py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl font-bold mb-2">Welcome to My Portfolio</h1>
        <p class="text-xl mb-8">I'm a passionate designer and developer</p>
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Contact Me</button>
      </div>
    </section>

    <!-- CV Section -->
    <section id="cv" class="py-20" :class="darkMode ? 'bg-gray-800' : 'bg-white'">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-8 text-center">My CV</h2>
        <!-- Add your CV content here -->
        <div class="space-y-4">
          <div>
            <h3 class="text-xl font-semibold">Work Experience</h3>
            <p>Your work experience details...</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold">Education</h3>
            <p>Your education details...</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold">Skills</h3>
            <p>Your skills...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20" :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <!-- Replace with actual projects -->
          <div class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Project 1</h3>
            <p>Short description of the project...</p>
          </div>
          <div class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Project 2</h3>
            <p>Short description of the project...</p>
          </div>
          <div class="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2">Project 3</h3>
            <p>Short description of the project...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Gallery Section -->
    <section id="gallery" class="py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-8 text-center">Photo Gallery</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <!-- Replace with your actual images -->
          <img src="/api/placeholder/400/300" alt="Project 1" class="w-full h-auto rounded">
          <img src="/api/placeholder/400/300" alt="Project 2" class="w-full h-auto rounded">
          <img src="/api/placeholder/400/300" alt="Project 3" class="w-full h-auto rounded">
          <img src="/api/placeholder/400/300" alt="Project 4" class="w-full h-auto rounded">
          <img src="/api/placeholder/400/300" alt="Project 5" class="w-full h-auto rounded">
          <img src="/api/placeholder/400/300" alt="Project 6" class="w-full h-auto rounded">
        </div>
      </div>
    </section>

    <!-- Chatbot Section -->
    <section id="chatbot" class="py-20" :class="darkMode ? 'bg-gray-800' : 'bg-white'">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold mb-8 text-center">Chatbot</h2>
        <div class="max-w-md mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
          <div class="h-64 overflow-y-auto mb-4 p-2 bg-white dark:bg-gray-800 rounded">
            <!-- Chat messages will be displayed here -->
            <div v-for="(message, index) in chatMessages" :key="index" class="mb-2">
              <div :class="message.sender === 'user' ? 'text-right' : 'text-left'">
                <span :class="message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-black dark:text-white'" class="inline-block px-2 py-1 rounded">
                  {{ message.text }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex">
            <input v-model="userInput" @keyup.enter="sendMessage" type="text" placeholder="Type your message..." class="flex-grow px-2 py-1 rounded-l dark:bg-gray-800 dark:text-white">
            <button @click="sendMessage" class="bg-blue-500 text-white px-4 py-1 rounded-r">Send</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
      userInput: '',
      darkMode: false,
    }
  },
  methods: {
    scrollTo(sectionId) {
      const element = document.getElementById(sectionId);
      element.scrollIntoView({ behavior: 'smooth' });
    },
    async sendMessage() {
      if (this.userInput.trim() === '') return;

      // Add user message to chat
      this.chatMessages.push({ sender: 'user', text: this.userInput });

      // Call Gemini API (you'll need to implement this)
      const response = await this.callGeminiAPI(this.userInput);

      // Add bot response to chat
      this.chatMessages.push({ sender: 'bot', text: response });

      // Clear input
      this.userInput = '';
    },
    async callGeminiAPI(message) {
      // Implement your Gemini API call here
      // For now, we'll just return a placeholder response
      return `This is a placeholder response to: "${message}"`;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    }
  }
}
</script>

<style scoped>
/* Additional styles for dark mode if needed */
.dark {
  --tw-bg-opacity: 1;
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
  color: white;
}
</style>
