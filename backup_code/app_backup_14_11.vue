<template>
  <div :class="themeClass" 
        style="background-image: linear-gradient(to bottom right, rgba(0, 0, 32, 0.8), rgba(255, 45, 85, 0.8)), url('./assets/ink_splash_duotone_stripe_background.jpg');"

  class="h-screen bg-gray-900 overflow-hidden flex items-center justify-center relative">
    
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-lg z-1"></div>

    <!-- Tilt Card -->
    <div ref="tiltCard"
      class="tilt-card relative z-10 p-5 rounded-3xl w-[36rem] mx-auto shadow-2xl hover:shadow-xl 
      transition-transform duration-300 ease-out hover:scale-105 backdrop-blur-md border-white border-opacity-20 
      cursor-pointer"
      style="background-image: linear-gradient(to bottom right, rgba(0, 0, 32, 0.8), rgba(255, 45, 85, 0.8)), url('./assets/ink_splash_duotone_stripe_background.jpg');"
      @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      
      <!-- Glow Effect -->
      <div ref="glow" class="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"></div>

      <!-- Card Content -->
      <div ref="tiltContent" class="tilt-card-content p-6 flex flex-col h-full justify-between relative z-10">
        <div>
          <h2 :class="textClass" class="text-3xl font-bold mb-4">Yohann CHAN CHEW HONG</h2>
          <p :class="textClass" class="text-lg leading-relaxed">
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
            <p :class="textClass" class="text-sm mt-1">
              Supporting AI model integration and industrialization at Crédit Agricole Personal Finance & Mobility.
            </p>
          </div>
          <button class="w-full py-3 mt-6 bg-white text-red-800 text-white rounded-lg hover:text-white hover:bg-red-400 transition-all font-semibold">
            Explore My Résumé
          </button>
        </div>
        
        <!-- Dark Mode / Light Mode Switch -->
        <div class="mt-4">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="darkMode" value="" class="sr-only peer">
            <div 
            class="relative w-11 h-6 bg-indigo-400 peer-focus:outline-none peer-focus:ring-3 
            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
            after:start-[2px] after:bg-white after:border-gray-300 after:border 
            after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 
            peer-checked:bg-indigo-950"></div>
            <span class="ms-3 text-sm font-medium text-white dark:text-white">Dark Mode</span>
          </label>
        </div>
      </div>
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
      return this.darkMode ? 'text-white' : 'text-gray-900';
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

      card.style.transform = `perspective(1000px) rotateY(${percentX * 10}deg) rotateX(${percentY * 10}deg)`;
      content.style.transform = `translateZ(50px)`;

      glow.style.opacity = '1';
      glow.style.backgroundImage = `
        radial-gradient(
          circle at 
          ${x}px ${y}px, 
          rgba(255, 255, 255, 0.3),
          rgba(0, 0, 0, 0.1)
        )
      `;
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
