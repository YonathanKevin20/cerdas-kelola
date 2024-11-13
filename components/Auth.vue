<script setup lang="ts">
const user = useSupabaseUser()

const supabase = useSupabaseClient()
const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) console.error(error)

  await navigateTo('/')
}
</script>

<template>
  <div class="ml-auto">
    <template v-if="user">
      <ULink
        to="/profile"
        class="text-sm"
        active-class="font-medium"
        inactive-class="underline-offset-4 hover:underline">{{ user.email }}</ULink>
      <UButton
        @click="signOut"
        label="Sign Out"
        variant="link"
        color="gray" />
    </template>
  </div>
</template>
