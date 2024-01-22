import { AttachNetwork, Machine as MachineAPI, MachineTypeEnum as MachineTypeEnumAPI, MachinesService } from "@/client"
import { Network } from "./Network"

export class Machine {
    refdata: MachineAPI

    highlighted: boolean = false

    get x() {
        return this.refdata.x ?? 0
    }

    set x(value: number) {
        this.refdata.x = value
    }

    get y() {
        return this.refdata.y ?? 0
    }

    set y(value: number) {
        this.refdata.y = value
    }

    private constructor(refdata: MachineAPI) {
        this.refdata = refdata
    }

    async save() {
        await MachinesService.machinesPartialUpdate(this.refdata.id, {
            // name: this.refdata.name,
            // description: this.refdata.description,
            x: this.refdata.x,
            y: this.refdata.y
        } as MachineAPI)
    }

    async destroy() {
        await MachinesService.machinesDestroy(this.refdata.id)
    }

    async attachNetwork(net: Network, addr?: string) {
        await MachinesService.machinesAttachNetworkCreate(this.refdata.id, {
            network_id: net.refdata.id,
            ipaddr: addr
        } as AttachNetwork)
    }

    async detachNetwork(net: Network) {
        await MachinesService.machinesDettachNetworkCreate(this.refdata.id, {
            network_id: net.refdata.id
        })
    }

    static async create(type: MachineTypeEnumAPI, name: string, description?: string, x?: number, y?: number) {
        const machineApi = await MachinesService.machinesCreate({
            machine_type: type,
            name: name,
            description: description,
            x: x,
            y: y
        } as MachineAPI)
        return new Machine(machineApi)
    }

    static async list() {
        const machines = await MachinesService.machinesList()
        return machines.map((machine) => {
            return new Machine(machine)
        })
    }
}