import { Animator } from "../engine/resources/Animator";
import { TextureLike } from "../engine/resources/Resources";
import { Texture } from "../engine/resources/Texture";
import { TextureAnimated } from "../engine/resources/TextureAnimated";
import { TextureConditional } from "../engine/resources/TextureConditional";

export class StateMachine {
    private readonly _states: StateMachineItem[];
    private _currentState: StateMachineItem;
    private _animator: Animator;

    constructor(...states: StateMachineItem[]) {
        this._states = states;
        this._currentState = states[0];
        this._animator = new Animator(null);
        this._animator.onAnimationEnd = () => {
            this.changeState(this._currentState.next);
        }
    }

    set onFramePlayed(v: (index: number, name?: string) => void) {
        this._animator.onFramePlayed = v;
    }

    get currentState() {
        return this._currentState;
    }

    get currentStateName() {
        return this._currentState.name;
    }

    getTexture(delta: number = 0, conditionalValue: number = 0): Texture | null {
        let tex = this._currentState.texture;

        if (tex instanceof Texture) {
            return tex;
        } else if (tex instanceof TextureConditional) {
            return tex.get(conditionalValue);
        } else {
            return this._animator.get(delta, conditionalValue);
        }
    }

    changeState(name: string | null, resetTime = true) {
        let state = this._states.find(v => v.name === name);

        if (state !== undefined) {
            this._currentState = state;

            if (state.texture instanceof TextureAnimated) {
                this._animator.changeTexture(state.texture, resetTime);
            }
        }
    }

    hasState(name: string) {
        return this._states.some(v => v.name === name);
    }
}

export class StateMachineItem {
    readonly name: string;
    readonly texture: TextureLike;
    readonly next: string | null;

    constructor(name: string, texture: TextureLike, next: string | null = null) {
        this.name = name;
        this.texture = texture;
        this.next = next;
    }
}