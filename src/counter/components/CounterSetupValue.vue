<script setup lang="ts">
import { useCounterSetupStore } from '@/store/counter-setup';

const counter = useCounterSetupStore();
</script>

<template>
  <h1>El valor es: {{counter.count}}</h1>
  <h1>Último cambio: {{counter.lastChanged}}</h1>
</template>

<style scoped>

</style>