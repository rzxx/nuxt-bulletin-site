<template>
  <div class="flex w-full bg-gray-100 rounded-lg p-4">
        <div class="w-48 mr-8 aspect-square">
          <NuxtLink :to="`/item/${id}`"><img :src="image" class="w-full h-full object-cover rounded-lg"></NuxtLink>
        </div>
        <div class="h-full">
          <NuxtLink :to="`/item/${id}`" class="text-2xl font-bold text-gray-900 hover:text-green-900 duration-300 ease">{{name}}</NuxtLink>
          <p class="text-gray-600">{{description}}</p>
        </div>
        <div class="ml-auto mr-4">
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