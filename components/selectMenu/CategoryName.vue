<script setup lang="ts">
const options = [
  { category_type: 'income', label: 'Uang Jajan', value: 'Uang Jajan'},
  { category_type: 'income', label: 'Hadiah', value: 'Hadiah'},
  { category_type: 'income', label: 'Tabungan dari Orang Tua', value: 'Tabungan dari Orang Tua'},
  { category_type: 'income', label: 'THR', value: 'THR'},
  { category_type: 'income', label: 'Angpau', value: 'Angpau'},
  { category_type: 'income', label: 'Hasil Jualan', value: 'Hasil Jualan'},
  { category_type: 'income', label: 'Upah Membantu', value: 'Upah Membantu'},
  { category_type: 'income', label: 'Beasiswa', value: 'Beasiswa'},
  { category_type: 'income', label: 'Lainnya', value: 'Lainnya'},
  { category_type: 'expense', label: 'Makanan', value: 'Makanan'},
  { category_type: 'expense', label: 'Minuman', value: 'Minuman'},
  { category_type: 'expense', label: 'Jajan', value: 'Jajan'},
  { category_type: 'expense', label: 'Transportasi', value: 'Transportasi'},
  { category_type: 'expense', label: 'Alat Tulis', value: 'Alat Tulis'},
  { category_type: 'expense', label: 'Mainan', value: 'Mainan'},
  { category_type: 'expense', label: 'Buku', value: 'Buku'},
  { category_type: 'expense', label: 'Pulsa/Paket Data', value: 'Pulsa/Paket Data'},
  { category_type: 'expense', label: 'Pakaian', value: 'Pakaian'},
  { category_type: 'expense', label: 'Donasi/Sedekah', value: 'Donasi/Sedekah'},
  { category_type: 'expense', label: 'Hiburan', value: 'Hiburan'},
  { category_type: 'expense', label: 'Hobi', value: 'Hobi'},
  { category_type: 'expense', label: 'Tabungan', value: 'Tabungan'},
  { category_type: 'expense', label: 'Keperluan Sekolah', value: 'Keperluan Sekolah'},
  { category_type: 'expense', label: 'Kesehatan', value: 'Kesehatan'},
  { category_type: 'expense', label: 'Lainnya', value: 'Lainnya'},
]

const model = defineModel<string>()

const categoryType = useState<string>('category_type', () => '')

const emit = defineEmits<{
  change: [string]
}>()

const handleChange = (value: string) => {
  const selectedOption = options.find(option => option.value === value)
  if (selectedOption) {
    emit('change', selectedOption.value)
    categoryType.value = selectedOption.category_type
  }
}
</script>

<template>
  <USelectMenu
    searchable
    searchable-placeholder="Cari kategori..."
    placeholder="Pilih kategori"
    v-model="model"
    @change="handleChange"
    value-attribute="value"
    :options="options"
    option-attribute="label">
    <template #label>
      <div
        v-if="model"
        class="block truncate space-x-2">
        <span>{{ model }}</span>
        <span class="text-xs text-gray-500">({{ translateCategoryType(categoryType) }})</span>
      </div>
    </template>
    <template #option="{ option }">
      <div class="block truncate space-x-2">
        <span>{{ option.label }}</span>
        <span class="text-xs text-gray-500">({{ translateCategoryType(option.category_type) }})</span>
      </div>
    </template>
  </USelectMenu>
</template>
