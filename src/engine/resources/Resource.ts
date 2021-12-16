export class Resource {
    readonly src: string;
    data: string;

    constructor(src: string) {
        this.src = src;
        this.data = "";
    }
}