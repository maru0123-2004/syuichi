<template>
    <div id="tab">
        <div id="server" draggable="true" data-type="HTML" @dragstart="onDragStart" @dragend="onDragEnd"></div>
        <div id="server" draggable="true" data-type="DNS" @dragstart="onDragStart" @dragend="onDragEnd"></div>
        <div id="server" draggable="true" data-type="FILE" @dragstart="onDragStart" @dragend="onDragEnd"></div>
    </div>
</template>

<script lang="ts" setup>
const onDragStart = (e: DragEvent) => {
    const serverType = e.target?.type
    e.dataTransfer?.setData("text/plain", serverType)

    e.target.style.opacity = "0.5"
}

const onDragEnd = (e: DragEvent) => {
    e.target.style.opacity = "1.0"
}
</script>

<style scoped>
#tab {
    width: 100%;
    height: 100%;
    display: flex;
    border: 2px black solid;
    margin: 6px;
}

#server {
    width: 64px;
    height: 64px;
    background: black;
    margin: 20px;
}
</style>