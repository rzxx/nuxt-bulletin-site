<template>
  <div class="w-dvh flex justify-center mt-8">
    <div class="w-3/4 max-w-screen-xl">
      <div class="w-full h-[32rem] flex justify-center rounded-xl bg-gray-200">
        <img :src="currentOne" class="object-contain"/>
      </div>
    </div>
  </div>
  <div class="w-dvh flex justify-center mt-8">
    <div class="w-3/4 max-w-screen-xl flex flex-row h-28">
      <div v-for="image in images" class="rounded-xl mr-4" @click="changeCurrentImage(image)">
        <div v-if="image==currentOne">
          <img :src="image" class="h-24 w-24 object-cover border-green-400 border-4 rounded-xl"/>
        </div>
        <div v-else class="cursor-pointer">
          <img :src="image" class="h-24 w-24 object-cover rounded-xl hover:contrast-75 ease duration-75"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps<{ 
  images: Array<string>
}>()
let currentOne = ref(props.images[0]);
function changeCurrentImage(newImage: string) {
  currentOne.value = newImage;
}
</script>

<style>

</style>