<template>
    <div class="tabs" >
        <v-tooltip :text="tab.name" location="bottom" v-for="(tab, index) in tabs" :key="index">
            <template v-slot:activator="{ props }">
                <v-icon class="tab" v-bind="props" draggable="true" :data-type="index"
                :icon="tab.icon" @dragstart="onDragStart" @dragend="onDragEnd"></v-icon>
            </template>
        </v-tooltip>
    </div>
</template>

<script lang="ts" setup>
import {components as tabs} from '@/const';

const onDragStart = (e: DragEvent) => {
    const el = e.target as HTMLElement | null
    const serverType = el?.dataset.type
    if(serverType && el) {
        e.dataTransfer?.setData("text/plain", serverType)
        el.style.opacity = "0.5"
    }
}

const onDragEnd = (e: DragEvent) => {
    const el = e.target as HTMLElement | null
    if(el) {
        el.style.opacity = "1.0"
    }
}
</script>

<style scoped>
.tabs {
    width: 100%;
    height: 100%;
    display: flex;
    border: 2px black solid;
    box-sizing: border-box;
}

.tab {
    width: 64px;
    height: 64px;
    margin: 20px;
    font-size: 64px;
}
</style>