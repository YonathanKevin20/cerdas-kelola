<script setup lang="ts">
const props = defineProps<{
  isCompleted: boolean
  learningModuleId: string
}>()

const toast = useToast()
const pending = ref(false)
const completeLearningModule = async () => {
  pending.value = true

  try {
    const data = await $fetch(`/api/progress-learning-modules`, {
      method: 'POST',
      body: {
        learning_module_id: props.learningModuleId
      }
    })

    toast.add({ title: data.message })
    emit('success')
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
  <div class="mt-8 text-center">
    <div class="relative inline-block">
      <!-- Wrapper with conditional animation -->
      <div :class="{ 'animate-float': !isCompleted }">
        <!-- Sparkle effects only shown when not completed -->
        <div v-if="!isCompleted" class="absolute -inset-4 flex items-center justify-center">
          <div class="absolute w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
          <div class="absolute -right-2 -top-2 w-3 h-3 bg-green-300 rounded-full animate-ping delay-100"></div>
          <div class="absolute -left-2 -bottom-2 w-3 h-3 bg-blue-300 rounded-full animate-ping delay-200"></div>
        </div>

        <UButton
          @click="completeLearningModule"
          :loading="pending"
          :disabled="isCompleted"
          size="xl"
          :color="isCompleted ? 'gray' : 'green'"
          :variant="isCompleted ? 'soft' : 'solid'"
          class="shadow-xl transition-all duration-200"
          :class="{
            'hover:shadow-2xl transform hover:-translate-y-1': !isCompleted
          }">
          <span class="text-lg font-bold">
            {{ isCompleted ? '🌟 Hebat! Kamu Berhasil! 🌟' : '✨ Ayo Selesaikan! ✨' }}
          </span>
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
