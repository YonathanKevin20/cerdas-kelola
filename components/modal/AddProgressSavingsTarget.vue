<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { ProgressSavingsTargetCreate } from '~/schemas/ProgressSavingsTargetCreateSchema'
import { ProgressSavingsTargetCreateSchema } from '~/schemas/ProgressSavingsTargetCreateSchema'

const props = defineProps<{
  id: number
}>()
const modal = useModal()
const toast = useToast()

const state = reactive({
  amount: '',
})

const pending = ref(false)
const onSubmit = async (event: FormSubmitEvent<ProgressSavingsTargetCreate>) => {
  state.amount = removeSeparator(event.data.amount)

  pending.value = true

  try {
    const data = await $fetch(`/api/progress-savings-targets`, {
      method: 'POST',
      body: {
        savings_target_id: props.id,
        amount: event.data.amount,
      }
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
          <h2 class="text-lg font-bold">Tambah Tabungan</h2>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modal.close()" />
        </div>
      </template>

      <UForm :schema="ProgressSavingsTargetCreateSchema" :state="state" class="space-y-4 max-w-lg" @submit="onSubmit">
        <UFormGroup label="Jumlah" name="amount">
          <UInput
            v-model="state.amount"
            inputmode="numeric"
            v-maska
            data-maska-number-locale="id"
            data-maska-number-unsigned />
        </UFormGroup>
        <UButton type="submit" label="Submit" :loading="pending" />
      </UForm>

      <template #footer>
        <div class="flex justify-end space-x-4">
          <UButton color="gray" variant="ghost" label="Batal" @click="modal.close()" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
