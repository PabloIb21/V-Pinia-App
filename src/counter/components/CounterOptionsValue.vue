<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';

const counter = useCounterOptionsStore();
</script>

<template>
  <h1>El valor es: {{counter.count}}</h1>
  <h1>Último cambio: {{counter.lastChanged}}</h1>
</template>

<style scoped>

</style>