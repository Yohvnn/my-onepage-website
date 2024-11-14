<template>
  <div :class="themeClass" class="h-screen flex items-center justify-center overflow-hidden">
    <div ref="tiltCard"
      class="tilt-card 
      w-96 h-auto bg-gradient-to-br from-cyan-900 to-red-900 rounded-2xl shadow-2xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-105"
      @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <div ref="glow" class="glow opacity-0 transition-opacity duration-300"></div>
      <div ref="tiltContent" class="tilt-card-content p-6 flex flex-col h-full justify-between relative z-10">
        <div>
          <h2 :class="textClass" class="text-3xl font-bold mb-2">Yohann CHAN CHEW HONG</h2>
          <p :class="textClass" class="text-base leading-relaxed">
            Junior Production Engineer - Front-End Generative AI Applications based in Paris.
            <br>
            In the digital world, I integrate AI models and optimize platforms.
            <br><br>
            Beyond tech, I'm passionate about esports, music, and PC assembly, balancing data science with creative pursuits in photography and videography. 
            My journey blends coding, machine learning, and artistic expression, both in and out of the lab.
            <br><br>
            <strong>Skills:</strong> C++, Python, TensorFlow, PyTorch, SQL, AWS, Java, R, SAS<br>
            <strong>Languages:</strong> English (C1), Spanish (B1), Mandarin (HSK2), Malagasy<br>
            <strong>Experience:</strong> Dev, Amazon Storefront Manager, Webmaster, Photographer, Saler<br><br>
          </p>
        </div>

        <div class="space-y-4">
          <div class="bg-white bg-opacity-20 rounded-lg p-3">
            <div :class="textClass" class="text-xs uppercase">Current Project</div>
            <div :class="textClass" class="text-2xl font-bold">Generative AI Platform</div>
            <p :class="textClass" class="text-sm mt-2">
              Supporting AI model integration and industrialization at Crédit Agricole Personal Finance & Mobility.
            </p>
          </div>
          <button
            class="w-full py-2 bg-white text-cyan-900 rounded-lg font-semibold transform transition hover:scale-105 active:scale-95">
            Explore My Résumé
          </button>
        </div>
      </div>
    </div>
    
    <!-- Dark Mode / Light Mode Switch with Flowbite Design -->
    <div class="absolute top-5 right-5">
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="darkMode" value="" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle Dark Mode</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: true
    };
  },
  computed: {
    themeClass() {
      return this.darkMode ? 'bg-gray-900' : 'bg-white';
    },
    textClass() {
      return this.darkMode ? 'text-white' : 'text-black';
    }
  },
  methods: {
    handleMouseMove(e) {
      const card = this.$refs.tiltCard;
      const glow = this.$refs.glow;
      const content = this.$refs.tiltContent;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = -((y - centerY) / centerY);

      card.style.transform = perspective(1000px) rotateY(${percentX * 10}deg) rotateX(${percentY * 10}deg);
      content.style.transform = translateZ(50px);

      glow.style.opacity = '1';
      glow.style.backgroundImage = 
        radial-gradient(
          circle at 
          ${x}px ${y}px, 
          #ffffff44,
          #0000000f
        )
      ;
    },
    handleMouseLeave() {
      const card = this.$refs.tiltCard;
      const glow = this.$refs.glow;
      const content = this.$refs.tiltContent;

      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      content.style.transform = 'translateZ(0px)';
      glow.style.opacity = '0';
    }
  }
};
</script>

<style scoped>
html {
  height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
  display: grid;
  place-items: center;
}

.tilt-card {
  position: relative;
  overflow: hidden;
}

.glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>