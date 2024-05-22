<template>
  <HeadingNormal title="Объявления"/>

  <div class="w-dvh flex justify-center">
    <div v-if="pending">
      <h1 class="text-2xl text-gray-400 italic mt-16">Загрузка объявлений...</h1>
    </div>
    <div v-else class="flex flex-col w-3/4 max-w-screen-xl p-4 gap-4">
      <ItemBox v-for="item in images" :id="item.id" :name="item.title" :description="item.description" :price="item.price" :image="item.image"/>
    </div>
  </div>
</template>

<script setup>
const { pending, data: fetchedImages } = await useFetch('/api/get-items', {
  lazy: true
})
const images = fetchedImages
</script>

<style>
</style>