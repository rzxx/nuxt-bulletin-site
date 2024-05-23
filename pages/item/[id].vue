<template>
  <div v-if="pending">
    <HeadingNormal title="Загрузка объявления..."/>

    <ImageViewer images=""/>
  </div>


  <div v-else>
    <HeadingNormal :title="data.title"/>

    <ImageViewer :images="data.images"/>


    <div class="w-dvh flex justify-center mt-8 mb-20">
      <div class="w-3/4 max-w-screen-xl">
        <h1 class="text-5xl font-bold text-gray-900">{{ data.price }} р.</h1>
        <div class="mt-8 text-2xl text-gray-600">
          <p v-for="(line, index) in data.description.split('\r\n')" :key="index" class="mb-2">
            {{ line }}
          </p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import ImageViewer from '~/components/ImageViewer.vue';

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