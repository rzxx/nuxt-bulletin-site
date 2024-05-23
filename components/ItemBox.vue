<template>
  <div class="flex w-full bg-gray-100 rounded-lg p-4">
        <div class="w-48 h-48 mr-8 aspect-square shrink-0">
          <NuxtLink :to="`/item/${id}`"><img :src="image" class="w-full h-full object-cover rounded-lg"></NuxtLink>
        </div>
        <div class="h-full max-h-48">
          <NuxtLink :to="`/item/${id}`" class="text-2xl font-bold text-gray-900 hover:text-green-900 duration-300 ease">{{name}}</NuxtLink>
          <p class="text-gray-600 max-h-48">{{ description.substring(0, 400) }}{{ description.length > 400 ? '...' : '' }}</p>
        </div>
        <div class="ml-auto mr-4 shrink-0">
          <h2 v-if="price.length!=0" class="text-2xl font-bold text-gray-900">{{price}} р.</h2>
          <button></button>
        </div>
      </div>
</template>

<script setup>
defineProps({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  id: {
    type: String
  },
  image: {
    type: String
  }
})
</script>

<style>

</style>