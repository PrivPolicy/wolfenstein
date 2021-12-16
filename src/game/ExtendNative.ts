interface Number {
    toRad: () => number
    toDeg: () => number
    isBetween(a: number, b: number): boolean
}

Number.prototype.toDeg = function () {
    return this.valueOf() * 180 / Math.PI;
}

Number.prototype.toRad = function () {
    return this.valueOf() * Math.PI / 180;
}

Number.prototype.isBetween = function (a: number, b: number): boolean {
    return this.valueOf() - Math.min(a, b) > -0.0001 && this.valueOf() - Math.max(a, b) < 0.0001;
}

interface Math {
    sign2(x: number): number
    clamp(min: number, max: number, value: number): number
}

Math.sign2 = function (x: number): number {
    return x < 0 ? -1 : 1;
}

Math.clamp = function (min: number, max: number, value: number): number {
    return Math.min(Math.max(value, min), max);
}

interface Array<T> {
    random(): T
    randomN(n: number): T[]
}

Array.prototype.random = function () {
    if (this.length === 0) {
        throw new Error("Cannot return item from empty array.");
    }

    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.randomN = function (n: number) {
    if (n > this.length) {
        throw new Error("Cannot return more items than there are in the array.");
    }

    let output: any[] = [];

    while (output.length < n) {
        let random = this.random();

        if (output.includes(random) === false) {
            output.push(random);
        }
    }

    return output;
};