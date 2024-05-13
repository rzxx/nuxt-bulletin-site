<template>
  <div class="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded-lg shadow-md">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Название</label>
      <input
        type="text"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Введите название"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Описание</label>
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Введите описание"
      ></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Стоимость</label>
      <input
        type="number"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Введите стоимость"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Изображения</label>
      <div class="cursor-pointer" ref="onDropZone" @click="open()">
        <FileDialog/>
      </div>
    </div>
    <div class="container flex overflow-x-auto w-full mb-4">
      <div v-for="file in data" :key="file.path">
        <PhotoPreview v-if="file" :url="file.path" @deleteImage="handleDelete(file.path)"/>
      </div>
    </div>
    <button
      class="hover:bg-green-300 duration-300 ease bg-green-400 text-gray-900 font-bold py-2 px-4 rounded"
      type="submit"
      @click="$emit('publish')"
    >Опубликовать объявление</button>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{ (e: 'publish'): void }>()
interface IUploadedFiles{
  path: string
}

const { data } = await useFetch<IUploadedFiles[]>('/api/images')

const onDropZone = ref<HTMLDivElement>()
const { files } = useDropZone(onDropZone, {onDrop})

async function onDrop(){
  if (files.value){
    const formData = new FormData()
    let isValid = false
    files.value.forEach((file) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' ){
        formData.append('file', file, file.name.replaceAll(' ', '-').toLocaleLowerCase())
        isValid = true
      }
      else{
        isValid = false
        console.log("invalid file type.")
      }
    })

    if (isValid){
      await $fetch('/api/image-upload', {
        method: 'POST',
        body: formData
      })
      window.location.reload();
    }
  }
}

async function handleDelete(filePath) {
  await $fetch('/api/image-delete', {
    method: 'PUT',
    body: {
      filePath
    }
  })
  window.location.reload();
}

const { open, onChange } = useFileDialog()

onChange(async (files) => {
  let isValid = false
  const formData = new FormData()
  if (files) {
    for (let x = 0; x < files.length; x++){
      if (files[x].type === 'image/jpeg' || files[x].type === 'image/png' || files[x].type === 'image/webp' ){
        formData.append('file', files[x], files[x].name.replaceAll(' ', '-').toLocaleLowerCase())
        isValid = true
      }
      else{
        isValid = false
        console.log("invalid file type.")
      }
    }
  }

  if (isValid) {
    await $fetch('/api/image-upload', {
      method: 'POST',
      body: formData
    })
    window.location.reload();
  }
})
</script>

<style>

</style>