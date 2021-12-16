export abstract class Screen {
    readonly name: string;
    readonly props: any;
    protected _autoClear: boolean;

    constructor(name: string, props: any) {
        this.name = name;
        this.props = props;
        this._autoClear = true;
    }

    get autoClear() {
        return this._autoClear;
    }

    abstract render(c: CanvasRenderingContext2D, delta: number, data?: Object): void

    onMount() { }
    onUnmount() { }
    onKeyDown(code: string) { }
}