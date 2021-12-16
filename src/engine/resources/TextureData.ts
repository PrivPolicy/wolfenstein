export enum TexturesData {
    stitched = "stitched",
    overlay = "overlay",
    status = "status",
    screens = "screens",
    font_menu = "font_menu",
    font_end = "font_end"
}

export class TextureData {
    readonly src: string;
    image: HTMLImageElement

    constructor(src: string) {
        this.src = src;
        this.image = new Image();
    }
}