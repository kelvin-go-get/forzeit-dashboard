<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
    Chart,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js'
import { last24Hours, hourlyActiveLogins } from '../data/fake'
Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend)



const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(148,163,184,0.1)' }, ticks: { color: '#94a3b8' } },
    },
}

const dataset = {
    labels: last24Hours,
    datasets: [
        {
            label: 'Hourly Active Logins',
            data: hourlyActiveLogins,
            fill: true,
            backgroundColor: 'rgba(59,130,246,0.15)',
            borderColor: 'rgba(59,130,246,1)',
            tension: 0.35,
            pointRadius: 0,
        },
    ],
}
</script>

<template>
    <div class="card h-64">
        <div class="flex items-center justify-between mb-3">
            <h3 class="text-white font-semibold">Activity (24h)</h3>
            <span class="text-xs text-slate-400">Logins per hour</span>
        </div>
        <div class="h-52">
            <Line :data="dataset" :options="options" />
        </div>
    </div>
</template>