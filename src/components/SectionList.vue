<template>
  <div class="mb-6">
    <h2 class="japanese-text text-xl font-medium text-primary dark:text-gray-200 mb-4 flex items-center">
      <span class="h-4 w-0.5 bg-accent mr-2"></span>
      {{ title }}
    </h2>
    <div class="text-primary/80 dark:text-gray-300">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here */
</style>