export class NetworkEdge {
    networkId?: string
    machineId?: string
    
    highlighted = false

    constructor(networkId?: string, machineId?: string) {
        this.networkId = networkId
        this.machineId = machineId
    }
}