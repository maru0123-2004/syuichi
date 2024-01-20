<template>
    <div id="workspace-view" ref="view" tabindex="1"
    @dragover="onDragOver" @drop="onDrop"
    @keydown.escape="deleteConnectingNetworkEdge">
        <v-stage :config="stageConfig" 
        @contextmenu="onContextMenu($event.evt)"
        @mousemove="onMouseMove($event.evt)"
        @click="onClickStage($event.evt)">
            <v-layer ref="layer">
                <ComponentNetworkEdge v-for="(edge, index) in networkEdges" :key="index" ref="networkEdgeComponents"
                :network="getNetworkComponent(edge.value.networkId)"
                :machine="getMachineComponent(edge.value.machineId)"
                :mouse-x="mouseX"
                :mouse-y="mouseY"/>
                <ComponentMachine v-for="(machine, index) in machines" :key="machine.value.refdata.id" ref="machineComponents"
                v-model="machines[index].value"
                @selected="onComponentSelected(machines[index].value)"
                @unselected="onComponentUnselected(machines[index].value)"/>
                <ComponentNetwork v-for="(network, index) in networks" :key="network.value.refdata.id" ref="networkComponents"
                v-model="networks[index].value"
                @selected="onComponentSelected(networks[index].value)"
                @unselected="onComponentUnselected(networks[index].value)"/>
            </v-layer>
        </v-stage>
        <ContextMenu ref="contextMenu" :menu="menu" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, Ref, onMounted } from 'vue'
import { Machine, MachineType } from '../models/Machine'
import { Network } from '../models/Network'
import { NetworkEdge } from '../models/NetworkEdge'

import ContextMenu from './ContextMenu.vue'
import ComponentMachine from './ComponentMachine.vue'
import ComponentNetwork from './ComponentNetwork.vue'
import ComponentNetworkEdge from './ComponentNetworkEdge.vue'

type CompMachine = InstanceType<typeof ComponentMachine>
type CompNetwork = InstanceType<typeof ComponentNetwork>
type CompNetworkEdge = InstanceType<typeof ComponentNetworkEdge>
type CompContextMenu = InstanceType<typeof ContextMenu>

const view = ref<HTMLElement>()
const contextMenu = ref<CompContextMenu>()
const machineComponents = ref(Array<CompMachine>())
const networkComponents = ref(Array<CompNetwork>())
const networkEdgeComponents = ref(Array<CompNetworkEdge>())

const networkCount = ref(1);
const selectedComponent = ref<Machine | Network>()
const machineCount = new Map<string, number>()
const machines = ref(new Array<Ref<Machine>>())
const networks = ref(new Array<Ref<Network>>())
const networkEdges = ref(new Array<Ref<NetworkEdge>>())
const connectingNetworkEdge = ref<NetworkEdge>()
const mouseX = ref(0)
const mouseY = ref(0)
const stageConfig = ref({
    width: view.value?.clientWidth,
    height: view.value?.clientHeight
})

onMounted(() => {
    focus()
    const resizeObserver = new ResizeObserver(()=>{
        stageConfig.value.height = view.value?.clientHeight
        stageConfig.value.width = view.value?.clientWidth
        console.log(stageConfig.value)
    })
    if (view.value){
        resizeObserver.observe(view.value)
    }
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
    if(!serverType) {
        return
    }

    if(serverType == "NETWORK") {
        Network.create("192.168." + networkCount.value + ".0/24", "Network " + networkCount.value).then((network) => {
            network.x = e.clientX - 25
            network.y = e.clientY - 25
            networks.value.push(ref(network))
            networkCount.value++
        })
    }
    else {
        const machineType = MachineType.WEB
        Machine.create(machineType, "WEB Server " + getServerId("WEB")).then((machine) => {
            machine.x = e.clientX - 25
            machine.y = e.clientY - 25
            machines.value.push(ref(machine))
        })
    }
}

const onContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    if(selectedComponent.value != undefined) {
        contextMenu.value?.show(e)
    }
}

const onMouseMove = (e: MouseEvent) => {
    mouseX.value = e.offsetX
    mouseY.value = e.offsetY
}

const onClickConnectNetwork = () => {
    if(selectedComponent.value) {
        if(connectingNetworkEdge.value) {
            deleteConnectingNetworkEdge()
        }
        const networkEdge = ref(new NetworkEdge())
        if(selectedComponent.value instanceof Machine) {
            networkEdge.value.machineId = selectedComponent.value.refdata.id
        }
        else if(selectedComponent.value instanceof Network) {
            networkEdge.value.networkId = selectedComponent.value.refdata.id
        }
        networkEdges.value.push(networkEdge)
        connectingNetworkEdge.value = networkEdge.value
        selectedComponent.value.highlighted = false
        selectedComponent.value = undefined
    }
}

const onClickDeleteComponent = () => {
    if(selectedComponent.value) {
        if(selectedComponent.value instanceof Machine) {
            machines.value = machines.value.filter(x => x.value.refdata.id != selectedComponent.value?.refdata.id)
            networkEdges.value = networkEdges.value.filter(x => x.value.machineId != selectedComponent.value?.refdata.id)
            selectedComponent.value.destroy()
        }
        else if(selectedComponent.value instanceof Network) {
            networks.value = networks.value.filter(x => x.value.refdata.id != selectedComponent.value?.refdata.id)
            networkEdges.value = networkEdges.value.filter(x => x.value.networkId != selectedComponent.value?.refdata.id)
            selectedComponent.value.destroy()
        }
    }
}

const onComponentSelected = (comp: Machine | Network) => {
    if(contextMenu.value == undefined || contextMenu.value.isShowing.value) {
        return
    }
    selectedComponent.value = comp
    selectedComponent.value.highlighted = true
}

const onComponentUnselected = (comp: Machine | Network) => {
    if(contextMenu.value == undefined || contextMenu.value.isShowing.value) {
        return
    }
    comp.highlighted = false
    selectedComponent.value = undefined
}

const onClickStage = (e: MouseEvent) => {
    if(e.button == 0) {
        if(connectingNetworkEdge.value && selectedComponent.value ) {
            if(connectingNetworkEdge.value.machineId && selectedComponent.value instanceof Network) {
                connectingNetworkEdge.value.networkId = selectedComponent.value.refdata.id
                connectingNetworkEdge.value = undefined
            }
            else if(connectingNetworkEdge.value.networkId && selectedComponent.value instanceof Machine) {
                connectingNetworkEdge.value.machineId = selectedComponent.value.refdata.id
                connectingNetworkEdge.value = undefined
            }
        }
    }
}

const onKeyDown = (e: KeyboardEvent) => {
}

const deleteConnectingNetworkEdge = () => {
    if(connectingNetworkEdge.value) {
        networkEdges.value = networkEdges.value.filter(x => 
            x.value.machineId != connectingNetworkEdge.value?.machineId ||
            x.value.networkId != connectingNetworkEdge.value?.networkId
        )
        connectingNetworkEdge.value = undefined
    }
}

const getMachineComponent = (id: string | undefined) => {
    return machineComponents.value.find((x) => x.model.refdata.id == id)
}

const getNetworkComponent = (id: string | undefined) => {
    return networkComponents.value.find((x) => x.model.refdata.id == id)
}

const menu = reactive([
    {
        label: 'ネットワークを接続',
        action: onClickConnectNetwork
    },
    {
        label: '削除',
        action: onClickDeleteComponent
    }
])

const focus = () => {
    view.value?.focus()
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