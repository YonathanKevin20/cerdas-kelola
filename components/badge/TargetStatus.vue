<script setup lang="ts">
interface StatusItem {
  isAchieved: boolean
  color: BadgeColor
  label: string
}
type BadgeColor = 'blue' | 'green'

const props = defineProps<{
  isAchieved: boolean
}>()

const STATUS_ITEMS: StatusItem[] = [
  { isAchieved: true, color: 'blue', label: 'Tercapai' },
  { isAchieved: false, color: 'green', label: 'Aktif' }
]

const currentItem = computed(() => STATUS_ITEMS.find(item => item.isAchieved === props.isAchieved))
</script>

<template>
  <UBadge
    v-if="currentItem"
    :label="currentItem.label"
    :color="currentItem.color"
    variant="soft"
    :ui="{ rounded: 'rounded-full' }" />
</template>
