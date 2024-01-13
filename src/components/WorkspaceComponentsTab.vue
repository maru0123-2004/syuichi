<template>
    <div id="tab">
        <div id="server" draggable="true" data-type="HTML" @dragstart="onDragStart" @dragend="onDragEnd"></div>
        <div id="server" draggable="true" data-type="DNS" @dragstart="onDragStart" @dragend="onDragEnd"></div>
        <div id="server" draggable="true" data-type="FILE" @dragstart="onDragStart" @dragend="onDragEnd"></div>
        <div id="network" draggable="true" data-type="NETWORK" @dragstart="onDragStart" @dragend="onDragEnd"></div>
    </div>
</template>

<script lang="ts" setup>
const onDragStart = (e: DragEvent) => {
    const el = e.target as HTMLElement | null
    const serverType = el?.dataset.type
    if(serverType && el) {
        e.dataTransfer?.setData("text/plain", serverType)
        el.style.opacity = "0.5"
    }
}

const onDragEnd = (e: DragEvent) => {
    const el = e.target as HTMLElement | null
    if(el) {
        el.style.opacity = "1.0"
    }
}
</script>

<style scoped>
#tab {
    width: 100%;
    height: 100%;
    display: flex;
    border: 2px black solid;
    box-sizing: border-box;
}

#server {
    width: 64px;
    height: 64px;
    background: black;
    margin: 20px;
}

#network {
    width: 64px;
    height: 64px;
    background: skyblue;
    margin: 20px;
}
</style>