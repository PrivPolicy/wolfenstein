import { Texture } from "./Texture";
import { TextureAnimated } from "./TextureAnimated";

export class Animator {
    private _texture: TextureAnimated | null;
    private _elapsedTime: number;
    onAnimationEnd: Function;
    onFramePlayed: (index: number, name?: string) => void;

    constructor(texture: TextureAnimated | null) {
        this._texture = texture;
        this._elapsedTime = 0;
        this.onAnimationEnd = () => { }
        this.onFramePlayed = () => { }

        if (this._texture !== null) {
            this._texture.onAnimationEnd = () => { this.onAnimationEnd() }
            this._texture.onFramePlayed = (index: number, name?: string) => { this.onFramePlayed(index, name) }
        }
    }

    get(delta: number, conditionalVariable = 0): Texture | null {
        if (this._texture === null) {
            return null;
        } else {
            this._elapsedTime = this._elapsedTime + delta;

            let item = this._texture.get(this._elapsedTime, conditionalVariable);
            return item;
        }
    }

    changeTexture(texture: TextureAnimated, resetTime: boolean = true) {
        this._texture = texture;

        if (texture !== null) {
            texture.onAnimationEnd = () => { this.onAnimationEnd() }
            texture.onFramePlayed = (index: number, name?: string) => { this.onFramePlayed(index, name) }
        }

        if (resetTime) {
            this._elapsedTime = 0;
        }
    }
}