import { Animator } from "../engine/resources/Animator";
import { Screen } from "./Screen";
import { Option } from "./Option";
import { Resources } from "../engine/resources/Resources";
import { SoundEmitter } from "../game/SoundEmitter";
import { TexturesConditional } from "../engine/resources/TextureConditional";

export class ScreenDifficulty extends Screen {
    private readonly hudOptionMarkerAnimator: Animator;
    private readonly markerX: number;
    private readonly markerYstart: number;
    private readonly options: Option[];
    private selectedOptionId: number;

    constructor(props: any) {
        super("screen_difficulty", props);

        this.hudOptionMarkerAnimator = new Animator(Resources.instance.data.texturesAnimated.hud_option_marker);
        this.markerX = 100;
        this.markerYstart = 198;
        this.options = [
            new Option(154, 196 + 0 * 27, "Can I play, Daddy?", true, () => { this.props.next() }),
            new Option(154, 196 + 1 * 27, "Don't hurt me.", true, () => { this.props.next() }),
            new Option(154, 196 + 2 * 27, "Bring 'em on!", true, () => { this.props.next() }),
            new Option(154, 196 + 3 * 27, "I am Death incarnate!", true, () => { this.props.next() })
        ];
        this.selectedOptionId = 2;
    }

    render(c: CanvasRenderingContext2D, delta: number): void {
        let img = Resources.instance.data.textures.screen_difficulty;
        let ref = Resources.instance.data.texturesData[img.reference];
        c.drawImage(ref.image, img.u, img.v, img.width, img.height, 0, 0, img.width, img.height);

        let marker = this.hudOptionMarkerAnimator.get(delta);
        if (marker !== null) {
            ref = Resources.instance.data.texturesData[marker.reference];
            c.drawImage(ref.image, marker.u, marker.v, marker.width, marker.height, this.markerX, this.markerYstart + this.selectedOptionId * 27, 2 * marker.width, 2 * marker.height);
        }

        let canvasFont = document.createElement("canvas");
        canvasFont.width = c.canvas.width;
        canvasFont.height = c.canvas.height;
        let contextFont = canvasFont.getContext("2d")!;

        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            this.props.renderText(contextFont, option.x, option.y, option.text, TexturesConditional.font_menu, 1.2);
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

        let face = Resources.instance.data.texturesConditional.screen_difficulty_face.get(this.selectedOptionId);
        if (face !== null) {
            let ref = Resources.instance.data.texturesData[face.reference];
            c.drawImage(ref.image, face.u, face.v, face.width, face.height, 450, 200, face.width * 2, face.height * 2);
        }

    }

    onUnmount(): void {
        SoundEmitter.instance.stopAll();
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
        } else if (code === "Escape") {
            this.props.back();
        }
    }
}