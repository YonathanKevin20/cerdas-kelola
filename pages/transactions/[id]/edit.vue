<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { TransactionEdit } from '~/schemas/TransactionEditSchema'
import { TransactionEditSchema } from '~/schemas/TransactionEditSchema'

const title = 'Edit Transaksi'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})

const dayjs = useDayjs()
const dateNow = dayjs().format('YYYY-MM-DD')

const state = reactive({
  category_name: '',
  category_type: '',
  amount: '',
  transaction_date: dateNow,
  description: '',
})
const categoryType = useState<string>('category_type')

const route = useRoute()
const id = route.params.id
const initState = async () => {
  try {
    const data = await $fetch(`/api/transactions/${id}`)

    if (data) {
      state.category_name = data.category_name
      state.category_type = data.category_type
      state.amount = getInt(data.amount)
      state.transaction_date = data.transaction_date
      state.description = data.description || ''
    }
  } catch (error: any) {
    console.error(error)
  }
}

onMounted(() => {
  initState()
})

const toast = useToast()

const pending = ref(false)
const onSubmit = async (event: FormSubmitEvent<TransactionEdit>) => {
  state.category_type = categoryType.value
  state.amount = removeSeparator(event.data.amount)

  pending.value = true

  try {
    const data = await $fetch(`/api/transactions/${id}`, {
      method: 'PUT',
      body: event.data
    })

    toast.add({ title: data.message })
    await navigateTo('/transactions')
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

    <UForm :schema="TransactionEditSchema" :state="state" class="space-y-4 max-w-lg my-4" @submit="onSubmit">
      <UFormGroup label="Kategori" name="category_name">
        <SelectMenuCategoryName v-model="state.category_name" />
      </UFormGroup>
      <UFormGroup label="Jumlah" name="amount">
        <UInput
          v-model="state.amount"
          inputmode="numeric"
          v-maska
          data-maska-number-locale="id"
          data-maska-number-unsigned />
      </UFormGroup>
      <UFormGroup label="Tanggal" name="transaction_date">
        <DatePicker v-model="state.transaction_date" />
      </UFormGroup>
      <UFormGroup label="Keterangan" name="description">
        <UTextarea v-model="state.description" />
      </UFormGroup>
      <UButton type="submit" label="Submit" :loading="pending" />
    </UForm>
  </main>
</template>
