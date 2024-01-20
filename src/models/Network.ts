import { NetworksService, Network as NetworkAPI } from "@/client"
import { NetworkEdge } from "./NetworkEdge"

export class Network {
    refdata: NetworkAPI

    name = ""
    description = ""

    x: number = 0
    y: number = 0
    highlighted: boolean = false

    private constructor(refdata: NetworkAPI) {
        this.refdata = refdata
    }

    getEdges() {
        return this.refdata.machines.map((machine) => {
            return new NetworkEdge(this.refdata.id, machine)
        })
    }

    async destroy() {
        await NetworksService.networksDestroy(this.refdata.id)
    }

    static async create(networkCIDR: string, name: string, description?: string) {
        const networkApi = await NetworksService.networksCreate({
            id: "",
            network_id: "",
            gateway: "",
            owner: 0,
            machines: [],
            network: networkCIDR,
            name: name,
            description: description
        })
        return new Network(networkApi)
    }

    static async list() {
        const networks = await NetworksService.networksList()
        return networks.map((network) => {
            return new Network(network)
        })
    }
}