<script setup lang="ts">
import { ModalInfo } from '#components'

const title = 'Kebutuhan vs Keinginan'
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
const quizItems = ref<{ name: string; answer: 'need' | 'want' | null, answer_key: 'need' | 'want' }[]>([
  { name: 'Buku Pelajaran', answer: null, answer_key: 'need' },
  { name: 'Mainan Baru', answer: null, answer_key: 'want' },
  { name: 'Makanan Sehat', answer: null, answer_key: 'need' },
  { name: 'HP Baru', answer: null, answer_key: 'want' }
])
const selectAnswer = (index: number, type: 'need' | 'want') => {
  quizItems.value[index].answer = type
}
const checkAnswer = () => {
  const correctAnswer = quizItems.value.filter((item) => item.answer === item.answer_key).length
  const totalAnswer = quizItems.value.length
  const isAllCorrect = correctAnswer === totalAnswer
  if (isAllCorrect) {
    modal.open(ModalInfo, {
      description: 'Selamat jawaban kamu benar semua! 🎉'
    })
  } else {
    modal.open(ModalInfo, {
      description: 'Jawaban kamu belum benar semua, coba lagi ya! 🤔'
    })
  }
}
</script>

<template>
  <main class="max-w-7xl mx-auto p-4">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">{{ title }}</h1>
      <p class="text-sky-100 mt-2">Yuk belajar membedakan kebutuhan dan keinginan bersama Dompet si Kucing! 🎯</p>
    </div>

    <!-- Video Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
      <div class="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.youtube.com/embed/Ey1_lK3EjEI"
          title="Kebutuhan vs Keinginan"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>

    <!-- Article Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div class="prose dark:prose-invert max-w-none">
        <!-- Introduction -->
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
                Aku Dompet! Hari ini kita akan belajar membedakan mana yang benar-benar kita butuhkan dan mana yang hanya kita inginkan! 🤔
              </p>
            </div>
          </div>

          <!-- Main Content -->
          <div class="space-y-8">
            <!-- Section 1: Understanding Needs -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Apa itu Kebutuhan? 🏠
              </h3>
              <p class="mb-4">Kebutuhan adalah hal-hal yang penting untuk hidup kita sehari-hari.</p>
              <div class="grid gap-4 md:grid-cols-3">
                <div class="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div class="bg-blue-100 dark:bg-blue-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-home" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Tempat Tinggal</h4>
                    <p class="text-sm">Rumah untuk berlindung</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div class="bg-blue-100 dark:bg-blue-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-cake" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Makanan</h4>
                    <p class="text-sm">Makanan bergizi</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div class="bg-blue-100 dark:bg-blue-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Sekolah</h4>
                    <p class="text-sm">Pendidikan</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: Understanding Wants -->
            <div class="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-pink-700 dark:text-pink-300 mb-4">
                Apa itu Keinginan? 🎮
              </h3>
              <p class="mb-4">Keinginan adalah hal-hal yang kita mau, tapi sebenarnya bisa kita tunda dulu.</p>
              <div class="grid gap-4 md:grid-cols-3">
                <div class="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div class="bg-pink-100 dark:bg-pink-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-device-phone-mobile" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Gadget Baru</h4>
                    <p class="text-sm">HP atau tablet baru</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div class="bg-pink-100 dark:bg-pink-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-puzzle-piece" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Mainan</h4>
                    <p class="text-sm">Mainan terbaru</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div class="bg-pink-100 dark:bg-pink-800 rounded-full p-2 grid place-content-center">
                    <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h4 class="font-bold mt-0">Jajan</h4>
                    <p class="text-sm">Makanan ringan</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 3: Interactive Game -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">
                Ayo Bermain! 🎯
              </h3>
              <p class="mb-4">Coba pilih mana yang termasuk kebutuhan dan keinginan:</p>
              <div class="grid gap-4 md:grid-cols-2">
                <div v-for="(item, index) in quizItems" :key="index" class="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="font-bold">{{ item.name }}</span>
                    <div class="space-x-2">
                      <UButton
                        size="xs"
                        label="Kebutuhan"
                        :color="item.answer === 'need' ? 'blue' : 'gray'"
                        @click="selectAnswer(index, 'need')" />
                      <UButton
                        size="xs"
                        label="Keinginan"
                        :color="item.answer === 'want' ? 'pink' : 'gray'"
                        @click="selectAnswer(index, 'want')" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 text-center">
                <UButton
                  label="Cek Jawaban"
                  color="purple"
                  @click="checkAnswer" />
              </div>
            </div>

            <!-- Section 4: Tips -->
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h3 class="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
                Tips dari Dompet! 💡
              </h3>
              <div class="space-y-4">
                <div class="flex items-center gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <span class="text-2xl">1️⃣</span>
                  <p class="font-medium">Utamakan kebutuhan daripada keinginan</p>
                </div>
                <div class="flex items-center gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <span class="text-2xl">2️⃣</span>
                  <p class="font-medium">Tabung uang untuk keinginan</p>
                </div>
                <div class="flex items-center gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <span class="text-2xl">3️⃣</span>
                  <p class="font-medium">Tanyakan pada orang tua jika bingung</p>
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
