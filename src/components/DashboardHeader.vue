<template>
    <div class="flex items-center justify-between px-6 py-4">
        <div class="flex gap-4 items-center">
            <h1 class="text-xl font-semibold">
                <slot name="title">Dashboard</slot>
            </h1>
            <div class="flex items-center gap-2">
                <InputSwitch :model-value="pauseLiveUpdates"
                    @update:model-value="$emit('update:pauseLiveUpdates', $event)" />
                <span>{{ pauseLiveUpdates ? 'Pause Live Updates' : 'Resume Live Updates' }}</span>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <InputSwitch :model-value="darkMode" @update:model-value="$emit('update:darkMode', $event)" />
            <span>{{ darkMode ? 'Dark Mode' : 'Light Mode' }}</span>
        </div>
    </div>
</template>

<script setup>
import InputSwitch from 'primevue/inputswitch';

const props = defineProps({
    pauseLiveUpdates: Boolean,
    darkMode: Boolean
});

const emit = defineEmits(['update:pauseLiveUpdates', 'update:darkMode']);
</script>
