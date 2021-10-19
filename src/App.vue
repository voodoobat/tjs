<template>
  <scene />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Scene from '@/components/Scene.vue'

export default defineComponent({
  name: 'App',
  components: { Scene },
})
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}
</style>
