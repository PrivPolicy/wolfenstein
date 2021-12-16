import { Resources } from "../engine/resources/Resources";
import { Sounds } from "../engine/resources/Sound";

export interface SoundsPlaying {
    [x: string]: HTMLAudioElement | undefined
}

export class SoundEmitter {
    static instance = new SoundEmitter();

    private playing: SoundsPlaying;
    private _volume: number;

    constructor() {
        this.playing = {};
        this._volume = 1;
    }

    get volume() {
        return this._volume;
    }

    set volume(volume: number) {
        for (const id in this.playing) {
            let element = this.playing[id];

            if (element !== undefined) {
                element.volume = volume;
            }
        }

        this._volume = Math.clamp(0, 1, volume);
    }

    play(sound: Sounds, loop = false, volume = this._volume): string {
        let id = SoundEmitter.generateSoundIdentifier();
        let element = Resources.instance.data.sounds[sound].data;

        if (element.paused === false) {
            element.pause();
            element.currentTime = 0;
        }

        element.loop = loop;
        element.volume = volume;
        element.play();

        this.playing[id] = element;

        if (loop === false) {
            element.onended = () => {
                this.playing[id] = undefined;
            }
        }

        return id;
    }

    stop(id: string) {
        if (this.playing[id] !== undefined) {
            this.playing[id]!.pause();
            this.playing[id]!.pause();
            this.playing[id]!.currentTime = 0;
            this.playing[id] = undefined;
        }
    }

    stopAll() {
        for (const id in this.playing) {
            this.stop(id);
            this.playing[id] = undefined;
        }
    }

    isPlaying(id: string): boolean {
        return id in this.playing;
    }

    private static generateSoundIdentifier(length = 32): string {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersSplitted = characters.split("");

        return Array(length).fill(0).map(() => charactersSplitted.random()).join("");
    }
}