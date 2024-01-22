<template>
    <v-line :config="{
        x: 0,
        y: 0,
        stroke: 'black',
        strokeWidth: 3,
        points: points,
        tension: 1
    }"></v-line>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ComponentMachine from './ComponentMachine.vue'
import ComponentNetwork from './ComponentNetwork.vue'

const props = defineProps<{
    machine: InstanceType<typeof ComponentMachine> | undefined,
    network: InstanceType<typeof ComponentNetwork> | undefined,
    mouseX: number,
    mouseY: number
}>()

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
</script>