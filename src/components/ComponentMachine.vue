<template>
    <v-group :config="{
            x: model.x,
            y: model.y,
            draggable: true
    }"
    @mouseenter="onMouseEnter"
    @mouseout="onMouseOut">
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
        }">
        </v-text>
    </v-group>
</template>

<script lang="ts" setup>
import { Machine } from '../models/Machine'

const model = defineModel({ type: Machine, required: true })

const SIZE = 50

const onMouseEnter = (e: unknown) => {
    console.log(e)
}

const onMouseOut = (e: unknown) => {
    console.log(e)
}

const getConnectionPos = (x: number, y: number) => {
    return [model.value.x, model.value.y]
}

defineExpose({
    getConnectionPos
})
</script>