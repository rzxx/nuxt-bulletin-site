<template>
  <div class="min-w-40 mr-4 relative">
    <img
      :src="url"
      class="rounded-lg"
    >
    <div
    class="absolute flex justify-center items-center w-8 h-8 top-0 right-0 bg-red-500 ease duration-150 text-white rounded-full hover:bg-red-700 cursor-pointer"
    @click="$emit('deleteImage')">×
    </div>
  </div>
  
</template>

<script lang="ts" setup>
defineProps<{ url: string }>()
defineEmits<{ (e: 'deleteImage'): void }>()
</script>

<style>

</style>