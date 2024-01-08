<template>
    <div>
        <canvas id="workspace-view"
        @dragover="onDragOver" @drop="onDrop"></canvas>
    </div>
</template>

<script lang="ts" setup>
const onDragOver = (e: DragEvent) => {
    e.preventDefault()
}

const onDrop = (e: DragEvent) => {
    e.preventDefault()
    const data = e.dataTransfer?.getData("text/plain")
    console.log(data)
}
</script>

<style>
#workspace-view {
    width: 100%;
    height: 100%;
    margin: 6px;
    border: 2px black solid;
}
</style>