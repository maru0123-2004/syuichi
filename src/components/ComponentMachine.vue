<template>
    <v-group :config="groupConfig"
    ref="group"
    @mouseenter="onMouseEnter"
    @mouseout="onMouseOut"
    @dragmove="onDragMode">
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
import { ref, computed } from 'vue'
import { Machine } from '../models/Machine'
import { watch } from 'vue';
import { onMounted } from 'vue';

const model = defineModel({ type: Machine, required: true })

const SIZE = 50

const group = ref()

const groupConfig = computed(() => {
    return {
        x: model.value.x,
        y: model.value.y,
        draggable: true
    }
})

const centerX = ref(model.value.x + SIZE / 2)
const centerY = ref(model.value.y + SIZE / 2)

const onMouseEnter = (e: unknown) => {
    console.log(e)
}

const onMouseOut = (e: unknown) => {
    console.log(e)
}

const onDragMode = (e: unknown) => {
    model.value.x = e.target.x()
}

const getConnectionPos = (x: number, y: number) => {
    return [
        model.value.x + SIZE / 2, 
        model.value.y + SIZE / 2
    ]
}

defineExpose({
    getConnectionPos,
    centerX,
    centerY
})
</script>