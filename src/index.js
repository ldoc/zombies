import Phaser, { Scene } from 'phaser';
import {MapaDani} from './Escenas/mapaDani.js';

var config = {
    type: Phaser.AUTO,
    width: 16 * 30,
    height: 16 * 30,
    scene: [MapaDani],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

var game = new Phaser.Game(config);
