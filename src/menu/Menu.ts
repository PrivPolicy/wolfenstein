import { Resources } from "../engine/resources/Resources";
import { TexturesConditional } from "../engine/resources/TextureConditional";
import { GameReturnData } from "../game/Game";
import { Screen } from "./Screen";
import { ScreenDifficulty } from "./ScreenDifficulty";
import { ScreenFizzleFade } from "./ScreenFizzleFade";
import { ScreenHighscores } from "./ScreenHighscores";
import { ScreenHUD } from "./ScreenHUD";
import { ScreenMenu } from "./ScreenMenu";
import { ScreenSplashWarning } from "./ScreenSplashWarning";
import { ScreenSplashWolfenstein } from "./ScreenSplashWolfenstein";

export class Menu {
    private readonly _canvas: HTMLCanvasElement
    private readonly _context: CanvasRenderingContext2D
    private readonly _screens: Screen[];
    private _activeScreen: Screen | null;

    constructor() {
        this._canvas = document.createElement("canvas");
        this._canvas.id = "hud";

        this._canvas.width = 640;
        this._canvas.height = 400;

        let context = this._canvas.getContext("2d");
        if (context === null) {
            throw new Error("Canvas 2D is not supported");
        }

        this._context = context;
        context.imageSmoothingEnabled = false;

        this._screens = [
            new ScreenSplashWarning({
                next: () => { this.changeActiveScreen(this.getScreen("screen_splash_wolfenstein")) }
            }),
            new ScreenSplashWolfenstein({
                next: () => { this.changeActiveScreen(this.getScreen("screen_menu")) }
            }),
            new ScreenMenu({
                newGame: () => { this.changeActiveScreen(this.getScreen("screen_difficulty")) },
                quit: () => { window.close(); },
                renderText: (c: CanvasRenderingContext2D, x: number, y: number, text: string, font: TexturesConditional.font_end | TexturesConditional.font_menu, scaling = 1) => { this.renderText(c, x, y, text, font, scaling) }
            }),
            new ScreenDifficulty({
                back: () => { this.changeActiveScreen(this.getScreen("screen_menu")) },
                next: () => { this.changeActiveScreen(this.getScreen("screen_hud")) },
                renderText: (c: CanvasRenderingContext2D, x: number, y: number, text: string, font: TexturesConditional.font_end | TexturesConditional.font_menu, scaling = 1) => { this.renderText(c, x, y, text, font, scaling) }
            }),
            new ScreenHUD({
                die: () => { this.changeActiveScreen(this.getScreen("screen_highscores")) },
            }),
            new ScreenFizzleFade({
                context: this._context,
                width: this._canvas.width,
                height: this._canvas.height
            }),
            new ScreenHighscores({
                next: () => { this.changeActiveScreen(this.getScreen("screen_splash_wolfenstein")) },
            })
        ];

        this._activeScreen = null;

        window.addEventListener("keydown", (event) => { this._activeScreen?.onKeyDown(event.code); });
    }

    get canvas() {
        return this._canvas;
    }

    get activeScreen() {
        return this._activeScreen?.name;
    }

    render(delta: number, data?: GameReturnData) {
        this.renderScreen(delta, data);
    }

    private renderScreen(delta: number, data?: GameReturnData) {
        if (this._activeScreen !== null) {
            if (this._activeScreen.autoClear === true) {
                this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            }

            this._activeScreen.render(this._context, delta, data);
        }
    }

    getScreen(name: string): Screen
    getScreen(index: number): Screen
    getScreen(identifier: string | number): Screen {
        let result: Screen | undefined;

        if (typeof identifier === "string") {
            result = this._screens.find(v => v.name === identifier);
        } else {
            result = this._screens[identifier];
        }

        if (result === undefined) {
            throw new Error("Screen not found");
        }

        return result;
    }

    changeActiveScreen(screen: Screen) {
        if (this._activeScreen !== null) {
            this._activeScreen.onUnmount();
        }

        this._activeScreen = screen;
        screen.onMount();
    }

    renderText(c: CanvasRenderingContext2D, x: number, y: number, text: string, font: TexturesConditional.font_end | TexturesConditional.font_menu, scaling = 1) {
        let curX = x;

        let tc = Resources.instance.data.texturesConditional[font];
        let ref = Resources.instance.data.texturesData[font];

        for (const char of text) {
            if (char === " ") {
                curX += font === TexturesConditional.font_end ? 16 : 20;
                continue;
            }

            let t = tc.get(char.charCodeAt(0));
            if (t !== null) {
                c.drawImage(ref.image, t.u, t.v, t.width, t.height, curX, y, t.width / scaling, t.height / scaling);
                curX += t.width / scaling;
            }
        }
    }
}