<template>
    <div ref="contextMenuDiv" v-show="isVisible" style="position: absolute;" 
    :style="{ left: offsetX + 'px', top: offsetY + 'px'}"
    @focusout="console.log('focus out')"
    @focus="console.log('focus')"
    @focusin="console.log('focus in')">
        <v-list>
            <v-list-item v-for="(item, idx) in props.menu" :key="idx"
            @click="onClick(idx)">
                <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isVisible = ref(false)
const offsetX = ref(0)
const offsetY = ref(0)

const contextMenuDiv = ref<HTMLDivElement>()

const props = defineProps<{
    menu: {
        label: string,
        action: () => any
    }[]
}>()

const onClick = (idx: number) => {
    isVisible.value = false
    props.menu[idx].action()
}

const show = (mouse: MouseEvent) => {
    mouse.preventDefault()
    offsetX.value = mouse.clientX
    offsetY.value = mouse.clientY
    isVisible.value = true
    contextMenuDiv.value!.focus()
}

defineExpose({
    show
})
</script>