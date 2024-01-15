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
import { Network } from '../models/Network'

const model = defineModel<Network>({ required: true })

const SIZE = 50

const getConnectionPos = (x: number, y: number) => {
    const px = x - model.value.x
    const py = y - model.value.y
    const s = Math.sqrt(px * px + py * py)
    const radius = SIZE / 2
    return [px / s * radius, py / s * radius]
}

defineExpose({
    getConnectionPos
})
</script>