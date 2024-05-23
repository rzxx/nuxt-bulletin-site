<template>
  <div class="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded-lg shadow-md">
    <label class="block text-gray-700 text-sm font-bold" for="title">Ключ-фраза объявления: {{id}}</label>
    <label class="text-red-900 text-sm font-bold" for="title">Запишите эту фразу, она нужна для управления объявлением!</label>
    <div class="mb-4 mt-4">
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
    <div class="container flex overflow-x-auto w-full mb-4 ">
      <div v-for="file in images" :key="file._id">
        <PhotoPreview v-if="file" :url="file.path" @deleteImage="handleDelete(file._id)"/>
      </div>
    </div>
    <button
      class="hover:bg-green-300 duration-300 ease bg-green-400 text-gray-900 font-bold py-2 px-4 rounded"
      type="submit"
      @click="submitItem()"
    >Опубликовать объявление</button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});
const id = props.id
defineEmits<{ (e: 'publish'): void }>()
interface IUploadedFiles{
  _id: string,
  sessionId: string,
  path: string
} 
// Reactive variable to hold image data
const images = ref<IUploadedFiles[]>([])

// Function to fetch images
const fetchImages = async () => {
  images.value = await $fetch<IUploadedFiles[]>('/api/images', {
    params: { sessionId: id }
  })
}

// Initial fetch on component mount
onMounted(fetchImages)

const onDropZone = ref<HTMLDivElement>()
const { files } = useDropZone(onDropZone, {onDrop})

async function onDrop(){
  if (files.value){
    let isValid = false
    const formData = new FormData()
    formData.set('sessionId', id)
    files.value.forEach((file, index) => {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' ){
        formData.append('file', file)
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
      // Refetch images to update the UI
      await fetchImages()
    }
  }
}

async function handleDelete(imageId: any) { 
  await $fetch('/api/image-delete', {
    method: 'PUT',
    body: { id, imageId } 
  });
  await fetchImages();
}

const { open, onChange } = useFileDialog()

onChange(async (files) => {
  let isValid = false
  const formData = new FormData()
  formData.set('sessionId', id)
  if (files) {
    for (let x = 0; x < files.length; x++){
      if (files[x].type === 'image/jpeg' || files[x].type === 'image/png' || files[x].type === 'image/webp' ){
        formData.append('file', files[x])
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
    // Refetch images to update the UI
    await fetchImages()
  }
})

function submitItem(){
  const titleInput = document.querySelector('input[type="text"]')
  const descriptionInput = document.querySelector('textarea')
  const priceInput = document.querySelector('input[type="number"]')
  const priceValue = parseInt((priceInput as HTMLInputElement).value, 10)

  const formData = new FormData()
  formData.set('sessionId', id)
  formData.set('title', (titleInput as HTMLInputElement).value)
  formData.set('description', (descriptionInput as HTMLTextAreaElement).value)
  formData.set('price', priceValue.toString())

  $fetch('/api/submit-item', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      // Handle successful submission
      console.log('Item submitted successfully');
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