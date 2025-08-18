<script setup lang="ts">
import { computed } from 'vue'
import { useStatsStore } from './store/useStatsStore'
import LiveCounters from './components/LiveCounters.vue'
import AreaChart from './components/AreaChart.vue'
import FakeDataBoard from './components/FakeDataBoard.vue'

const stats = useStatsStore()
const labels = computed(() => stats.chartSeries.map(p => p.t))
const data = computed(() => stats.chartSeries.map(p => p.v))
</script>

<template>
  <div class="min-h-screen bg-dark-animate text-white">
    <!-- Navbar -->
    <header class="sticky top-0 z-20 glass border-b border-white/10 shadow-glow">
      <div class=" px-10 py-4 flex items-center justify-between">
        <!-- Brand -->
        <div class="flex items-center gap-3">
          <div
            class="h-10 w-10 rounded-2xl bg-gradient-to-tr from-brand-500/30 to-brand-400/20 flex items-center justify-center shadow-glow">
            <span class="text-brand-400 font-bold">FZ</span>
          </div>
          <div>
            <h1 class="text-lg font-semibold leading-tight">Forzeit Admin Dashboard</h1>
            <p class="text-slate-400 text-xs">Frontend demo • Live + fake data</p>
          </div>
        </div>


        <!-- Badges -->
        <div class="flex items-center gap-3">
          <span class="badge text-green-300">Live</span>
          <span class="badge text-blue-300">Demo</span>
          <span class="badge hidden sm:inline-flex text-purple-300">Fake Data</span>
        </div>

      </div>
    </header>

    <!-- Content -->
    <main class="px-10 py-10 space-y-10">
      <!-- Counters -->
      <LiveCounters />

      <!-- Charts + Upload -->

      <div class="lg:col-span-2 glass p-6 rounded-2xl shadow-glow">
        <AreaChart :labels="labels" :data="data" />
      </div>



      <!-- Fake Data Board -->
      <FakeDataBoard />

      <!-- Extra Cards -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card">
          <h3 class="text-white font-semibold mb-3">Notes</h3>
          <ul class="text-slate-300 text-sm list-disc pl-5 space-y-1">
            <li>Live counters are simulated.</li>
            <li>Charts visualize fake dataset (Jan–Dec).</li>
          </ul>
        </div>

        <div class="card">
          <h3 class="text-white font-semibold mb-3">Accessibility</h3>
          <p class="text-slate-300 text-sm">High contrast, keyboard support, large hit areas for usability.</p>
        </div>

        <div class="card">
          <h3 class="text-white font-semibold mb-3">Performance</h3>
          <p class="text-slate-300 text-sm">Vite static build, no backend calls, efficient chart updates.</p>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="glass  mt-10 px-20 py-4 text-center text-slate-400 text-xs rounded-2xl">
      © {{ new Date().getFullYear() }} Forzeit (Demo). All rights reserved.
    </footer>

  </div>
</template>
