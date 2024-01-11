<template>
    <div id="editor">
        <div>
            <WorkspaceView></WorkspaceView>
        </div>
        <div>
            <WorkspaceComponentsTab></WorkspaceComponentsTab>
        </div>
    </div>
</template>

<script lang="ts" setup>
import WorkspaceView from '../components/WorkspaceView.vue'
import WorkspaceComponentsTab from '../components/WorkspaceComponentsTab.vue'
</script>

<style scoped>
#editor {
    width: 100%;
    height: 100%;
    padding: 6px;

    > div:not(:last-child) {
        width: 100%;
        height: 80%;
        padding-bottom: 6px;
    }
    > div:last-child {
        width: 100%;
        height: 20%;
    }
}
</style>