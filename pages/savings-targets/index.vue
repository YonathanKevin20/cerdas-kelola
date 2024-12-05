<script setup lang="ts">
import { ModalAddProgressSavingsTarget, ModalDeleteSavingsTarget } from '#components'

const title = 'Target Tabungan'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})

const { data, status, refresh } = await useLazyFetch(`/api/savings-targets`, {
  default: () => []
})

const modal = useModal()
const openModalAddProgressSavingsTarget = (id: number) => {
  modal.open(ModalAddProgressSavingsTarget, {
    id,
    onSuccess: () => {
      refresh()
      refreshNuxtData('savings-targets')
    }
  })
}
const openModalDeleteSavingsTarget = (id: number) => {
  modal.open(ModalDeleteSavingsTarget, {
    id,
    onSuccess: () => {
      refresh()
      refreshNuxtData('savings-targets')
    }
  })
}

const calculateProgressPercentage = (currentAmount: number, targetAmount: number) => {
  return Math.round((currentAmount / targetAmount) * 100)
}

const calculateDaysLeft = (targetDate: string) => {
  const today = new Date()
  const target = new Date(targetDate)
  const diffTime = Math.abs(target.getTime() - today.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const totalSavings = (currentAmount: number, progressAmount: number) => {
  return currentAmount + progressAmount
}

const isAchieved = (percentage: number) => {
  return percentage >= 100
}
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold">{{ title }}</h1>

    <div class="flex items-center space-x-2 my-4">
      <UButton
        to="/savings-targets/create"
        label="Buat Target Tabungan"
        variant="solid"
        color="sky" />
    </div>

    <LoadingState v-if="status === 'pending'" />
    <div v-else class="space-y-4">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div class="flex items-center justify-between p-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <UIcon
                  name="i-heroicons-wallet"
                  class="w-10 h-10 text-amber-500 dark:text-amber-400" />
              </div>

              <div class="flex-1 min-w-0 space-y-1">
                <div class="flex items-center space-x-2">
                  <p class="text-lg font-medium truncate">{{ item.target_name }}</p>
                  <BadgeTargetStatus :is-achieved="isAchieved(calculateProgressPercentage(totalSavings(+item.current_amount, +item.progress_amount), +item.target_amount))" />
                </div>

                <div class="flex items-center gap-3">
                  <UBadge
                    color="gray"
                    variant="soft"
                    class="px-3 py-1.5">
                    <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 mr-1" />
                    <span class="text-gray-600 dark:text-gray-300">{{ dateFormatted(item.start_date) }}</span>
                  </UBadge>
                  <UIcon
                    name="i-heroicons-arrow-long-right"
                    class="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <UBadge
                    color="sky"
                    variant="soft"
                    class="px-3 py-1.5">
                    <UIcon name="i-heroicons-flag" class="w-4 h-4 mr-1" />
                    <span>{{ dateFormatted(item.target_date) }}</span>
                  </UBadge>
                </div>
              </div>

              <div class="flex flex-col">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {{ currencyIDRFormatted(totalSavings(+item.current_amount, +item.progress_amount)) }} / {{ currencyIDRFormatted(+item.target_amount) }}
                </p>
                <div class="w-[200px] bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 overflow-hidden">
                  <div
                    class="h-2 bg-gradient-to-r from-sky-700 via-sky-500 to-sky-400 rounded-full transition-all duration-300"
                    :style="`width: ${calculateProgressPercentage(totalSavings(+item.current_amount, +item.progress_amount), +item.target_amount)}%`"></div>
                </div>
                <div class="flex justify-between w-[200px] mt-1">
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ calculateProgressPercentage(totalSavings(+item.current_amount, +item.progress_amount), +item.target_amount) }}% tercapai
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ calculateDaysLeft(item.target_date) }} hari lagi
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex space-x-2 ml-4">
            <UTooltip
              v-if="!isAchieved(calculateProgressPercentage(totalSavings(+item.current_amount, +item.progress_amount), +item.target_amount))"
              :text="item.is_progress_done_today ? 'Kamu sudah menambah tabungan hari ini' : 'Tambah tabungan hari ini'">
              <UButton
                icon="i-heroicons-plus-circle"
                color="sky"
                variant="ghost"
                size="xs"
                :disabled="item.is_progress_done_today"
                @click="openModalAddProgressSavingsTarget(item.id)" />
            </UTooltip>
            <UTooltip text="Riwayat Tabungan">
              <UButton
                icon="i-heroicons-banknotes"
                color="amber"
                variant="ghost"
                size="xs"
                :to="`/progress-savings-targets/${item.id}/savings-targets`" />
            </UTooltip>
            <UTooltip text="Hapus Target">
              <UButton
                icon="i-heroicons-trash"
                color="red"
                variant="ghost"
                size="xs"
                @click="openModalDeleteSavingsTarget(item.id)" />
            </UTooltip>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
