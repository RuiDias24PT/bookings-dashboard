<template>
    <div class="flex items-center justify-between px-6 py-4">
        <div class="flex gap-4 items-center">
            <h1 class="text-xl font-semibold">
                <slot name="title">Dashboard</slot>
            </h1>

            <div class="flex items-center gap-2">
                <InputSwitch v-model="pauseLiveUpdates" />
                <span>
                    {{ pauseLiveUpdates ? 'Pause Live Updates' : 'Resume Live Updates' }}
                </span>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <InputSwitch v-model="darkMode" />
            <span>{{ darkMode ? 'Dark Mode' : 'Light Mode' }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import InputSwitch from 'primevue/inputswitch'

const darkMode = ref(
    localStorage.getItem("theme") !== 'light'
)

const pauseLiveUpdates = ref(false)

watch(darkMode, (value) => {
    localStorage.setItem("theme", value ? 'dark' : 'light')
})
</script>
