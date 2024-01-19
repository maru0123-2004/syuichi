export class NetworkEdge {
    networkId?: string
    machineId?: string

    constructor(networkId: string | undefined, machineId: string | undefined) {
        this.networkId = networkId
        this.machineId = machineId
    }
}