<template>
    <v-group :config="{
        x: model.x,
        y: model.y,
        draggable: true
    }">
        <v-circle :config="{
            x: SIZE / 2,
            y: SIZE / 2,
            radius: SIZE / 2,
            stroke: 'black',
            strokeWidth: 3
        }"></v-circle>
        <v-text :config="{
            x: 0,
            y: SIZE + 10,
            width: SIZE,
            text: model.id,
            align: 'center'
        }"></v-text>
    </v-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Network } from '../models/Network'
import { watch } from 'vue';

const model = defineModel<Network>({ required: true })

const SIZE = 50

const centerX = ref(model.value.x + SIZE / 2)
const centerY = ref(model.value.y + SIZE / 2)

watch(model.value,
(newVal, oldVal) => {
    console.log(newVal, oldVal)
})

const getConnectionPos = (x: number, y: number) => {
    const px = x - model.value.x
    const py = y - model.value.y
    const s = Math.sqrt(px * px + py * py)
    const radius = SIZE / 2
    console.log(px, py, s, radius)
    return [
        centerX.value + px / s * radius, 
        centerY.value + py / s * radius
    ]
}

defineExpose({
    getConnectionPos,
    centerX,
    centerY
})
</script>