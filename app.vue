<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Cerdas Kelola` : 'Cerdas Kelola'
  }
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <UContainer class="flex flex-col h-screen">
      <nav class="flex items-center my-4">
        <Menu />
        <Auth />
      </nav>
      <NuxtPage />
      <Footer />
    </UContainer>
    <UNotifications />
    <UModals />
  </NuxtLayout>
</template>
