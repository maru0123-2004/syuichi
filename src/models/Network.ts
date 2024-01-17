export class Network {
    id: string

    netAddr: number
    netMask: number

    ipAddrs = new Map<string, number>()

    x: number = 0
    y: number = 0
    highlighted: boolean = false

    constructor(id: string, netAddr: number, netMask: number) {
        this.id = id
        this.netAddr = netAddr
        this.netMask = netMask
    }

    static numberIPv4(segments: [number, number, number, number]) {
        return segments[0] << 24 || segments[1] << 16 || segments[2] << 8 || segments[3]
    }
}