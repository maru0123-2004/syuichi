<template>
    <v-group :config="groupConfig"
    @mouseenter="$emit('selected')"
    @mouseleave="$emit('unselected')"
    @dragmove="onDragMove"
    @dragend="onDragEnd">
        <v-circle :config="{
            x: SIZE / 2,
            y: SIZE / 2,
            radius: SIZE / 2,
            stroke: 'black',
            strokeWidth: 3
        }"></v-circle>
        <v-text :config="{
            x: -50 + SIZE / 2,
            y: SIZE + 10,
            width: 100,
            text: model.refdata.name,
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
import { computed, readonly } from 'vue';
import { Network } from '../models/Network'

const model = defineModel<Network>({ required: true })

const emits = defineEmits<{
    selected: [],
    unselected: []
}>()

const SIZE = 50

const groupConfig = computed(() => {
    return {
        x: (model.value.refdata.x ?? 0) - SIZE / 2,
        y: (model.value.refdata.y ?? 0) - SIZE / 2,
        width: SIZE,
        height: SIZE,
        draggable: true
    }
})

const centerX = readonly(computed(() => {
    return model.value.x
}))

const centerY = readonly(computed(() => {
    return model.value.y
}))

const onDragMove = (e: any) => {
    model.value.x = e.target.x() + SIZE / 2
    model.value.y = e.target.y() + SIZE / 2
}

const onDragEnd = (e: any) => {
    model.value.save()
}

const getConnectionPos = (x: number, y: number) => {
    const px = x - model.value.x
    const py = y - model.value.y
    const s = Math.sqrt(px * px + py * py)
    const radius = SIZE / 2
    return [
        centerX.value + px / s * radius, 
        centerY.value + py / s * radius
    ]
}

defineExpose({
    getConnectionPos,
    centerX,
    centerY,
    model
})
</script>