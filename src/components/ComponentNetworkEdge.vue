<template>
    <v-line :config="{
        fill: 'black',
        points: points
    }"></v-line>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import ComponentMachine from './ComponentMachine.vue';
import ComponentNetwork from './ComponentNetwork.vue';

const props = defineProps<{
    machine: InstanceType<typeof ComponentMachine> | undefined,
    network: InstanceType<typeof ComponentNetwork> | undefined
}>()

const mx = ref(0)
const my = ref(0)

const points = computed(() => {
    const mp = props.machine ? props.machine.getConnectionPos(0, 0) : [mx.value, my.value]
    return [
        ...mp,
        ...(props.network ? props.network.getConnectionPos(mp[0], mp[1]) : [mx.value, my.value])
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