import Phaser, { Scene } from 'phaser';
import {EscenaMapa} from './Escenas/escenaMapa.js';

var config = {
    type: Phaser.AUTO,
    width: 200,
    height: 200,
    scene: [EscenaMapa]
};

var game = new Phaser.Game(config);
