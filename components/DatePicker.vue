<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.preference === 'dark')

const model = defineModel<string>()
</script>

<template>
  <VueDatePicker
    v-model="model"
    :dark="isDark"
    placeholder="Pilih tanggal"
    :enable-time-picker="false"
    format="yyyy-MM-dd"
    model-type="yyyy-MM-dd"
    auto-apply />
</template>
