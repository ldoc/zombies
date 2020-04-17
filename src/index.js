import Phaser, { Scene } from 'phaser';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('platformPack_tilesheet','./assets/platformPack_tilesheet.png');
    this.load.tilemapTiledJSON('map','assets/mapaJuego.json')
}

function create ()
{
    let map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    var tileset = map.addTilesetImage('platformPack_tilesheet');
    let layer = map.createStaticLayer('suelos', tileset, 0, 0);
    let adornos = map.createStaticLayer('adornos', tileset, 0, 0);
}

function update ()
{
}

