<script setup lang="ts">
import { ModalDeleteProgressSavingsTarget } from '#components'

const title = 'Riwayat Tabungan'
useHead({
  title
})
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const savingsTargetId = route.params.savingsTargetId
const { data, status, refresh } = await useLazyFetch(`/api/progress-savings-targets/${savingsTargetId}/savings-targets`, {
  default: () => []
})

const chart = useTemplateRef('chart')

const getData = () => {
  return {
    animation: false,
    tooltip: {
      className: 'echarts-tooltip',
      formatter: function (params: any) {
        return `${params.marker} ${dateFormatted(params.name)}<br/>Jumlah: ${currencyIDRFormatted(params.value.amount)}`
      },
    },
    toolbox: {
      show: false,
      feature: {
        dataZoom: {},
        saveAsImage: {},
      },
    },
    dataset: {
      dimensions: ['date', 'amount'],
      source: data.value
    },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'line',
        symbolSize: 12
      }
    ],
  }
}

const option = shallowRef(getData())

const refreshChart = () => {
  option.value = getData()
}

watch(data, refreshChart)

const hideToolbox = () => {
  chart.value?.setOption({ toolbox: { show: false } })
}
const showToolbox = () => {
  chart.value?.setOption({ toolbox: { show: true } })
}

const columns = [{
  key: 'date',
  label: 'TANGGAL',
}, {
  key: 'amount',
  label: 'JUMLAH',
}, {
  key: 'actions',
  label: 'AKSI',
  class: 'w-24'
}]

const modal = useModal()
const openModalDeleteProgressSavingsTarget = (id: number) => {
  modal.open(ModalDeleteProgressSavingsTarget, {
    id,
    onSuccess: () => {
      refresh()
    }
  })
}
</script>

<template>
  <main>
    <h1 class="text-2xl font-bold">{{ title }}</h1>

    <LoadingState v-if="status === 'pending'" />
    <div v-else class="h-96">
      <VChart
        ref="chart"
        :option="option"
        @native:mouseenter="showToolbox()"
        @globalout="hideToolbox()" />
    </div>

    <div class="flex items-center space-x-2 my-4">
      <UTable
        :loading="status === 'pending'"
        :columns="columns"
        :rows="data"
        class="min-h-full border-2 rounded-lg">
        <template #date-data="{ row }">{{ dateFormatted(row.date) }}</template>
        <template #amount-data="{ row }">{{ currencyIDRFormatted(row.amount) }}</template>
        <template #actions-data="{ row }">
          <UTooltip
            v-if="row.id"
            text="Hapus Progres">
            <UButton
              icon="i-heroicons-trash"
              color="red"
              variant="ghost"
              size="xs"
              @click="openModalDeleteProgressSavingsTarget(row.id)" />
          </UTooltip>
        </template>
      </UTable>
    </div>
  </main>
</template>
