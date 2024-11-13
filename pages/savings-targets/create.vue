<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { SavingsTargetCreate } from '~/schemas/SavingsTargetCreateSchema'
import { SavingsTargetCreateSchema } from '~/schemas/SavingsTargetCreateSchema'

const title = 'Buat Target Tabungan Baru'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})

const dayjs = useDayjs()
const dateNow = dayjs().format('YYYY-MM-DD')
const dateMonthLater = dayjs().add(1, 'month').format('YYYY-MM-DD')

const state = reactive({
  target_name: '',
  target_amount: '',
  current_amount: '',
  start_date: dateNow,
  target_date: dateMonthLater
})

const toast = useToast()

const pending = ref(false)
const onSubmit = async (event: FormSubmitEvent<SavingsTargetCreate>) => {
  state.target_amount = removeSeparator(event.data.target_amount)
  state.current_amount = removeSeparator(event.data.current_amount)

  pending.value = true

  try {
    const data = await $fetch(`/api/savings-targets`, {
      method: 'POST',
      body: event.data
    })

    toast.add({ title: data.message })
    await navigateTo('/savings-targets')
  } catch (error: any) {
    toast.add({ title: error.data.message })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold">{{ title }}</h1>

    <UForm :schema="SavingsTargetCreateSchema" :state="state" class="space-y-4 max-w-lg my-4" @submit="onSubmit">
      <UFormGroup label="Target yang Ingin Dicapai" name="target_name">
        <UInput v-model="state.target_name" />
      </UFormGroup>
      <UFormGroup label="Jumlah Target" name="target_amount">
        <UInput
          v-model="state.target_amount"
          inputmode="numeric"
          v-maska
          data-maska-number-locale="id"
          data-maska-number-unsigned />
      </UFormGroup>
      <UFormGroup label="Jumlah Tabungan Saat Ini" name="current_amount">
        <UInput
          v-model="state.current_amount"
          inputmode="numeric"
          v-maska
          data-maska-number-locale="id"
          data-maska-number-unsigned />
      </UFormGroup>
      <UFormGroup label="Tanggal Mulai" name="start_date">
        <DatePicker v-model="state.start_date" />
      </UFormGroup>
      <UFormGroup label="Tanggal Target" name="target_date">
        <DatePicker v-model="state.target_date" />
      </UFormGroup>
      <UButton type="submit" label="Submit" :loading="pending" />
    </UForm>
  </main>
</template>
