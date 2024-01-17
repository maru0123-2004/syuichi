<template>
    <v-group :config="groupConfig"
    @mouseenter="$emit('selected')"
    @mouseleave="$emit('unselected')"
    @dragmove="onDragMove">
        <v-rect :config="{
            width: SIZE,
            height: SIZE,
            fill: 'black'
        }"></v-rect>
        <v-text :config="{
            x: 0,
            y: SIZE + 10,
            width: SIZE,
            text: model.id,
            align: 'center'
        }"></v-text>
        <v-circle v-if="model.highlighted" :config="{
            x: SIZE / 2,
            y: SIZE / 2,
            radius: SIZE / 1.5,
            stroke: '#00000',
            opacity: 0.5,
            strokeWidth: 3
        }"></v-circle>
    </v-group>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Machine } from '../models/Machine'
import { readonly } from 'vue';

const model = defineModel<Machine>({ required: true })

const emits = defineEmits<{
    selected: [],
    unselected: []
}>()

const SIZE = 50

const groupConfig = computed(() => {
    return {
        x: model.value.x,
        y: model.value.y,
        width: SIZE,
        height: SIZE,
        draggable: true
    }
})

const centerX = readonly(computed(() => {
    return model.value.x + SIZE / 2
}))

const centerY = readonly(computed(() => {
    return model.value.y + SIZE / 2
}))

const onDragMove = (e: any) => {
    model.value.x = e.target.x()
    model.value.y = e.target.y()
}

const getConnectionPos = (x: number, y: number) => {
    return [
        centerX.value,
        centerY.value
    ]
}

defineExpose({
    getConnectionPos,
    centerX,
    centerY,
    model
})
</script>