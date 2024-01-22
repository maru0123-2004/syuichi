import { NetworksService, Network as NetworkAPI } from "@/client"
import { NetworkEdge } from "./NetworkEdge"

export class Network {
    refdata: NetworkAPI

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

    private constructor(refdata: NetworkAPI) {
        this.refdata = refdata
    }

    getEdges() {
        return this.refdata.machines.map((machine) => {
            return new NetworkEdge(this.refdata.id, machine)
        })
    }

    async save() {
        await NetworksService.networksPartialUpdate(this.refdata.id, {
            // network: this.refdata.network,
            name: this.refdata.name,
            description: this.refdata.description,
            x: this.refdata.x,
            y: this.refdata.y
        } as NetworkAPI)
    }

    async destroy() {
        await NetworksService.networksDestroy(this.refdata.id)
    }

    static async create(networkCIDR: string, name: string, description?: string, x?: number, y?: number) {
        const networkApi = await NetworksService.networksCreate({
            network: networkCIDR,
            name: name,
            description: description,
            x: x,
            y: y
        } as NetworkAPI)
        return new Network(networkApi)
    }

    static async list() {
        const networks = await NetworksService.networksList()
        return networks.map((network) => {
            return new Network(network)
        })
    }
}