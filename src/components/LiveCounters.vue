<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStatsStore } from '../store/useStatsStore'
import StatCard from './StatCard.vue'

const stats = useStatsStore()

onMounted(() => {
    stats.start()
})

const active5s = computed(() => stats.activeLast5s)
const users24h = computed(() => stats.usersLast24h)
const cards24h = computed(() => stats.cardsLast24h)
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Active users (last 5s)" :value="active5s" sub="live" :positive="true" />
        <StatCard label="Users (last 24h)" :value="users24h" sub="rolling 24h" />
        <StatCard label="Cards created (24h)" :value="cards24h" sub="rolling 24h" />
    </div>
</template>