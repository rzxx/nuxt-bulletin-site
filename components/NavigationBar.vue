<template>
  <nav class="flex justify-between items-center py-4 border-b border-gray-200">
    <div class="text-2xl font-bold ml-16 hover:text-green-900 duration-300 ease">
      <NuxtLink to="/">MusicMarket</NuxtLink>
    </div>
    <ul class="flex mr-16">
      <li class="mr-8">
        <NuxtLink to="/list" class="text-xl text-gray-600 hover:text-green-900 duration-300 ease">Объявления</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about" class="text-xl text-gray-600 hover:text-green-900 duration-300 ease">О нас</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style>
</style>