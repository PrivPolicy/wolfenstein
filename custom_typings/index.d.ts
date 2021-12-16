declare module "*.frag" {
    const value: string;
    export default value;
}

declare module "*.vert" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.json" {
    const value: import("../src/game/Builder").LevelData;
    export default value;
}

declare module "*.wav" {
    const value: string;
    export default value;
}

declare module "*.mp3" {
    const value: string;
    export default value;
}