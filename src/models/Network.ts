export class Network {
    id: string

    netAddr: number
    netMask: number

    ipAddrs = new Map<string, number>()

    x: number = 0
    y: number = 0

    constructor(id: string, netAddr: number, netMask: number) {
        this.id = id
        this.netAddr = netAddr
        this.netMask = netMask
    }
}