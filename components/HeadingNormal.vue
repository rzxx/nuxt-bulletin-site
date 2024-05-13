<template>
  <div class="w-dvh flex justify-center mt-8">
    <div class="w-3/4 max-w-screen-xl">
      <h1 class="text-4xl font-bold text-gray-900">{{title}}</h1>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style>

</style>