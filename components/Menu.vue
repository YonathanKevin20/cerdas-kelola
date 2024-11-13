<script setup lang="ts">
const session = useSupabaseSession()

const menuLinks = [
  { label: 'Home', to: '/' },
  { label: 'Edukasi Keuangan', to: '/educations' },
  { label: 'Transaksi', to: '/transactions' },
  { label: 'Target Tabungan', to: '/savings-targets' },
]

const activeClass = 'text-sky-700 font-medium dark:text-sky-300'
const inactiveClass = 'text-slate-700 hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-300'
</script>

<template>
  <div v-if="session" class="space-x-2">
    <template v-for="(link, index) in menuLinks" :key="index">
      <ULink
        :to="link.to"
        :active-class="activeClass"
        :inactive-class="inactiveClass"
        class="px-1.5 py-2.5 rounded-lg hover:bg-sky-100 dark:hover:bg-slate-800 dark:hover:text-sky-300">{{ link.label }}</ULink>
    </template>
  </div>
</template>
