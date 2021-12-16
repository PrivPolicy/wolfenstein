import { Animator } from "../engine/resources/Animator";
import { Resources } from "../engine/resources/Resources";
import { Sounds } from "../engine/resources/Sound";
import { SoundEmitter } from "../game/SoundEmitter";
import { Screen } from "./Screen"
import { Option } from "./Option";
import { TexturesConditional } from "../engine/resources/TextureConditional";

export class ScreenPause extends Screen {
    private readonly hudOptionMarkerAnimator: Animator;
    private readonly markerX: number;
    private readonly markerYstart: number;
    private readonly options: Option[];
    private selectedOptionId: number;

    constructor(props: any) {
        super("screen_pause", props);

        this.hudOptionMarkerAnimator = new Animator(Resources.instance.data.texturesAnimated.hud_option_marker);
        this.markerX = 150;
        this.markerYstart = 114;
        this.options = [
            new Option(210, 114 + 0 * 27, "New game", true, () => { this.props.newGame() }),
            new Option(210, 114 + 1 * 27, "Sound", false),
            new Option(210, 114 + 2 * 27, "Control", false),
            new Option(210, 114 + 3 * 27, "Load Game", false),
            new Option(210, 114 + 4 * 27, "Save Game", false),
            new Option(210, 114 + 5 * 27, "Change View", false),
            new Option(210, 114 + 6 * 27, "View Scores", false),
            new Option(210, 114 + 7 * 27, "Back to Demo", false),
            new Option(210, 114 + 8 * 27, "Quit", true, () => { this.props.quit() }),
        ];
        this.selectedOptionId = 0;
    }

    render(c: CanvasRenderingContext2D, delta: number): void {
        let img = Resources.instance.data.textures.screen_menu;
        let ref = Resources.instance.data.texturesData[img.reference];
        c.drawImage(ref.image, img.u, img.v, img.width, img.height, 0, 0, img.width, img.height);

        let marker = this.hudOptionMarkerAnimator.get(delta);
        if (marker !== null) {
            ref = Resources.instance.data.texturesData[marker.reference];
            c.drawImage(ref.image, marker.u, marker.v, marker.width, marker.height, this.markerX, this.markerYstart + this.selectedOptionId * 27, 2 * marker.width, 2 * marker.height);
        }

        // for (let i = 0; i < this.options.length; i++) {
        //     const option = this.options[i];
        //     let color = option.enabled === false ? "rgb(121,10,0)" : (i === this.selectedOptionId ? "rgb(195,195,195)" : "rgb(142,142,142)");

        //     c.textAlign = "left";
        //     c.font = "bold 24px Trebuchet MS";
        //     c.fillStyle = color;
        //     c.fillText(option.text, option.x, option.y);
        // }

        let canvasFont = document.createElement("canvas");
        canvasFont.width = c.canvas.width;
        canvasFont.height = c.canvas.height;
        let contextFont = canvasFont.getContext("2d")!;

        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            this.props.renderText(contextFont, option.x, option.y, option.text, TexturesConditional.font_menu, 1);
        }

        contextFont.globalCompositeOperation = "source-atop";

        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            let color = option.enabled === false ? "rgb(121,10,0)" : (i === this.selectedOptionId ? "rgb(195,195,195)" : "rgb(142,142,142)");
            contextFont.fillStyle = color;
            contextFont.fillRect(option.x, option.y, c.canvas.width, 27);
        }

        contextFont.globalCompositeOperation = "source-over";

        c.drawImage(canvasFont, 0, 0);
    }

    onMount(): void {
        SoundEmitter.instance.play(Sounds.theme_menu, true, 0.1);
    }

    onKeyDown(code: string): void {
        if (code === "ArrowUp") {
            let index = (this.selectedOptionId - 1) % this.options.length;
            if (index < 0) { index += this.options.length }

            while (this.options[index].enabled === false) {
                index = (index - 1) % this.options.length;
                if (index < 0) { index += this.options.length }
            }

            this.selectedOptionId = index;
        } else if (code === "ArrowDown") {
            let index = (this.selectedOptionId + 1) % this.options.length;

            while (this.options[index].enabled === false) {
                index = (index + 1) % this.options.length;
            }

            this.selectedOptionId = index;
        } else if (code === "Enter") {
            this.options[this.selectedOptionId].onSelect();
        }
    }
}