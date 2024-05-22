<template>
  <div v-if="pending">
    <div class="w-dvh flex justify-center">
      <h1 class="text-2xl text-gray-400 italic mt-8">Загрузка объявления...</h1>
    </div>
  </div>


  <div v-else>
    <HeadingNormal :title="data.title"/>

    
  </div>
  
</template>

<script lang="ts" setup>
const route = useRoute()
const { pending, data: data } = await useFetch('/api/item', {
  params: {
    id: route.params.id
  },
  lazy: true
})
console.log(data)
</script>

<style>

</style>