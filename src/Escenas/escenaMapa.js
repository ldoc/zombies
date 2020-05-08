import Phaser, { Scene } from 'phaser';

export class EscenaMapa extends Phaser.Scene{
    
    constructor(){
        super({key:"mapa"});
    }

    preload (){
        this.load.image('tileset','./assets/tileset.png');
        this.load.image('water','./assets/water.png');
        this.load.tilemapTiledJSON('mapa','assets/mapa.json');
        this.load.spritesheet('dani', 
            'assets/dani/dani.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    

    create (){
        let mapa = this.make.tilemap({ key: 'mapa', tileWidth: 16, tileHeight: 16 });
        var tWater = mapa.addTilesetImage('water');
        var tTileset = mapa.addTilesetImage('tileset');
        let capaMar = mapa.createStaticLayer('mar', tWater, 0, 0);
        let capaIslas = mapa.createStaticLayer('islas', tTileset, 0, 0);
        let capaEdificios = mapa.createStaticLayer('edificios', tTileset, 0, 0);    
    
        this.player = this.physics.add.sprite(100, 100, 'dani');

      
        this.player.setCollideWorldBounds(true);
        
    /*     this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        }); */
    }

    update (){
        /* angle += 0.3;
        zoom+= 0.001;
        this.cameras.main.setAngle(angle); 
        this.cameras.main.setZoom(zoom); */
    }

}

