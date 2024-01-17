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
import { ref, computed } from 'vue';
import ComponentMachine from './ComponentMachine.vue'
import ComponentNetwork from './ComponentNetwork.vue'

const props = defineProps<{
    machine: InstanceType<typeof ComponentMachine> | undefined,
    network: InstanceType<typeof ComponentNetwork> | undefined
}>()

const mx = ref(0)
const my = ref(0)

const points = computed(() => {
    // const machinePos = props.machine ? [props.machine.centerX, props.machine.centerY] : [mx.value, my.value]
    // const networkPos = props.network ? [props.network.centerX, props.network.centerY] : [mx.value, my.value]
    // return [
    //     ...(props.machine ? props.machine.getConnectionPos(networkPos[0], networkPos[1]) : [mx.value, my.value]),
    //     ...(props.network ? props.network.getConnectionPos(machinePos[0], machinePos[1]) : [mx.value, my.value])
    // ]
    return [
        ...(props.machine ? [props.machine.centerX, props.machine.centerY] : [mx.value, my.value]),
        ...(props.network ? [props.network.centerX, props.network.centerY] : [mx.value, my.value])
    ]
})

const processMouse = (e: MouseEvent) => {
    mx.value = e.clientX
    my.value = e.clientY
}

defineExpose({
    processMouse
})
</script>