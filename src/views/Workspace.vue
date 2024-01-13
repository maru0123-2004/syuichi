<template>
    <div id="workspace">
        <WorkspaceEditor></WorkspaceEditor>
    </div>
</template>

<script lang="ts" setup>
import WorkspaceEditor from "../components/WorkspaceEditor.vue"
</script>

<style>
#workspace {
    width: 100vw;
    height: 100vh;
}

html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>