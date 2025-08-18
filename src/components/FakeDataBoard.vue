<script setup lang="ts">
import { computed } from 'vue'
import { Line, Bar } from 'vue-chartjs'
import {
    Chart,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Filler,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js'
import StatCard from './StatCard.vue'
import {
    months,
    uniqueVisitors,
    trialSignups,
    trialSignupConvRate,
    paidSubscriptions,
    currentMRR,
    currentARR,
} from '../data/fake'

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend, BarElement)

const kpi = computed(() => ({
    visitorsDec: uniqueVisitors[11],
    signupsDec: trialSignups[11],
    paidSubsDec: paidSubscriptions[11],
    mrrDec: currentMRR[11],
    arrDec: currentARR[11],
}))

const visitorsData = {
    labels: months,
    datasets: [{
        label: 'Unique Visitors',
        data: uniqueVisitors,
        fill: true,
        backgroundColor: 'rgba(59,130,246,0.15)',
        borderColor: 'rgba(59,130,246,1)',
        tension: 0.35,
        pointRadius: 0,
    }],
}

const signupsBar = {
    labels: months,
    datasets: [{
        label: 'Trial Signups',
        data: trialSignups,
        backgroundColor: 'rgba(99,102,241,0.6)',
        borderColor: 'rgba(99,102,241,1)'
    }]
}

const convRateLine = {
    labels: months,
    datasets: [{
        label: 'Signup Conversion Rate',
        data: trialSignupConvRate.map(v => v * 100),
        borderColor: 'rgba(16,185,129,1)',
        backgroundColor: 'rgba(16,185,129,0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
    }]
}

const revenueLine = {
    labels: months,
    datasets: [
        {
            label: 'Current total MRR (£)',
            data: currentMRR,
            borderColor: 'rgba(234,179,8,1)',
            backgroundColor: 'rgba(234,179,8,0.15)',
            fill: true,
            tension: 0.35,
            pointRadius: 0,
        },
        {
            label: 'Current total ARR (£)',
            data: currentARR,
            borderColor: 'rgba(244,63,94,1)',
            backgroundColor: 'rgba(244,63,94,0.12)',
            fill: true,
            tension: 0.35,
            pointRadius: 0,
        },
    ],
}

const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#cbd5e1' } } },
    scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(148,163,184,0.1)' }, ticks: { color: '#94a3b8' } },
    },
}

const percentOptions = {
    ...baseOptions,
    scales: {
        x: baseOptions.scales.x,
        y: {
            ...baseOptions.scales.y,
            ticks: {
                color: '#94a3b8',
                callback: (tickValue: string | number) => `${tickValue}%`
            }
        },
    },
}
</script>

<template>
    <section class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <StatCard label="Unique Visitors (Dec)" :value="kpi.visitorsDec ?? 0" sub="fake data" />
            <StatCard label="Trial Signups (Dec)" :value="kpi.signupsDec ?? 0" sub="fake data" />
            <StatCard label="Paid Subs (Dec)" :value="kpi.paidSubsDec ?? 0" sub="fake data" />
            <StatCard label="Current MRR (Dec)" :value="'£' + kpi.mrrDec" sub="fake data" />
            <StatCard label="Current ARR (Dec)" :value="'£' + kpi.arrDec" sub="fake data" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Visitors -->
            <div class="card h-72 flex flex-col justify-center">
                <div class="flex flex-col items-center text-center mb-3 w-full">
                    <h3 class="text-white font-semibold w-full">Unique Visitors (Monthly)</h3>
                    <span class="text-xs text-slate-400 w-full">Jan → Dec</span>
                </div>
                <div class="h-56 w-full">
                    <Line :data="visitorsData" :options="baseOptions" />
                </div>
            </div>

            <!-- Signups -->
            <div class="card h-72 flex flex-col justify-center">
                <div class="flex flex-col items-center text-center mb-3 w-full">
                    <h3 class="text-white font-semibold w-full">Trial Signups (Monthly)</h3>
                    <span class="text-xs text-slate-400 w-full">Bar</span>
                </div>
                <div class="h-56 w-full">
                    <Bar :data="signupsBar" :options="baseOptions" />
                </div>
            </div>

            <!-- Conversion -->
            <div class="card h-72 flex flex-col justify-center">
                <div class="flex flex-col items-center text-center mb-3 w-full">
                    <h3 class="text-white font-semibold w-full">Signup Conversion Rate</h3>
                    <span class="text-xs text-slate-400 w-full">%</span>
                </div>
                <div class="h-56 w-full">
                    <Line :data="convRateLine" :options="percentOptions" />
                </div>
            </div>

            <!-- Revenue -->
            <div class="card h-72 flex flex-col justify-center">
                <div class="flex flex-col items-center text-center mb-3 w-full">
                    <h3 class="text-white font-semibold w-full">MRR & ARR (Cumulative)</h3>
                    <span class="text-xs text-slate-400 w-full">£</span>
                </div>
                <div class="h-56 w-full">
                    <Line :data="revenueLine" :options="baseOptions" />
                </div>
            </div>
        </div>

    </section>
</template>