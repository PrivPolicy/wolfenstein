# Wolfenstein

Recreation of Wolfenstein 3D, written in TypeScript and WebGL

## Table of Contents
- [Introduction](#introduction)
- [Installation and setup](#installation-and-setup)
- [Features](#features)
- [Future Development](#future-development)
- [Credits](#credits)

## Introduction
The main goal of this project is to recreate the Wolfenstein 3D game and port it to the browsers. The project was created as a school assignment.

## Installation and setup
- Clone or download the repository
- `npm i` to install dependencies
- `npm run build` to build the project

This will create a `\build` directory with all the necessary files; `index.html` is the entry point.

**Note:** project doesn't work when opened locally, you need to provide basic server capabilities to properly send the files.

## Features
- Custom rendering engine written in WebGL, capable of rendering textures
- Collision system (player-wall, player-obstacle)
- 4 different weapons to use
- Animation system (weapons, enemies)
- Partially implemented sounds and background music
- Health, ammo and score economy
- Pickups
- Basic enemy AI, capable of spotting the player and shooting while moving around randomly
- Basic level editor (save, load; some things need to be edited manually)

## Future Development
There is no certainty these features will be implemented.

The following is a list of missing features when compared to the original version:
- [ ] Advanced enemy AI (pathfinding)
- [ ] Full sounds coverage
- [ ] More enemy types
- [ ] Moving walls -> secret rooms
- [ ] Additional levels

## Credits
Resources provided by 3rd parties:
- [Wall textures](https://www.textures-resource.com/pc_computer/wolf3d/texture/1375/)
- [Enemies, weapons, environment, splash images, fonts, HUD](https://www.spriters-resource.com/pc_computer/wolfenstein3d/)
- [Sounds](https://www.sounds-resource.com/pc_computer/wolfenstein3d/sound/1443/)
- [Enemy information](http://www.wolfenstein3d.co.uk/enemies.htm)