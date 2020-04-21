import Phaser, { Scene } from 'phaser';

export class MapaDani extends Phaser.Scene{
    
    constructor(){
        super({key:"mapa"})
    }

    preload (){
        // Cargamos las imagenes usadas en los Tilesets
        this.load.image('overw','./assets/dani/Overworld.png');
        // Cargamos el JSON del mapa
        this.load.tilemapTiledJSON('mapa','./assets/dani/mapa.json');
        this.load.spritesheet('dani', 
            'assets/dani/dani.png',
            { frameWidth: 16, frameHeight: 32 }
        );
    }

    create (){
        // hacemos el tilemap
        let mapa = this.make.tilemap({ key: 'mapa', tileWidth: 16, tileHeight: 16 });
        var tOver = mapa.addTilesetImage('Overworld','overw');
        let capaSuelo = mapa.createStaticLayer('Suelo', tOver, 0, 0);
        let capaArbustos = mapa.createStaticLayer('Arbustos', tOver, 0, 0);
        this.player = this.physics.add.sprite(100, 100, 'dani');

      
        this.player.setCollideWorldBounds(true);
        
         this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('dani', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dani', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('dani', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dani', { start: 12, end: 16 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'stop',
            frames: [ { key: 'dani', frame: 1 } ],
            frameRate: 20
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(200, 30, 'Dani´s Village', { fontFamily: '"Roboto Condensed"', fontSize: 30 });
      
    }

    update (){
        if(this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown){

            if (this.cursors.left.isDown)
            {
                this.player.setVelocityX(-100);

                this.player.anims.play('left', true);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.setVelocityX(100);

                this.player.anims.play('right', true);
            }
            else if (this.cursors.up.isDown)
            {
                this.player.setVelocityY(-100);

                this.player.anims.play('up', true);
            }
            else if (this.cursors.down.isDown)
            {
                this.player.setVelocityY(100);

                this.player.anims.play('down', true);

            }        
        }
        else{
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);    
            this.player.anims.play('stop', true);
        }
    }
}
