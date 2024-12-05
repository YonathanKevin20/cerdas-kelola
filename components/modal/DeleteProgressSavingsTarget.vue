<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const modal = useModal()
const toast = useToast()

const pending = ref(false)
const deleteItem = async () => {
  pending.value = true

  try {
    const data = await $fetch(`/api/progress-savings-targets/${props.id}`, {
      method: 'DELETE'
    })

    toast.add({ title: data.message })
    emit('success')
    modal.close()
  } catch (error: any) {
    toast.add({ title: error.data.message })
  } finally {
    pending.value = false
  }
}

const emit = defineEmits<{
  success: []
}>()
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold">Hapus Progres Target Tabungan</h2>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modal.close()" />
        </div>
      </template>

      <p>Apakah kamu yakin ingin menghapus progres target tabungan ini?</p>

      <template #footer>
        <div class="flex justify-end space-x-4">
          <UButton color="gray" variant="ghost" label="Batal" @click="modal.close()" />
          <UButton
            label="Hapus"
            variant="solid"
            color="red"
            :loading="pending"
            @click="deleteItem()" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
