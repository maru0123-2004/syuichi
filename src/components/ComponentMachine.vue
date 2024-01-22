<template>
    <v-group :config="groupConfig"
    @mouseenter="$emit('selected')"
    @mouseleave="$emit('unselected')"
    @dragmove="onDragMove"
    @dragend="onDragEnd">
        <v-text :config="{
            fontFamily: 'Material Design Icons',
            fontSize: SIZE,
            text: String.fromCodePoint(components[model.refdata.machine_type].iconCode)
        }"></v-text>
        <v-text :config="{
            x: 0,
            y: SIZE + 10,
            width: SIZE,
            text: model.refdata.name.replaceAll('_', ' '),
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
import { components } from '@/const';

const model = defineModel<Machine>({ required: true })

const emits = defineEmits<{
    selected: [],
    unselected: []
}>()

const SIZE = 50

const x = model.value.refdata.x ?? 0
const y = model.value.refdata.y ?? 0

const groupConfig = computed(() => {
    return {
        x: x - SIZE / 2,
        y: y - SIZE / 2,
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