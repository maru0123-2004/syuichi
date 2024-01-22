<template>
    <div ref="contextMenuDiv" v-show="isVisible" style="position: absolute;" 
    :style="{ left: offsetX + 'px', top: offsetY + 'px'}"
    @focusout="onFocusOut"
    @keydown.escape="hide">
        <v-list id="list" ref="contextMenuList">
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
const focusRelated = ref<HTMLElement>()

const contextMenuDiv = ref<HTMLDivElement>()
const contextMenuList = ref<HTMLElement>()

const props = defineProps<{
    menu: {
        label: string,
        action: () => any
    }[]
}>()

const onClick = (idx: number) => {
    setTimeout(props.menu[idx].action, 0)
    hide()
}

const show = (x: number, y: number, focusElement?: HTMLElement) => {
    offsetX.value = x
    offsetY.value = y
    isVisible.value = true
    focusRelated.value = focusElement

    contextMenuDiv.value!.tabIndex = -1
    setTimeout(() => contextMenuDiv.value!.focus(), 0)
}

const hide = () => {
    isVisible.value = false;
    focusRelated.value?.focus()
}

const onFocusOut = (e: FocusEvent) => {
    const clickedInner = contextMenuDiv.value?.contains((e.relatedTarget as HTMLElement) ?? null)
    if(!clickedInner) {
        hide()
    }
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

div {
    outline: none;
}
</style>