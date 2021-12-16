export enum Sounds {
    all_right = 'all_right',
    ammo = 'ammo',
    door = 'door',
    gatling_gun = 'gatling_gun',
    halt_1 = 'halt_1',
    halt_2 = 'halt_2',
    halten_sie = 'halten_sie',
    health = 'health',
    key = 'key',
    knife = 'knife',
    machine_gun = 'machine_gun',
    menu_select = 'menu_select',
    menu_toggle = 'menu_toggle',
    oof = 'oof',
    pickup = 'pickup',
    pistol = 'pistol',
    player_dies = 'player_dies',
    player_pain_1 = 'player_pain_1',
    player_pain_2 = 'player_pain_2',
    shephard = 'shephard',
    shephard_death = 'shephard_death',
    switch = 'switch',
    theme_level = "theme_level",
    theme_menu = "theme_menu",
    theme_splash = "theme_splash",
}

export class Sound {
    readonly data: HTMLAudioElement;

    constructor(src: string) {
        this.data = new Audio(src);
    }
}