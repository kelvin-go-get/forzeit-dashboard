<script setup lang="ts">
interface Props {
    label: string
    value: string | number
    sub?: string
    positive?: boolean
}
const props = defineProps<Props>()
</script>

<template>
    <div class="card relative overflow-hidden">
        <div class="absolute inset-0 pointer-events-none">
            <div class="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl"></div>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-sm text-slate-300">{{ label }}</span>
            <span class="badge" :class="positive ? 'text-green-300' : 'text-slate-300'">{{ sub }}</span>
        </div>
        <div class="mt-2 text-3xl font-semibold text-white tracking-tight">{{ value }}</div>
    </div>
</template>