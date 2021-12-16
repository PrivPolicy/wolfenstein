import { Animator } from "../engine/resources/Animator";
import { Resources } from "../engine/resources/Resources";
import { Sounds } from "../engine/resources/Sound";
import { TextureConditional } from "../engine/resources/TextureConditional";
import { GameReturnData } from "../game/Game";
import { SoundEmitter } from "../game/SoundEmitter";
import { Screen } from "./Screen";

export class ScreenHUD extends Screen {
    private readonly BJBlazkowiczAnimator: Animator;
    private themeID: string;

    constructor(props: any) {
        super("screen_hud", props);

        this.BJBlazkowiczAnimator = new Animator(Resources.instance.data.texturesAnimated.hud_BJBlazkowicz_looking);
        this.themeID = "";
    }

    onMount(): void {
        this.themeID = SoundEmitter.instance.play(Sounds.theme_level, true, 0.12);
    }

    onUnmount(): void {
        SoundEmitter.instance.stop(this.themeID);
    }

    render(c: CanvasRenderingContext2D, delta: number, data: GameReturnData): void {
        c.clearRect(0, 0, c.canvas.width, c.canvas.height);
        c.drawImage(Resources.instance.data.texturesData.overlay.image, 0, 0);

        // draw dot
        c.arc(320, 160, 3, 0, 2 * Math.PI);
        c.fillStyle = "red";
        c.fill();
        c.closePath();

        let coe = (Math.random() * 2);
        let texSrc = this.BJBlazkowiczAnimator.get(delta * coe, data.health);

        if (texSrc !== null) {
            c.drawImage(Resources.instance.data.texturesData[texSrc.reference].image, texSrc.u, texSrc.v, texSrc.width, texSrc.height, 274, 330, 48, 62);
        }

        let dataPadded = {
            floor: data.floor.toString(),
            score: data.score.toString().padStart(6, "-"),
            lives: data.lives.toString(),
            health: data.health.toString().padStart(3, "-"),
            ammo: data.ammo.toString().padStart(3, "-"),
        };

        let texDigits = Resources.instance.data.texturesConditional.hud_numbers;
        let reference = Resources.instance.data.texturesData.status.image;

        this.drawString(c, 48, 8, dataPadded.floor, texDigits, reference);
        this.drawString(c, 96, 8, dataPadded.score, texDigits, reference);
        this.drawString(c, 224, 8, dataPadded.lives, texDigits, reference);
        this.drawString(c, 334, 8, dataPadded.health, texDigits, reference);
        this.drawString(c, 420, 8, dataPadded.ammo, texDigits, reference);

        if (data.hasKeyGolden) {
            let texKey = Resources.instance.data.textures.hud_key_golden;
            c.drawImage(Resources.instance.data.texturesData.status.image, texKey.u, texKey.v, texKey.width, texKey.height, 480, 328, 2 * texKey.width, 2 * texKey.height);
        }

        if (data.hasKeySilver) {
            let texKey = Resources.instance.data.textures.hud_key_silver;
            c.drawImage(Resources.instance.data.texturesData.status.image, texKey.u, texKey.v, texKey.width, texKey.height, 480, 360, 2 * texKey.width, 2 * texKey.height);
        }

        let texWeaponIcon = data.weapon.textureIcon;
        c.drawImage(Resources.instance.data.texturesData.status.image, texWeaponIcon.u, texWeaponIcon.v, texWeaponIcon.width, texWeaponIcon.height, 502, 332, 2.4 * texWeaponIcon.width, 2.4 * texWeaponIcon.height);

        let texWeaponHUD = data.weaponStateMachine.getTexture(delta);
        if (texWeaponHUD !== null) {
            c.drawImage(Resources.instance.data.texturesData.stitched.image, texWeaponHUD.u, texWeaponHUD.v, texWeaponHUD.width, texWeaponHUD.height, 156, -9, 5 * texWeaponHUD.width, 5 * texWeaponHUD.height)
        }
    }

    private drawString(c: CanvasRenderingContext2D, x: number, skipX: number, string: string, digits: TextureConditional, reference: HTMLImageElement, multi = 2) {
        for (const digit of string) {
            if (digit !== "-") {
                let texDigit = digits.get(parseInt(digit));

                if (texDigit !== null) {
                    c.drawImage(reference, texDigit.u, texDigit.v, texDigit.width, texDigit.height, x, 354, multi * texDigit.width, multi * texDigit.height);
                }
            }
            x += skipX * multi;
        }
    }
}