<script setup lang="ts">
const supabase = useSupabaseClient()
const session = useSupabaseSession()

const { public: { siteUrl } } = useRuntimeConfig()

const getURL = () => {
  let url =
    siteUrl ??
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

const errorMessage = ref('')

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getURL()}api/auth/callback`,
    }
  })

  if (error) {
    errorMessage.value = error.message

    return
  }
}
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
    <div class="max-w-md mx-auto pt-20">
      <div class="text-center space-y-6">
        <div class="relative">
          <div class="absolute -top-20 left-1/2 -translate-x-1/2">
            <img src="/logo.png" class="w-28 h-28 rounded-full bg-white dark:bg-gray-800 p-2 shadow-lg" alt="Cerdas Kelola" />
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div>
            <h1 class="text-3xl font-bold">Cerdas Kelola</h1>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Aplikasi manajemen keuangan pribadi yang dirancang khusus untuk anak hingga remaja.</p>
          </div>

          <div class="space-y-4">
            <UAlert
              v-if="errorMessage"
              color="red"
              variant="soft"
              :title="errorMessage" />

              <UButton
                v-if="!session"
                block
                size="xl"
                class="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                @click="signInWithGoogle()">
                <template #leading>
                  <img src="/google.svg" class="w-5 h-5" alt="Google" />
                </template>
                <span class="text-gray-700 dark:text-gray-200">Masuk dengan Google</span>
              </UButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
