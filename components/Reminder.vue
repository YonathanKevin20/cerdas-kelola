<script setup lang="ts">
const { data } = await useFetch(`/api/savings-targets`, {
  key: 'savings-targets',
  default: () => []
})

const anyReminders = computed(() => {
  if (!data.value) return false

  return data.value.some((item: any) => item.is_progress_done_today === false)
})
</script>

<template>
  <UPopover class="ml-auto">
    <UChip
      color="red"
      inset
      :show="anyReminders">
      <UButton
        icon="i-heroicons-bell"
        color="white"
        variant="ghost" />
    </UChip>

    <template #panel>
      <div class="max-h-[400px] overflow-y-auto">
        <!-- Header -->
        <div class="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-900 dark:text-white">Pengingat Tabungan</h3>
        </div>

        <!-- Notifications -->
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div
            v-if="!anyReminders"
            class="p-4 text-sm text-gray-500 dark:text-gray-400">Tidak ada pengingat</div>
          <template v-for="item in data" :key="item.id">
            <div
              v-if="!item.is_progress_done_today"
              class="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div class="flex items-center gap-3">
                <div class="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                  <UIcon
                    name="i-heroicons-banknotes"
                    class="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.target_name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Belum ada progress hari ini</p>
                </div>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-arrow-right"
                  square
                  size="xs"
                  to="/savings-targets" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </UPopover>
</template>
