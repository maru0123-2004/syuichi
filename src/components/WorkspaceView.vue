<template>
    <div id="workspace-view" ref="view"
    @dragover="onDragOver" @drop="onDrop">
        <v-stage :config="myState.stageConfig" @contextmenu="contextMenu?.show($event.evt)">
            <v-layer ref="layer">
                <ComponentMachine v-for="(machine, key) in machines" :key="key"
                v-model="machines[key]"/>
                <ComponentNetwork v-for="(network, key) in networks" :key="key"
                v-model="networks[key]"/>
            </v-layer>
        </v-stage>
        <ContextMenu ref="contextMenu" :menu="menu" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from 'vue'
import { Machine } from '../models/Machine'
import { Network } from '../models/Network'
import ComponentMachine from './ComponentMachine.vue'
import ComponentNetwork from './ComponentNetwork.vue'
import ContextMenu from './ContextMenu.vue'

const view = ref<HTMLElement>()
const contextMenu = ref<InstanceType<typeof ContextMenu>>()

const machineCount = new Map<string, number>()
const machines = reactive(new Array<Machine>())
const networks = reactive(new Array<Network>())

const menu = reactive([
    {
        label: 'connect',
        action: () => {
            console.log('connect')
        }
    },
    {
        label: 'delete',
        action: () => {
            console.log('delete')
        }
    }
])

const myState = reactive({
    stageConfig: computed(() => {
        return {
            width: view.value?.clientWidth,
            height: view.value?.clientHeight
        }
    })
})

function getServerId(serverType: string) {
    const id = machineCount.get(serverType) ?? 1
    machineCount.set(serverType, id + 1)
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

    if(serverType == "NETWORK") {
        let network = new Network("a", 0, 0);
        network.x = e.clientX - 25
        network.y = e.clientY - 25
        networks.push(network)
    }
    else {
        const serverId = serverType + getServerId(serverType)
        let server = new Machine(serverId)
        server.x = e.clientX - 25
        server.y = e.clientY - 25
        machines.push(server)
    }
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