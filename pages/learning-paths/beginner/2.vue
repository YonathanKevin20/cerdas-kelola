<script setup lang="ts">
const title = 'Pentingnya Menabung'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const path = route.path
const lastPath = path.split('/').pop()
const { data, status, refresh } = await useLazyFetch(`/api/progress-learning-modules/${lastPath}/learning-modules`, {
  default: () => {
    return {
      is_completed: false
    }
  }
})
</script>

<template>
  <main class="max-w-7xl mx-auto p-4">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">{{ title }}</h1>
      <p class="text-sky-100 mt-2">Belajar menabung bersama Dompet si Kucing yang Bijak! 😺</p>
    </div>

    <!-- Video Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
      <div class="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.youtube.com/embed/62FZ-992ARU"
          title="Pentingnya Menabung"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>

    <!-- Article Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div class="prose dark:prose-invert max-w-none">
        <!-- Story Section -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-6">
            <img
              src="/cat-saving.webp"
              alt="Dompet si Kucing"
              class="w-32 h-32 rounded-full border-4 border-sky-200" />
            <div>
              <h2 class="text-2xl font-bold text-sky-600 dark:text-sky-400">
                Hai Teman-teman! 👋
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300">
                Aku Dompet, dan hari ini kita akan belajar tentang pentingnya menabung! 🐱
              </p>
            </div>
          </div>

          <!-- Main Content -->
          <div class="space-y-8">
            <!-- Section 1: Why Save? -->
            <div class="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-sky-700 dark:text-sky-300 mb-4">
                Mengapa Kita Harus Menabung? 🤔
              </h3>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="flex items-start gap-3">
                  <div class="bg-sky-100 dark:bg-sky-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-gift" class="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Beli Mainan Impian</h4>
                    <p class="text-sm">Dengan menabung, kamu bisa membeli mainan yang kamu inginkan!</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="bg-sky-100 dark:bg-sky-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Persiapan Sekolah</h4>
                    <p class="text-sm">Tabungan bisa digunakan untuk membeli alat sekolah baru!</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: Saving Tips -->
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
                Tips Menabung ala Dompet! 💡
              </h3>
              <div class="space-y-4">
                <div class="flex items-center gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <span class="text-2xl">1️⃣</span>
                  <p class="font-medium">Sisihkan sebagian uang jajan setiap hari</p>
                </div>
                <div class="flex items-center gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <span class="text-2xl">2️⃣</span>
                  <p class="font-medium">Gunakan celengan yang lucu dan menarik</p>
                </div>
                <div class="flex items-center gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <span class="text-2xl">3️⃣</span>
                  <p class="font-medium">Catat setiap uang yang ditabung</p>
                </div>
              </div>
            </div>

            <!-- Section 3: Interactive Activity -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                Ayo Mulai Menabung! 🎯
              </h3>
              <div class="space-y-4">
                <p class="font-medium">Tulis target menabungmu di sini:</p>
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <label class="block text-sm font-bold mb-2">Target Menabungku:</label>
                    <UInput placeholder="Contoh: Beli buku gambar" />
                  </div>
                  <div class="bg-white dark:bg-gray-700 p-4 rounded-lg">
                    <label class="block text-sm font-bold mb-2">Akan Menabung:</label>
                    <UInput
                      inputmode="numeric"
                      v-maska
                      data-maska-number-locale="id"
                      data-maska-number-unsigned>
                      <template #leading>
                        <span class="text-gray-500 dark:text-gray-400">Rp</span>
                      </template>
                    </UInput>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fun Facts Section -->
            <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-4">
                Tahukah Kamu? 🌟
              </h3>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <p class="text-sm">
                    Jika kamu menabung Rp2.000 setiap hari, dalam sebulan kamu bisa mengumpulkan Rp60.000!
                    Wah, banyak ya! 🎉
                  </p>
                </div>
                <div class="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <p class="text-sm">
                    Di Jepang, anak-anak mulai belajar menabung sejak TK lho!
                    Mereka menggunakan celengan berbentuk babi yang lucu! 🐷
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ButtonCompleteLearningModule
          v-if="lastPath"
          :is-completed="data.is_completed"
          :learning-module-id="lastPath"
          @success="refresh" />
      </div>
    </div>
  </main>
</template>
