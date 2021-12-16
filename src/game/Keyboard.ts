export enum KeyboardButtons {
    KeyW = "forwards",
    ArrowUp = "forwards",
    KeyS = "backwards",
    ArrowDown = "backwards",
    KeyA = "turnLeft",
    ArrowLeft = "turnLeft",
    KeyD = "turnRight",
    ArrowRight = "turnRight",
    Digit1 = "weapon_knife",
    Digit2 = "weapon_pistol",
    Digit3 = "weapon_machinegun",
    Digit4 = "weapon_chaingun",
    ControlLeft = "attack",
    KeyE = "interact_door",
    KeyR = "raycast"
}

export type KeyboardData = {
    [key in KeyboardButtons]: boolean
}

export class Keyboard {
    readonly data: KeyboardData

    constructor() {
        this.data = {
            forwards: false,
            backwards: false,
            turnLeft: false,
            turnRight: false,
            weapon_knife: false,
            weapon_pistol: false,
            weapon_machinegun: false,
            weapon_chaingun: false,
            attack: false,
            interact_door: false,
            raycast: false,
        }
    }

    attachEvents() {
        window.addEventListener("keydown", this.parseKeyboardEvent.bind(this));
        window.addEventListener("keyup", this.parseKeyboardEvent.bind(this));
    }

    private parseKeyboardEvent(event: KeyboardEvent) {
        let key = event.code;

        switch (event.type) {
            case "keydown": {
                if (key in KeyboardButtons) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.data[KeyboardButtons[key as keyof typeof KeyboardButtons]] = true;
                }
                break;
            }
            case "keyup": {
                if (key in KeyboardButtons) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.data[KeyboardButtons[key as keyof typeof KeyboardButtons]] = false;
                }
                break;
            }
        }
    }
}