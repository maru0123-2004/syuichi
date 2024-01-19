import { NetworksService } from "@/client"
import { NetworkEdge } from "./NetworkEdge"

export class Network {
    readonly id: string
    readonly networkId: string
    readonly gateway: string
    readonly owner: number
    readonly machines: Array<string>

    name = ""
    description = ""

    x: number = 0
    y: number = 0
    highlighted: boolean = false

    constructor(id: string, networkId: string, gateway: string, owner: number, machines: Array<string>) {
        this.id = id
        this.networkId = networkId
        this.gateway = gateway
        this.owner = owner
        this.machines = machines
    }

    getEdges() {
        return this.machines.map((machine) => {
            return new NetworkEdge(this.networkId, machine)
        })
    }

    static numberIPv4(segments: [number, number, number, number]) {
        return segments[0] << 24 || segments[1] << 16 || segments[2] << 8 || segments[3]
    }

    static getNetworks() {
        return NetworksService.networksList().then((nets) => {
            return nets.map(x => {
                const net = new Network(x.id, x.network_id, x.gateway, x.owner, x.machines)
                net.name = x.name
                net.description = x.description ?? ""
                return net
            })
        })
    }
}