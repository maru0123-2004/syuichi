export class Network {
    id: string

    netAddr: number
    netMask: number

    x: number = 0
    y: number = 0

    constructor(id, netAddr, netMask) {
        this.id = id
        this.netAddr = netAddr
        this.netMask = netMask
    }
}