<template>
  <HeadingNormal title="Создание объявления"/>

  <PublishForm :id="id" class="mt-4"/>
</template>

<script lang="ts" setup>

const { data } = await useFetch('/api/getUniqueId')
const id = data.value
console.log(id)
</script>

<style>

</style>