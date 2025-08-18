<script setup lang="ts">
import * as XLSX from 'xlsx'
import { ref } from 'vue'

const rows = ref<any[]>([])

function onFile(e: Event) {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer)
        const wb = XLSX.read(data, { type: 'array' })
        const firstSheetName = wb.SheetNames[0]
        if (!firstSheetName) return
        const ws = wb.Sheets[firstSheetName]
        if (ws) {
            rows.value = XLSX.utils.sheet_to_json(ws)
        }
    }
    reader.readAsArrayBuffer(file)
}
</script>

<template>
    <div class="card">
        <div class="flex items-center justify-between">
            <h3 class="text-white font-semibold">Marketing Forecasts (from Excel)</h3>
            <label class="badge cursor-pointer">
                <input type="file" class="hidden" accept=".xlsx,.xls" @change="onFile" />
                Upload Excel
            </label>
        </div>
        <div v-if="rows.length === 0" class="text-slate-400 text-sm mt-2">No file loaded yet. Upload the provided sheet.
        </div>
        <div v-else class="overflow-auto mt-4">
            <table class="min-w-full text-sm">
                <thead class="text-slate-300">
                    <tr>
                        <th v-for="(v, k) in rows[0]" :key="String(k)" class="text-left pr-6 pb-2 font-medium">{{ k }}
                        </th>
                    </tr>
                </thead>
                <tbody class="text-slate-200">
                    <tr v-for="(r, i) in rows" :key="i" class="border-t border-white/10">
                        <td v-for="(v, k) in r" :key="String(k)" class="pr-6 py-2">{{ v }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>