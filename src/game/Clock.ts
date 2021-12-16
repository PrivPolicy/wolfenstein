export class Clock {
    private currentTime: number

    constructor() {
        this.currentTime = Date.now();
    }

    time() {
        let delta = Date.now() - this.currentTime;
        this.currentTime = Date.now();

        return delta / 1000;
    }
}