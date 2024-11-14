<template>
  <div>
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{{ title }}</h2>
    <div class="text- text-gray-700 dark:text-gray-400">
      <slot></slot>
      <p></p>
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