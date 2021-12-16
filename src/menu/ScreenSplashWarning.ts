import { Resources } from "../engine/resources/Resources";
import { Sounds } from "../engine/resources/Sound";
import { SoundEmitter } from "../game/SoundEmitter";
import { Screen } from "./Screen"

export class ScreenSplashWarning extends Screen {
    private mounted: number;
    private opacityMiddle: number;
    private edgeTime: number;
    private holdTime: number;

    constructor(props: any) {
        super("screen_splash_warning", props);

        this.mounted = 0;
        this.opacityMiddle = 0;
        this.edgeTime = 500;
        this.holdTime = 5;
    }

    render(c: CanvasRenderingContext2D, delta: number): void {
        let opacity = c.globalAlpha;

        c.globalAlpha = Math.clamp(0, 1, this.holdTime - Math.abs(this.opacityMiddle - Date.now()) / this.edgeTime);

        let img = Resources.instance.data.textures.screen_splash_warning;
        let ref = Resources.instance.data.texturesData[img.reference];
        c.drawImage(ref.image, img.u, img.v, img.width, img.height, 0, 0, img.width, img.height);

        c.globalAlpha = opacity;

        if (Math.abs(Date.now() - this.opacityMiddle) > Math.abs(this.mounted - this.opacityMiddle)) {
            this.props.next();
        }
    }

    onMount(): void {
        SoundEmitter.instance.play(Sounds.theme_splash, true, 0.1);

        this.mounted = Date.now();
        this.opacityMiddle = this.mounted + 2500;
    }
}