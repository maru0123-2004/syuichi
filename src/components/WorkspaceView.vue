<template>
    <div id="workspace-view" ref="view" tabindex="1"
    @dragover="onDragOver($event)" @drop="onDrop"
    @keydown.escape="deleteConnectingNetworkEdge"
    @mousemove="onMouseMove($event)">
        <v-stage ref="stageComponent" :config="stageConfig"
        @contextmenu="onContextMenu($event.evt)"
        @click="onClickStage($event.evt)"
        @dblclick="onDoubleClick">
            <v-layer>
                <ComponentNetworkEdge v-for="(edge, index) in networkEdges" :key="index" ref="networkEdgeComponents"
                :network="getNetworkComponent(edge.value.networkId)"
                :machine="getMachineComponent(edge.value.machineId)"
                :mouse-x="mouseData.clientX"
                :mouse-y="mouseData.clientY"
                @selected="onComponentSelected(networkEdges[index].value)"
                @unselected="onComponentUnselected(networkEdges[index].value)" />
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
        <WorkspaceSettingDialog ref="settingDialogComponent" v-model="showingSettingDialog"/>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref, onMounted } from 'vue'
import router from '@/router'
import { MachineTypeEnum } from '@/client'
import { Stage } from 'konva/lib/Stage'

import { Machine } from '../models/Machine'
import { Network } from '../models/Network'
import { NetworkEdge } from '../models/NetworkEdge'

import ContextMenu from './ContextMenu.vue'
import ComponentMachine from './ComponentMachine.vue'
import ComponentNetwork from './ComponentNetwork.vue'
import ComponentNetworkEdge from './ComponentNetworkEdge.vue'
import { checkAuthorized, loadFromCookie } from '@/utils/AuthUtils'
import WorkspaceSettingDialog from './WorkspaceSettingDialog.vue'

type CompMachine = InstanceType<typeof ComponentMachine>
type CompNetwork = InstanceType<typeof ComponentNetwork>
type CompNetworkEdge = InstanceType<typeof ComponentNetworkEdge>
type CompContextMenu = InstanceType<typeof ContextMenu>
type CompSettingDialog = InstanceType<typeof WorkspaceSettingDialog>

const view = ref<HTMLElement>()
const stageComponent = ref<{getStage(): Stage}>()
const contextMenu = ref<CompContextMenu>()
const machineComponents = ref(Array<CompMachine>())
const networkComponents = ref(Array<CompNetwork>())
const networkEdgeComponents = ref(Array<CompNetworkEdge>())
const settingDialogComponent = ref<CompSettingDialog>()

const selectedComponent = ref<Machine | Network | NetworkEdge>()
const machines = ref(new Array<Ref<Machine>>())
const networks = ref(new Array<Ref<Network>>())
const networkEdges = ref(new Array<Ref<NetworkEdge>>())
const connectingNetworkEdge = ref<NetworkEdge>()
const showingSettingDialog = ref(false)

const mouseData = ref({
    offsetX: 0,
    offsetY: 0,
    clientX: 0,
    clientY: 0
})

const stageConfig = ref({
    width: view.value?.clientWidth,
    height: view.value?.clientHeight,
    // draggable: true
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

    if(!(await loadFromCookie()) || !(await checkAuthorized())) {
        router.push("/")
        return
    }

    loadWorkspace()
})

const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    onMouseMove(e)
}

const onDrop = (e: DragEvent) => {
    e.preventDefault()
    const serverType = e.dataTransfer?.getData("text/plain")
    if(!serverType) {
        return
    }

    const stage = stageComponent.value?.getStage()

    showingSettingDialog.value = true

    const x = mouseData.value.offsetX - (stage?.x() ?? 0)
    const y = mouseData.value.offsetY - (stage?.y() ?? 0)

    if(serverType == "NETWORK") {
        const network = findUnusedNetworkAddress()
        settingDialogComponent.value?.setItems([
            {
                label: "ネットワーク名",
                id: "name",
                type: "string",
            },
            {
                label: "ネットワークアドレス",
                id: "network",
                type: "string",
            },
            {
                label: "説明",
                id: "description",
                type: "string"
            },
        ])
        settingDialogComponent.value?.setValue({
            network: network,
            name: "Network " + network
        })
        settingDialogComponent.value?.setTitle("ネットワークを作成")
        settingDialogComponent.value?.show((result: any) => {
            const netaddr = result["network"]
            const name = result["name"]
            const description = result["description"] == "" ? undefined : result["description"]
            Network.create(netaddr, name, description, x, y).then((network) => {
                networks.value.push(ref(network))
            })  
        })
    }
    else if(
        serverType == MachineTypeEnum.WEB ||
        serverType == MachineTypeEnum.DNS ||
        serverType == MachineTypeEnum.SMTP
    ) {
        settingDialogComponent.value?.setItems([
            {
                label: "サーバー名",
                id: "name",
                type: "string"
            },
            {
                label: "サーバータイプ",
                id: "type",
                type: "enum",
                enumSelects: ["WEB", "DNS", "SMTP"]
            },
            {
                label: "説明",
                id: "description",
                type: "string"
            },
        ])
        settingDialogComponent.value?.setValue({
            type: serverType,
            name: findMachineName(serverType)
        })
        settingDialogComponent.value?.setTitle(serverType + "サーバーを作成")
        settingDialogComponent.value?.show((result: any) => {
            const type = result["type"]
            const name = result["name"]
            const description = result["description"] == "" ? undefined : result["description"]
            Machine.create(type, name, description, x, y).then((machine) => {
                machines.value.push(ref(machine))
            })  
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
            const comp = selectedComponent.value
            machines.value = machines.value.filter(x => x.value.refdata.id != comp.refdata.id)
            networkEdges.value = networkEdges.value.filter(x => x.value.machineId != comp.refdata.id)
            comp.destroy()
        }
        else if(selectedComponent.value instanceof Network) {
            const comp = selectedComponent.value
            Promise.all(networkEdges.value
                .filter(x => x.value.networkId == comp.refdata.id && x.value.machineId)
                .map(x => machines.value.find(m => m.value.refdata.id == x.value.machineId!)!.value.detachNetwork(networks.value.find(n => n.value.refdata.id == x.value.networkId!)?.value!))
            ).then(() => {
                networks.value = networks.value.filter(x => x.value.refdata.id != comp.refdata.id)
                networkEdges.value = networkEdges.value.filter(x => x.value.networkId != comp.refdata.id)
                comp.destroy()
            })
        }
        else if(selectedComponent.value instanceof NetworkEdge) {
            const networkId = selectedComponent.value.networkId ?? ""
            const machineId = selectedComponent.value.machineId ?? ""
            const network = networks.value.find(x => x.value.refdata.id == networkId)
            const machine = machines.value.find(x => x.value.refdata.id == machineId)
            if(network?.value && machine?.value) {
                machine.value.detachNetwork(network.value)
            }
            networkEdges.value = networkEdges.value.filter(x => x.value.networkId != networkId || x.value.machineId != machineId)
        }
        selectedComponent.value = undefined
    }
}

const onComponentSelected = (comp: Machine | Network | NetworkEdge) => {
    if(contextMenu.value == undefined || contextMenu.value.isShowing.value) {
        return
    }
    selectedComponent.value = comp
    selectedComponent.value.highlighted = true
}

const onComponentUnselected = (comp: Machine | Network | NetworkEdge) => {
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
        const nameCandidate = type + " Server " + i
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

const onDoubleClick = (e: any) => {
    if(selectedComponent.value) {
        if(selectedComponent.value instanceof Machine) {
            const comp = selectedComponent.value
            settingDialogComponent.value?.setTitle("サーバー設定")
            settingDialogComponent.value?.setItems([
                {
                    label: "サーバー名",
                    id: "name",
                    type: "string",
                    defaultValue: comp.refdata.name
                },
                {
                    label: "説明",
                    id: "description",
                    type: "string",
                    defaultValue: comp.refdata.description
                }
            ])
            settingDialogComponent.value?.show((result: any) => {
                comp.refdata.name = result["name"]
                comp.refdata.description = result["description"] == "" ? undefined : result["description"]
                comp.save()
            })
        }
        else if(selectedComponent.value instanceof Network) {
            const comp = selectedComponent.value
            settingDialogComponent.value?.setTitle("ネットワーク設定")
            settingDialogComponent.value?.setItems([
                {
                    label: "ネットワーク名",
                    id: "name",
                    type: "string",
                    defaultValue: comp.refdata.name
                },
                {
                    label: "説明",
                    id: "description",
                    type: "string",
                    defaultValue: comp.refdata.description
                }
            ])
            settingDialogComponent.value?.show((result: any) => {
                comp.refdata.name = result["name"]
                comp.refdata.description = result["description"] == "" ? undefined : result["description"]
                comp.save()
            })
        }
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