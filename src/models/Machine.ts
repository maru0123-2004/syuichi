export class Machine {
    id: string

    x: number = 0
    y: number = 0

    nets = new Array<string>

    constructor(id: string) {
        this.id = id
    }
}