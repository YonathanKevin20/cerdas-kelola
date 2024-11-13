<script setup lang="ts">
useHead({
  title: 'Profile'
})
definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold">Profile</h1>

    <section class="mt-8">
      <h2 class="text-lg font-bold">User Information</h2>

      <div class="mt-4">
        <p class="text-sm text-gray-500">Email</p>
        <div
          v-if="user"
          class="flex items-center space-x-4 mt-2">
          <UAvatar
            :src="user.user_metadata.avatar_url"
            alt="Avatar" />
          <p class="text-lg font-bold">{{ user.email }}</p>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-sm text-gray-500">Full Name</p>
        <p v-if="user" class="text-lg font-bold">{{ user.user_metadata.full_name }}</p>
      </div>
    </section>
  </main>
</template>
