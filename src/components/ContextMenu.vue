<template>
    <div ref="contextMenuDiv" v-show="isVisible" style="position: absolute;" 
    :style="{ left: offsetX + 'px', top: offsetY + 'px'}"
    @focus="focusRelated = $event.relatedTarget"
    @keydown.escape="isVisible = false; backFocus()">
        <v-list id="list">
            <v-list-item v-for="(item, idx) in props.menu" :key="idx"
            @click="onClick(idx)">
                <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ref } from 'vue';

const isVisible = ref(false)
const offsetX = ref(0)
const offsetY = ref(0)

const contextMenuDiv = ref<HTMLDivElement>()

const focusRelated = ref<EventTarget | null>(null)

const props = defineProps<{
    menu: {
        label: string,
        action: () => any
    }[]
}>()

const onClick = (idx: number) => {
    (focusRelated.value as HTMLElement).focus()
    isVisible.value = false
    setTimeout(props.menu[idx].action, 0)
    backFocus()
}

const show = (mouse: MouseEvent) => {
    mouse.preventDefault()
    offsetX.value = mouse.clientX
    offsetY.value = mouse.clientY
    isVisible.value = true
    contextMenuDiv.value!.tabIndex = -1
    setTimeout(() => contextMenuDiv.value!.focus(), 0)
}

const backFocus = () => {
    (focusRelated.value as HTMLElement).focus()
}

const isShowing = computed(() => isVisible)

defineExpose({
    show,
    isShowing
})
</script>

<style scoped>
#list {
    box-shadow: 0px 0px 6px black;
    user-select: none;
}
</style>