import { Screen } from "./Screen"

export class ScreenFizzleFade extends Screen {
    private pixels: ImageData;
    private width: number;
    private height: number;
    private frame: number;

    constructor(props: { context: CanvasRenderingContext2D, width: number, height: number }) {
        super("screen_fizzle_fade", props);
        this._autoClear = false;

        this.width = props.width;
        this.height = props.height;

        this.frame = 0;

        this.pixels = props.context.createImageData(this.width, this.height);
    }

    render(c: CanvasRenderingContext2D, delta: number): void {
        for (let j = 0; j < 20000 * delta; j++) {
            if (this.frame == 65536) break;

            let fn = this.feistelNet(this.frame);
            let x = fn % this.width;
            let y = Math.floor(fn / this.width) * 4;
            if (x < this.width && y < this.height) {
                this.setPixel(x, y);
                this.setPixel(x, y + 1);
                this.setPixel(x, y + 2);
                this.setPixel(x, y + 3);
            }
            this.frame++;
        }

        c.putImageData(this.pixels, 0, 0);
    }

    onMount(): void {
        this.pixels = this.props.context.createImageData(this.width, this.height);
        this.frame = 0;
    }

    private setPixel(x: number, y: number) {
        if (x < this.width && y < this.height) {
            let offset = x * 4 + y * 4 * this.width;

            this.pixels.data[offset + 0] = 255;
            this.pixels.data[offset + 1] = 0;
            this.pixels.data[offset + 2] = 0;
            this.pixels.data[offset + 3] = 255;
        }
    }

    private feistelNet(input: number): number {
        let l = input & 0xff;
        let r = input >> 8;
        for (let i = 0; i < 8; i++) {
            let nl = r;
            let F = (((r * 11) + (r >> 5) + 7 * 127) ^ r) & 0xff;
            r = l ^ F;
            l = nl;
        }
        return ((r << 8) | l) & 0xffff;
    }
}