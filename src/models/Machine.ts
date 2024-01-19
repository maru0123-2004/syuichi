import { MachinesService, MachineTypeEnum } from "@/client"

export type MachineType = "WEB" | "SMTP" | "DNS"

export class Machine {
    readonly id: string
    readonly container_id: string
    readonly owner: number

    name = ""
    type: MachineType = "WEB"

    x: number = 0
    y: number = 0
    highlighted: boolean = false

    constructor(id: string, containerId: string, owner: number) {
        this.id = id
        this.container_id = containerId
        this.owner = owner
    }

    static getMachines() {
        return MachinesService.machinesList().then((machines) => {
            return machines.map(x => {
                const machine = new Machine(x.id, x.container_id, x.owner)
                machine.name = x.name
                machine.type = this.fromAPIType(x.machine_type)
                return machine
            })
        })
    }

    static fromAPIType(type: MachineTypeEnum): MachineType {
        switch(type) {
            case MachineTypeEnum.DNS:
                return "DNS"
            case MachineTypeEnum.SMTP:
                return "SMTP"
            case MachineTypeEnum.WEB:
                return "WEB"
        }
    }
}