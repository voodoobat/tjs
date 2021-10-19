<template>
  <div class="scene" ref="root">
    <!-- ... -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { animate, setSceneSize, renderScene } from '@/components/Scene'

export default defineComponent({
  name: 'scene',
  setup() {
    const root = ref<HTMLElement | null>(null)
    onMounted(() => {
      renderScene(root.value)
      animate()

      window.addEventListener('resize', setSceneSize)
    })
    return {
      root,
    }
  },
})
</script>
