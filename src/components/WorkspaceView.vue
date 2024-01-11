<template>
    <div id="workspace-view" ref="view"
    @dragover="onDragOver" @drop="onDrop">
        <v-stage :config="myState.stageConfig">
            <v-layer ref="layer">
                <v-group  v-for="server in servers" :key="server.id"
                :config="{
                    x: server.x,
                    y: server.y,
                    draggable: true
                }">
                    <v-rect :config="{
                        width: 50,
                        height: 50,
                        fill: 'black'
                    }"></v-rect>
                    <v-text :config="{
                        x: 0,
                        y: 60,
                        width: 50,
                        text: server.id,
                        align: 'center'
                    }">
                    </v-text>
                </v-group>
            </v-layer>
        </v-stage>
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, watch } from 'vue'
import { Layer } from 'konva/lib/Layer';
import { Server } from '../models/Server.ts'

const view = ref<HTMLElement>()

const serverCount = new Map<string, number>()
const servers = reactive(new Array<Server>())

const myState = reactive({
    stageConfig: computed(() => {
        return {
            width: view.value?.clientWidth,
            height: view.value?.clientHeight
        }
    })
})

function getServerId(serverType: string) {
    const id = serverCount.get(serverType) ?? 1
    serverCount.set(serverType, id + 1)
    return id
}

const onDragOver = (e: DragEvent) => {
    e.preventDefault()
}

const onDrop = (e: DragEvent) => {
    e.preventDefault()
    const serverType = e.dataTransfer?.getData("text/plain")
    console.log(serverType)
    if(!serverType) {
        return
    }

    const serverId = serverType + getServerId(serverType)
    let server = new Server(serverId)
    server.x = e.clientX - 25
    server.y = e.clientY - 25
    servers.push(server)
}
</script>

<style>
#workspace-view {
    width: 100%;
    height: 100%;
    border: 2px black solid;
    box-sizing: border-box;
}

#stage {
    width: 100%;
    height: 100%;
}
</style>