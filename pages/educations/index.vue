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
  <main class="max-w-7xl mx-auto p-4 space-y-6">
    <!-- Learning Paths Section -->
    <h2 class="text-2xl font-bold">
      Jalur Pembelajaran
    </h2>

    <!-- Learning Path Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Beginner Path -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div class="h-32 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
          <UIcon
            name="i-heroicons-academic-cap"
            class="w-16 h-16 text-white" />
        </div>
        <div class="p-6 space-y-4">
          <h3 class="text-xl font-semibold">
            Pemula (6-9 tahun)
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Belajar konsep dasar uang dan menabung
          </p>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 mr-2"/>
              Mengenal Uang
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 mr-2"/>
              Pentingnya Menabung
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 mr-2"/>
              Kebutuhan vs Keinginan
            </li>
          </ul>
          <UButton
            block
            color="green"
            variant="soft"
            label="Mulai Belajar"
            :to="{ name: 'learning-paths-beginner' }" />
        </div>
      </div>

      <!-- Intermediate Path -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div class="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
          <UIcon
            name="i-heroicons-light-bulb"
            class="w-16 h-16 text-white" />
        </div>
        <div class="p-6 space-y-4">
          <h3 class="text-xl font-semibold">
            Menengah (10-13 tahun)
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Perencanaan dan pengelolaan uang
          </p>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-500 mr-2"/>
              Membuat Anggaran
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-500 mr-2"/>
              Target Menabung
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-500 mr-2"/>
              Belanja Bijak
            </li>
          </ul>
          <UButton
            block
            color="blue"
            variant="soft"
            label="Mulai Belajar"
          />
        </div>
      </div>

      <!-- Advanced Path -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div class="h-32 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
          <UIcon
            name="i-heroicons-rocket-launch"
            class="w-16 h-16 text-white" />
        </div>
        <div class="p-6 space-y-4">
          <h3 class="text-xl font-semibold">
            Lanjutan (14-18 tahun)
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Investasi dan keuangan masa depan
          </p>
          <ul class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-purple-500 mr-2"/>
              Dasar Investasi
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-purple-500 mr-2"/>
              Perencanaan Keuangan
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-purple-500 mr-2"/>
              Wirausaha Muda
            </li>
          </ul>
          <UButton
            block
            color="purple"
            variant="soft"
            label="Mulai Belajar"
          />
        </div>
      </div>
    </div>

    <!-- Interactive Learning Modules -->
    <div class="hidden mt-12 space-y-6">
      <h2 class="text-2xl font-bold">
        Modul Pembelajaran Interaktif
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Game Module -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center space-x-4">
            <div class="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
              <UIcon
                name="i-heroicons-puzzle-piece"
                class="w-6 h-6 text-pink-500"
              />
            </div>
            <div>
              <h3 class="font-semibold">
                Game Edukatif
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Belajar sambil bermain
              </p>
            </div>
          </div>
        </div>

        <!-- Quiz Module -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center space-x-4">
            <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
              <UIcon
                name="i-heroicons-question-mark-circle"
                class="w-6 h-6 text-yellow-500"
              />
            </div>
            <div>
              <h3 class="font-semibold">
                Kuis Interaktif
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Uji pemahamanmu
              </p>
            </div>
          </div>
        </div>

        <!-- Video Module -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center space-x-4">
            <div class="bg-sky-100 dark:bg-sky-900 p-3 rounded-lg">
              <UIcon
                name="i-heroicons-play-circle"
                class="w-6 h-6 text-sky-500"
              />
            </div>
            <div>
              <h3 class="font-semibold">
                Video Pembelajaran
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Materi visual menarik
              </p>
            </div>
          </div>
        </div>

        <!-- Challenge Module -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center space-x-4">
            <div class="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <UIcon
                name="i-heroicons-trophy"
                class="w-6 h-6 text-green-500"
              />
            </div>
            <div>
              <h3 class="font-semibold">
                Tantangan Mingguan
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Praktik langsung
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Tracking -->
    <div class="hidden mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 class="text-xl font-bold mb-4">
        Perkembangan Belajarmu
      </h2>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <UIcon
              name="i-heroicons-academic-cap"
              class="w-8 h-8 text-green-500"
            />
            <div>
              <h3 class="font-medium">
                Modul Dasar
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                3 dari 5 pelajaran selesai
              </p>
            </div>
          </div>
          <div class="w-32">
            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div class="h-2 bg-green-500 rounded-full" style="width: 60%"></div>
            </div>
          </div>
        </div>

        <!-- Add more progress items -->
      </div>
    </div>
  </main>
</template>
