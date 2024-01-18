export type MachineType = "WEB" | "SMTP" | "DNS"

export class Machine {
    id: string
    type: MachineType = "WEB"

    x: number = 0
    y: number = 0

    nets = new Array<string>

    highlighted: boolean = false

    constructor(id: string) {
        this.id = id
    }
}