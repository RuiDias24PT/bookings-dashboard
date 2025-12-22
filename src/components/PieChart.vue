<template>
    <div class="flex flex-col items-center justify-center">
        <Chart v-if="hasData" type="pie" :data="chartData" :options="chartOptions" class="w-full h-[10rem]" />

        <div v-else class="flex flex-col items-center gap-2 text-gray-500">
            <p class="text-sm">No data available</p>
            <Skeleton shape="circle" size="10rem" />
            <Skeleton height="1rem" width="6rem" />
            <Skeleton height="1rem" width="6rem" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Chart from 'primevue/chart';
import { generateHslColors } from '../utils/colors';

const props = defineProps({
    labels: { type: Array, required: true, default: () => [] },
    values: { type: Array, required: true, default: () => [] }
});

const hasData = computed(() => props.labels.length > 0 && props.values.length > 0);

const chartData = computed(() => ({
    labels: props.labels,
    datasets: [{
        data: props.values,
        backgroundColor: generateHslColors(props.values.length)
    }]
}));

const chartOptions = computed(() => {
    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--text-color');

    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: { color: textColor, usePointStyle: true }
            },
            tooltip: {
                callbacks: {
                    label: ctx => `${ctx.label}: ${ctx.raw.toFixed(2)}`
                }
            }
        }
    };
});
</script>

<style scoped></style>
