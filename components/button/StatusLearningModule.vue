<script setup lang="ts">
interface Props {
  isCompleted: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'soft' | 'ghost'
  animation?: boolean
}

const {
  size = 'sm',
  variant = 'soft',
  animation = true
} = defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton
      v-if="isCompleted"
      label="Selesai"
      :size="size"
      color="green"
      :variant="variant"
      class="group">
      <template #leading>
        <UIcon
          name="i-heroicons-check-circle"
          class="w-5 h-5"
          :class="{ 'animate-pulse': animation }" />
      </template>
    </UButton>
    <UButton
      v-else
      label="Mulai Belajar"
      :size="size"
      color="sky"
      :variant="variant"
      class="group"
      :class="{ 'hover:scale-105 transition-transform': animation }" >
      <template #leading>
        <UIcon
          name="i-heroicons-play"
          class="w-5 h-5"
          :class="{ 'group-hover:animate-bounce': animation }" />
      </template>
    </UButton>
  </div>
</template>
