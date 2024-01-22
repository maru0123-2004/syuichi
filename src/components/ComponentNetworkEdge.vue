<template>
    <v-group
    @mouseenter="highlighted = true; $emit('selected');"
    @mouseleave="highlighted = false; $emit('unselected');">
        <v-line :config="{
            x: 0,
            y: 0,
            stroke: strokeColor,
            strokeWidth: 4,
            points: points,
            tension: 1
        }"></v-line>
        <v-line :config="{
            x: 0,
            y: 0,
            stroke: '#00000000',
            strokeWidth: 15,
            points: points,
            tension: 1
        }"></v-line>
    </v-group>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ComponentMachine from './ComponentMachine.vue'
import ComponentNetwork from './ComponentNetwork.vue'
import { moduleExpression } from '@babel/types';
import { ref } from 'vue';

const props = defineProps<{
    machine: InstanceType<typeof ComponentMachine> | undefined,
    network: InstanceType<typeof ComponentNetwork> | undefined,
    mouseX: number,
    mouseY: number
}>()

const emits = defineEmits<{
    selected: [],
    unselected: []
}>()

const highlighted = ref(false)

const points = computed(() => {
    const mx = props.mouseX
    const my = props.mouseY
    const machinePos = props.machine ? [props.machine.model.x, props.machine.centerY] : [mx, my]
    const networkPos = props.network ? [props.network.centerX, props.network.centerY] : [mx, my]
    return [
        ...(props.machine ? props.machine.getConnectionPos(networkPos[0], networkPos[1]) : [mx, my]),
        ...(props.network ? props.network.getConnectionPos(machinePos[0], machinePos[1]) : [mx, my])
    ]
})

const strokeColor = computed(() => {
    return highlighted.value ? "gray" : "black"
})
</script>