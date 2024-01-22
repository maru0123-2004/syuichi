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
                :mouse-x="mouseData.clientX"
                :mouse-y="mouseData.clientY"/>
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
import { reactive, ref, Ref, onMounted } from 'vue'
import router from '@/router'
import { MachineTypeEnum, OpenAPI } from '@/client'

import { Machine } from '../models/Machine'
import { Network } from '../models/Network'
import { NetworkEdge } from '../models/NetworkEdge'

import ContextMenu from './ContextMenu.vue'
import ComponentMachine from './ComponentMachine.vue'
import ComponentNetwork from './ComponentNetwork.vue'
import ComponentNetworkEdge from './ComponentNetworkEdge.vue'
import { checkAuthorized, loadFromCookie } from '@/utils/AuthUtils'

type CompMachine = InstanceType<typeof ComponentMachine>
type CompNetwork = InstanceType<typeof ComponentNetwork>
type CompNetworkEdge = InstanceType<typeof ComponentNetworkEdge>
type CompContextMenu = InstanceType<typeof ContextMenu>

const view = ref<HTMLElement>()
const contextMenu = ref<CompContextMenu>()
const machineComponents = ref(Array<CompMachine>())
const networkComponents = ref(Array<CompNetwork>())
const networkEdgeComponents = ref(Array<CompNetworkEdge>())

const selectedComponent = ref<Machine | Network>()
const machines = ref(new Array<Ref<Machine>>())
const networks = ref(new Array<Ref<Network>>())
const networkEdges = ref(new Array<Ref<NetworkEdge>>())
const connectingNetworkEdge = ref<NetworkEdge>()
const mouseData = ref({
    offsetX: 0,
    offsetY: 0,
    clientX: 0,
    clientY: 0
})

const stageConfig = ref({
    width: view.value?.clientWidth,
    height: view.value?.clientHeight
})

onMounted(async () => {
    focus()
    const resizeObserver = new ResizeObserver(()=>{
        stageConfig.value.height = view.value?.clientHeight
        stageConfig.value.width = view.value?.clientWidth
    })
    if (view.value){
        resizeObserver.observe(view.value)
    }

    if(await loadFromCookie() && await checkAuthorized()) {
        router.push("/")
    }

    loadWorkspace()
})

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
        const network = findUnusedNetworkAddress()
        Network.create(network, "Network " + network).then((network) => {
            network.x = e.clientX - 25
            network.y = e.clientY - 25
            networks.value.push(ref(network))
        })
    }
    else if(
        serverType == MachineTypeEnum.WEB ||
        serverType == MachineTypeEnum.DNS ||
        serverType == MachineTypeEnum.SMTP
    ) {
        const type = serverType as MachineTypeEnum
        const name = findMachineName(type)
        console.log(type, name)
        Machine.create(type, name).then((machine) => {
            machine.x = e.clientX - 25
            machine.y = e.clientY - 25
            machines.value.push(ref(machine))
        })
    }
}

const onContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    if(selectedComponent.value != undefined) {
        contextMenu.value?.show(mouseData.value.clientX, mouseData.value.clientY, view.value)
    }
}

const onMouseMove = (e: MouseEvent) => {
    mouseData.value.offsetX = e.offsetX
    mouseData.value.offsetY = e.offsetY
    mouseData.value.clientX = e.clientX
    mouseData.value.clientY = e.clientY
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
        }
        else if(selectedComponent.value instanceof Network) {
            networks.value = networks.value.filter(x => x.value.refdata.id != selectedComponent.value?.refdata.id)
            networkEdges.value = networkEdges.value.filter(x => x.value.networkId != selectedComponent.value?.refdata.id)
        }
        selectedComponent.value.destroy()
        selectedComponent.value = undefined
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
                attachNetwork(
                    connectingNetworkEdge.value.machineId,
                    connectingNetworkEdge.value.networkId
                )
                connectingNetworkEdge.value = undefined
            }
            else if(connectingNetworkEdge.value.networkId && selectedComponent.value instanceof Machine) {
                connectingNetworkEdge.value.machineId = selectedComponent.value.refdata.id
                attachNetwork(
                    connectingNetworkEdge.value.machineId,
                    connectingNetworkEdge.value.networkId
                )
                connectingNetworkEdge.value = undefined
            }
        }
    }
}

const attachNetwork = (machineId?: string, networkId?: string) => {
    const machine = machines.value.find(x => x.value.refdata.id == machineId)
    const network = networks.value.find(x => x.value.refdata.id == networkId)
    if(machine && network && !network?.value.refdata.machines.includes(machine.value.refdata.id)) {
        machine?.value.attachNetwork(network?.value, "")
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

const loadWorkspace = async () => {
    const machinePromise = Machine.list().then((fetchedMachines) => {
        fetchedMachines.forEach((machine) => {
            machines.value.push(ref(machine))
        })
    })
    const networkPromise = Network.list().then(async (fetchedNetworks) => {
        fetchedNetworks.forEach((network) => {
            networks.value.push(ref(network))
        })
        await machinePromise
        fetchedNetworks.forEach((network) => {
            network.getEdges().forEach((edge) => {
                networkEdges.value.push(ref(edge))
            })
        })
    })
    await Promise.all([machinePromise, networkPromise])
}

const findMachineName = (type: MachineTypeEnum) => {
    let i = 1
    do {
        const nameCandidate = type + "_Server_" + i
        if(machines.value.every((machine) => {
            return nameCandidate != machine.value.refdata.name
        })) {
            return nameCandidate
        }

        i++
    }
    while(true)
}

const findUnusedNetworkAddress = () => {
    let i = 1
    while(true) {
        const addressCandidate = "192.168." + i + ".0/24"
        if(networks.value.every(network => addressCandidate != network.value.refdata.network)) {
            return addressCandidate
        }

        i++
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