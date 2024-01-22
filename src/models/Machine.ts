import { Machine as MachineAPI, MachineTypeEnum as MachineTypeEnumAPI, MachinesService } from "@/client"
import { Network } from "./Network"

export class Machine {
    refdata: MachineAPI

    x: number = 0
    y: number = 0
    highlighted: boolean = false

    private constructor(refdata: MachineAPI) {
        this.refdata = refdata
    }

    async destroy() {
        await MachinesService.machinesDestroy(this.refdata.id)
    }

    async attachNetwork(net: Network, addr: string) {
        await MachinesService.machinesAttachNetworkCreate(this.refdata.id, {
            network_id: net.refdata.id,
            ipaddr: addr
        })
    }

    async detachNetwork(net: Network) {
        await MachinesService.machinesDettachNetworkCreate(this.refdata.id, {
            network_id: net.refdata.id
        })
    }

    static async create(type: MachineTypeEnumAPI, name: string, description?: string) {
        const machineApi = await MachinesService.machinesCreate({
            id: "",
            container_id: "",
            owner: 0,
            machine_type: type,
            name: name,
            description: description
        })
        return new Machine(machineApi)
    }

    static async list() {
        const machines = await MachinesService.machinesList()
        return machines.map((machine) => {
            return new Machine(machine)
        })
    }
}