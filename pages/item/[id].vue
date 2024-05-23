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
        <div class="mt-12">
          <label class="block text-gray-700 text-xl font-bold mb-4" for="title">Хотите удалить объявление?</label>
          <input
            type="text"
            class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Введите ключ-фразу объявления"
          />
        </div>
        <div class="mt-4 mb-4">
          <button
            class="hover:bg-green-300 duration-300 ease bg-green-400 text-gray-900 font-bold py-2 px-4 rounded"
            type="submit"
            @click="deleteItem()"
          >Отправить запрос на удаление</button>
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

async function deleteItem(){
  const passphraseInput = document.querySelector('input[type="text"]')
  await $fetch("/api/item",{
    method: "DELETE",
    params:{
      id: route.params.id,
      passphrase: (passphraseInput as HTMLInputElement).value
    }
  })
  .then(() => {
      // Handle successful submission
      console.log('Item deleted successfully');
      navigateTo('/list')
      // Redirect or perform any other action as needed
    })
    .catch((error) => {
      // Handle submission error
      console.error('Error submitting item:', error);
    });
}
</script>

<style>

</style>