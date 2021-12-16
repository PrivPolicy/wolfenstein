export class Color {
    private _value: number

    constructor(value: number | string) {
        if (typeof value === "number") {
            if (value >= 0 && value <= 16777215) {
                this._value = value;
            } else {
                throw new Error("Color value exceeds bounds");
            }
        } else {
            if (value.length !== 6) {
                throw new Error("Invalid HEX color");
            }
            if (value.match(/[^0-9a-f]+/ig) !== null) {
                throw new Error("Invalid HEX color");
            }

            this._value = parseInt(value, 16);
        }
    }

    get value() {
        return this._value;
    }

    get rgb() {
        return [(this._value & 0xff0000) >>> 16, (this._value & 0x00ff00) >>> 8, this._value & 0x0000ff]
    }

    get rgbNormalized() {
        return this.rgb.map(v => v / 255);
    }
}