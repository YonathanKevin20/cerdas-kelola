<script setup lang="ts">
import { ModalInfo } from '#components'

const title = 'Mengenal Uang'
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

const modal = useModal()
const answer = ref('')
watch(answer, (newValue) => {
  setTimeout(() => {
    if (newValue === 'barter') {
      modal.open(ModalInfo, {
        description: 'Selamat jawaban kamu benar! 🎉'
      })
    } else {
      modal.open(ModalInfo, {
        description: 'Jawaban kamu belum benar, coba lagi ya! 🤔'
      })
    }
  }, 100)
})
</script>

<template>
  <main class="max-w-7xl mx-auto p-4">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">{{ title }}</h1>
      <p class="text-sky-100 mt-2">Mari belajar tentang sejarah uang bersama Dompet si Kucing! 🪙</p>
    </div>

    <!-- Video Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
      <div class="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.youtube.com/embed/T-eDqr1dG3s"
          title="Sejarah Uang"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>

    <!-- Article Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div class="prose dark:prose-invert max-w-none">
        <!-- Introduction Section -->
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
                Aku Dompet, dan hari ini kita akan menjelajahi sejarah uang yang sangat menarik! 🎢
              </p>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="space-y-6">
            <!-- Before Money Existed -->
            <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h3 class="text-xl font-bold text-amber-700 dark:text-amber-300">
                Sebelum Ada Uang 🔄
              </h3>
              <div class="mt-3 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="bg-amber-100 dark:bg-amber-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-mdi-swap-horizontal" class="w-6 h-6 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Sistem Barter</h4>
                    <p class="text-sm">Dulu orang bertukar barang langsung. Misalnya, menukar ayam dengan beras! 🐔🌾</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- First Forms of Money -->
            <div class="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-4">
              <h3 class="text-xl font-bold text-sky-700 dark:text-sky-300">
                Bentuk Uang Pertama 💎
              </h3>
              <ul class="mt-3 space-y-2 list-none p-0">
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-star" class="w-5 h-5 text-yellow-500" />
                  Kerang dan siput dipakai sebagai uang
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-star" class="w-5 h-5 text-yellow-500" />
                  Logam mulia seperti emas dan perak
                </li>
                <li class="flex items-center gap-2">
                  <UIcon name="i-heroicons-star" class="w-5 h-5 text-yellow-500" />
                  Koin logam pertama dari Tiongkok
                </li>
              </ul>
            </div>

            <!-- Evolution of Money -->
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h3 class="text-xl font-bold text-green-700 dark:text-green-300">
                Perkembangan Uang 📈
              </h3>
              <div class="mt-3 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="bg-green-100 dark:bg-green-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-mdi-cash" class="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Uang Kertas</h4>
                    <p class="text-sm">Lebih ringan dan mudah dibawa kemana-mana! 💵</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="bg-green-100 dark:bg-green-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-mdi-credit-card" class="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Uang Digital</h4>
                    <p class="text-sm">Sekarang bisa bayar pakai kartu dan handphone! 📱</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fun Facts Section -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300">
                Tahukah Kamu? 🤔
              </h3>
              <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <p class="font-bold">Uang Terbesar! 🏆</p>
                  <p class="text-sm mt-2">
                    Di Pulau Yap, ada uang dari batu besar yang beratnya bisa sampai 4 ton!
                  </p>
                </div>
                <div class="p-3 bg-white dark:bg-gray-700 rounded-lg">
                  <p class="font-bold">Uang Digital! 💻</p>
                  <p class="text-sm mt-2">
                    Di Swedia, hampir semua orang sudah tidak menggunakan uang kertas!
                  </p>
                </div>
              </div>
            </div>

            <!-- Interactive Quiz -->
            <div class="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-4">
              <h3 class="text-xl font-bold text-rose-700 dark:text-rose-300">
                Mini Quiz! 📝
              </h3>
              <div class="mt-4 space-y-4">
                <p>Apa yang digunakan orang zaman dulu sebelum ada uang?</p>
                <div class="space-y-2">
                  <URadio
                    v-model="answer"
                    label="A. Sistem Barter"
                    value="barter" />
                  <URadio
                    v-model="answer"
                    label="B. Kartu Kredit"
                    value="credit" />
                  <URadio
                    v-model="answer"
                    label="C. Uang Digital"
                    value="digital" />
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
