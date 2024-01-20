export class NetworkEdge {
    networkId?: string
    machineId?: string

    constructor(networkId?: string, machineId?: string) {
        this.networkId = networkId
        this.machineId = machineId
    }
}