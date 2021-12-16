import "./style.scss";
import "../game/ExtendNative";
import { Resources } from "../engine/resources/Resources";
import { Board } from "./Board";
import { Controls } from "./Controls";

(async () => {
    const container = document.getElementById("container")!;

    let controls = new Controls();
    container.append(controls.element);

    const boardContainer = document.createElement("div");
    boardContainer.id = "board-container";
    container.append(boardContainer);

    let board = new Board();
    boardContainer.append(board.element);
    // board.resize(boardContainer);

    await Resources.instance.load();

    controls.generate(
        (n) => {
            // board.resize(boardContainer);
            board.clearTiles();
            board.generateTiles(n);
        },
        () => { board.save(); },
        () => { board.load(); },
        (tile) => { controls.selectedTile = tile; board.selectedTile = tile; });
})()