<script setup lang="ts">
const title = 'Jalur Pembelajaran Pemula'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})

const contents = [
  {
    id: 1,
    title: 'Mengenal Uang',
    description: 'Belajar konsep dasar uang dan menabung',
    icon: 'i-mdi-hand-coin'
  },
  {
    id: 2,
    title: 'Pentingnya Menabung',
    description: 'Belajar pentingnya menabung dan merencanakan keuangan',
    icon: 'i-mdi-piggy-bank'
  },
  {
    id: 3,
    title: 'Kebutuhan vs Keinginan',
    description: 'Belajar membedakan kebutuhan dan keinginan',
    icon: 'i-mdi-cart'
  }
]

const { data, status, refresh } = await useLazyFetch(`/api/progress-learning-modules`, {
  default: () => []
})

const isCompleted = (id: number) => {
  return data.value.find((item: any) => item.learning_module_id === id) !== undefined
}
</script>

<template>
  <main class="max-w-7xl mx-auto p-4">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">{{ title }}</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Ayo mulai petualangan belajar tentang uang! 🎮</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(item, index) in contents" :key="index">
        <ULink
          :to="`/learning-paths/beginner/${item.id}`"
          class="block group h-full">
          <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 overflow-hidden h-[280px] flex flex-col group">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-sky-500/10 dark:bg-sky-400/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <!-- Module Number Badge -->
            <div class="absolute top-4 right-4">
              <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span class="text-sm font-bold text-green-600 dark:text-green-400">
                  {{ index + 1 }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="relative flex-1 flex flex-col">
              <!-- Icon -->
              <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4 shrink-0">
                <UIcon :name="item.icon" class="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>

              <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{{ item.title }}</h2>

              <!-- Description with hover effect -->
              <div class="relative flex-1 mb-4">
                <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 group-hover:line-clamp-none">{{ item.description }}</p>
                <!-- Fade overlay -->
                <div class="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white dark:from-gray-800 to-transparent group-hover:opacity-0 transition-opacity"></div>
              </div>

              <ButtonStatusLearningModule :is-completed="isCompleted(item.id)" />
            </div>
          </div>
        </ULink>
      </div>
    </div>
  </main>
</template>
