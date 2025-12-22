<template>
    <Chart v-if="labels.length && values.length" type="pie" :data="chartData" :options="chartOptions"
        class="w-full h-[10rem]" />
    <Skeleton v-else shape="circle" size="10rem" />
</template>

<script setup>
import { computed } from 'vue';
import Chart from 'primevue/chart';
import { generateHslColors } from '../utils/colors';

const props = defineProps({
    labels: { type: Array, required: true, default: () => [] },
    values: { type: Array, required: true, default: () => [] }
});

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
