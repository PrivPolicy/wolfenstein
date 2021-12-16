export class Option {
    readonly x: number;
    readonly y: number;
    readonly text: string;
    readonly onSelect: Function;
    enabled: boolean;

    constructor(x: number, y: number, text: string, enabled: boolean = false, onSelect: () => void = () => { }) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.enabled = enabled;
        this.onSelect = onSelect;

    }
}