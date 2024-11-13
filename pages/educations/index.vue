<script setup lang="ts">
const title = 'Edukasi Keuangan'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold">{{ title }}</h1>
  </main>
</template>
