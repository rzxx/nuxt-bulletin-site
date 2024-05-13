<template>
  <HeadingNormal title="Объявления"/>

  <div class="w-dvh flex justify-center">
    <div class="flex flex-col w-3/4 max-w-screen-xl p-4 gap-4">
      <ItemBox :id="1" name="Название" description="123123" :price="123"/>
      <ItemBox :id="2" name="Название 2" description="11234234234234234" :price="456"/>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
</style>