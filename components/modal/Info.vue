<script setup lang="ts">
const props = defineProps<{
  description: string
}>()
const modal = useModal()
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold">Informasi</h2>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modal.close()" />
        </div>
      </template>

      <p>{{ description }}</p>

      <template #footer>
        <div class="flex justify-end space-x-4">
          <UButton color="gray" variant="ghost" label="OK" @click="modal.close()" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
