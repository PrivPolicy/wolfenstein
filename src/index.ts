import "./style.scss";
import "./game/ExtendNative";
import { Resources } from "./engine/resources/Resources";
import { Game } from "./game/Game";
import { Menu } from "./menu/Menu";
import { SoundEmitter } from "./game/SoundEmitter";

(async () => {
    const container = document.getElementById("container")!;

    let button = document.createElement("button");
    button.id = "start-game";
    button.innerText = "Loading...";
    container.append(button);

    await Resources.instance.load();
    console.warn(Resources.instance.data);
    SoundEmitter.instance.volume = 0.2;

    button.className = "ready";
    button.innerText = "Play";

    let lives = 3;

    button.onclick = () => {
        container.removeChild(button);

        let game = new Game(lives);
        container.append(game.canvas);

        let menu = new Menu();
        menu.changeActiveScreen(menu.getScreen(2));
        container.append(menu.canvas);

        let prevTime = 0

        let render = (time = 0) => {
            let delta = (time - prevTime) / 1000;
            prevTime = time;

            let activeScreen = menu.activeScreen;
            let data = undefined;

            if (activeScreen === "screen_hud") {
                data = game.render(delta);
            }

            if (data === "GAME_OVER" || game.won === true) {
                menu.changeActiveScreen(menu.getScreen("screen_highscores"));
                lives = 3;
                container.removeChild(game.canvas);
                game = new Game(lives);
                container.append(game.canvas);
            } else if (data === "DEAD") {
                menu.changeActiveScreen(menu.getScreen("screen_fizzle_fade"));
                setTimeout(() => {
                    container.removeChild(game.canvas);
                    game = new Game(--lives);
                    container.append(game.canvas);
                    menu.changeActiveScreen(menu.getScreen("screen_hud"));
                }, 5000);

            } else {
                menu.render(delta, data);
            }

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }
})()

// function f(data: any) {
//     let out = [];
//     for (const char in data) {
//         let value = data[char];
//         let ascii = char.charCodeAt(0);
//         out.push(`new TextureConditionalItem(${ascii}, ${ascii + 1}, new Texture(TexturesData.font_menu, ${value.x}, ${value.y}, ${value.w}, ${value.h}, 1)),\n`);
//     }
//     out.sort();
//     return out.join("");
// }

// let data = {
//     "A": {
//         "x": 0,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "B": {
//         "x": 20,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "C": {
//         "x": 40,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "D": {
//         "x": 60,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "E": {
//         "x": 80,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "F": {
//         "x": 100,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "G": {
//         "x": 120,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "H": {
//         "x": 140,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "I": {
//         "x": 160,
//         "y": 0,
//         "w": 8,
//         "h": 26
//     },
//     "J": {
//         "x": 168,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "K": {
//         "x": 188,
//         "y": 0,
//         "w": 22,
//         "h": 26
//     },
//     "L": {
//         "x": 210,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "M": {
//         "x": 230,
//         "y": 0,
//         "w": 24,
//         "h": 26
//     },
//     "N": {
//         "x": 254,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "O": {
//         "x": 274,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "P": {
//         "x": 294,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "Q": {
//         "x": 314,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "R": {
//         "x": 334,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "S": {
//         "x": 354,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "T": {
//         "x": 374,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "U": {
//         "x": 394,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "V": {
//         "x": 414,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "W": {
//         "x": 434,
//         "y": 0,
//         "w": 24,
//         "h": 26
//     },
//     "X": {
//         "x": 458,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "Y": {
//         "x": 478,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "Z": {
//         "x": 498,
//         "y": 0,
//         "w": 20,
//         "h": 26
//     },
//     "a": {
//         "x": 0,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "b": {
//         "x": 20,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "c": {
//         "x": 40,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "d": {
//         "x": 60,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "e": {
//         "x": 80,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "f": {
//         "x": 100,
//         "y": 26,
//         "w": 16,
//         "h": 26
//     },
//     "g": {
//         "x": 116,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "h": {
//         "x": 136,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "i": {
//         "x": 156,
//         "y": 26,
//         "w": 8,
//         "h": 26
//     },
//     "j": {
//         "x": 164,
//         "y": 26,
//         "w": 12,
//         "h": 26
//     },
//     "k": {
//         "x": 176,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "l": {
//         "x": 196,
//         "y": 26,
//         "w": 8,
//         "h": 26
//     },
//     "m": {
//         "x": 204,
//         "y": 26,
//         "w": 24,
//         "h": 26
//     },
//     "n": {
//         "x": 228,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "o": {
//         "x": 248,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "p": {
//         "x": 268,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "q": {
//         "x": 288,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "r": {
//         "x": 308,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "s": {
//         "x": 328,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "t": {
//         "x": 348,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "u": {
//         "x": 368,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "v": {
//         "x": 388,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "w": {
//         "x": 408,
//         "y": 26,
//         "w": 24,
//         "h": 26
//     },
//     "x": {
//         "x": 432,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "y": {
//         "x": 452,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "z": {
//         "x": 472,
//         "y": 26,
//         "w": 20,
//         "h": 26
//     },
//     "1": {
//         "x": 0,
//         "y": 52,
//         "w": 12,
//         "h": 26
//     },
//     "2": {
//         "x": 12,
//         "y": 52,
//         "w": 20,
//         "h": 26
//     },
//     "3": {
//         "x": 32,
//         "y": 52,
//         "w": 20,
//         "h": 26
//     },
//     "4": {
//         "x": 52,
//         "y": 52,
//         "w": 20,
//         "h": 26
//     },
//     "5": {
//         "x": 72,
//         "y": 52,
//         "w": 20,
//         "h": 26
//     },
//     "6": {
//         "x": 92,
//         "y": 52,
//         "w": 20,
//         "h": 26
//     },
//     "!": {
//         "x": 112,
//         "y": 52,
//         "w": 8,
//         "h": 26
//     },
//     "'": {
//         "x": 120,
//         "y": 52,
//         "w": 8,
//         "h": 26
//     },
//     ",": {
//         "x": 128,
//         "y": 52,
//         "w": 8,
//         "h": 26
//     },
//     "-": {
//         "x": 136,
//         "y": 52,
//         "w": 16,
//         "h": 26
//     },
//     ".": {
//         "x": 152,
//         "y": 52,
//         "w": 8,
//         "h": 26
//     },
//     ":": {
//         "x": 160,
//         "y": 52,
//         "w": 8,
//         "h": 26
//     },
//     "?": {
//         "x": 168,
//         "y": 52,
//         "w": 20,
//         "h": 26
//     }
// }

// console.log(f(data));