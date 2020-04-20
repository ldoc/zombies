import Phaser, { Scene } from 'phaser';

export class EscenaMapa extends Phaser.Scene{
    
    constructor(){
        super({key:"mapa"})
    }

    preload (){
        this.load.image('tileset','./assets/tileset.png');
        this.load.image('water','./assets/water.png');
        this.load.tilemapTiledJSON('mapa','assets/mapa.json')
    }

    create (){
        let mapa = this.make.tilemap({ key: 'mapa', tileWidth: 16, tileHeight: 16 });
        var tWater = mapa.addTilesetImage('water');
        var tTileset = mapa.addTilesetImage('tileset');
        let capaMar = mapa.createStaticLayer('mar', tWater, 0, 0);
        let capaIslas = mapa.createStaticLayer('islas', tTileset, 0, 0);
        let capaEdificios = mapa.createStaticLayer('edificios', tTileset, 0, 0);    
        
        
/*         this.input.on('pointerdown', (e) => {
            console.log(e.position)
            console.log(e.camera.midPoint)
this.cameras.main.pan(e.position.x-e.camera.midPoint.x,e.position.y-e.camera.midPoint.y,1000)
        }); */
    }

    

    update (){
        /* angle += 0.3;
        zoom+= 0.001;
        this.cameras.main.setAngle(angle); 
        this.cameras.main.setZoom(zoom); */
    }

}

