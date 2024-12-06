<script setup lang="ts">
import { ModalDeleteTransaction } from '#components'

const title = 'Transaksi'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})

const columns = [{
  key: 'id',
  label: '#'
}, {
  key: 'category_name',
  label: 'KATEGORI'
}, {
  key: 'category_type',
  label: 'JENIS'
}, {
  key: 'amount',
  label: 'JUMLAH',
}, {
  key: 'transaction_date',
  label: 'TANGGAL',
  sortable: true
}, {
  key: 'description',
  label: 'KETERANGAN'
}, {
  key: 'actions',
  label: 'AKSI',
  class: 'w-24'
}]
const actionItems = (row: { id: number, screenshots_count: number }) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: async () => await navigateTo(`/transactions/${row.id}/edit`)
  }],
  [{
    label: 'Hapus',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openModalDeleteTransaction(row.id)
  }]
]

const route = useRoute()
const dayjs = useDayjs()

const currentMonth = route.query.month ? ''+route.query.month : ''+(dayjs().month() + 1)
const currentYear = route.query.year ? ''+route.query.year : ''+(dayjs().year())
const selectedYear = ref(currentYear)
const selectedMonth = ref(currentMonth)
const { data, status, refresh } = await useLazyFetch(`/api/transactions`, {
  query: {
    year: selectedYear,
    month: selectedMonth
  },
  default: () => [],
  watch: [selectedYear, selectedMonth],
})

const updateRouteQuery = async (key: string, value: string) => {
  await navigateTo({ query: { ...route.query, [key]: value } })
}

const modal = useModal()
const openModalDeleteTransaction = (id: number) => {
  modal.open(ModalDeleteTransaction, {
    id,
    onSuccess: () => refresh()
  })
}

const totalIncome = computed(() => data.value.reduce((acc, row) => row.category_type === 'income' ? acc + Number(row.amount) : acc, 0))
const totalExpense = computed(() => data.value.reduce((acc, row) => row.category_type === 'expense' ? acc + Number(row.amount) : acc, 0))
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold">{{ title }}</h1>

    <div class="flex items-center space-x-2 my-4">
      <UButton
        to="/transactions/create"
        label="Buat Transaksi"
        variant="solid"
        color="sky" />
      <!-- <ButtonTaskExportExcel
        :year="selectedYear"
        :month="selectedMonth"
        :data="data" /> -->
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-x-4 my-4">
      <ButtonMonth
        v-model="selectedMonth"
        @change="updateRouteQuery('month', selectedMonth)" />
      <SelectYear
        v-model="selectedYear"
        @change="updateRouteQuery('year', selectedYear)" />
    </div>

    <div class="flex items-center space-x-4 my-4">
      <div class="flex items-center space-x-2 my-4">
        <span class="text-lg font-bold">Total Pemasukan:</span>
        <span class="text-lg font-bold text-green-500">{{ currencyIDRFormatted(totalIncome) }}</span>
      </div>
      <div class="flex items-center space-x-2 my-4">
        <span class="text-lg font-bold">Total Pengeluaran:</span>
        <span class="text-lg font-bold text-red-500">{{ currencyIDRFormatted(totalExpense) }}</span>
      </div>
      <div class="flex items-center space-x-2 my-4">
        <span class="text-lg font-bold">Total Saldo:</span>
        <span class="text-lg font-bold">{{ currencyIDRFormatted(totalIncome - totalExpense) }}</span>
      </div>
    </div>

    <UTable
      :loading="status === 'pending'"
      :columns="columns"
      :rows="data"
      class="min-h-full border-2 rounded-lg">
      <template #id-data="{ index }">{{ index + 1 }}</template>
      <template #category_type-data="{ row }">{{ translateCategoryType(row.category_type) }}</template>
      <template #amount-data="{ row }">{{ currencyIDRFormatted(row.amount) }}</template>
      <template #transaction_date-data="{ row }">{{ dateFormatted(row.transaction_date) }}</template>
      <template #description-data="{ row }">
        <div class="max-w-lg truncate">{{ row.description }}</div>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="actionItems(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </main>
</template>
