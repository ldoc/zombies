import Phaser, { Scene } from 'phaser';

export class MapaDani extends Phaser.Scene {

    constructor() {
        super({ key: "mapa" })
    }

    preload() {
        // Cargamos las imagenes usadas en los Tilesets
        this.load.image('overw', './assets/dani/Overworld.png');
        this.load.image('pistolaDoble', './assets/pistola mágica.png');
        this.load.spritesheet('cañon', './assets/cannon.png',{frameWidth: 96, frameHeight: 64});
        this.load.image('disparo de cañon', './assets/cannon ball.png');
        this.load.audio('musica','./assets/Recall of the Shadows.mp3')
        this.load.audio('zombieComiendote','./assets/Zombie Sound.wav')
        this.load.audio('vida','./assets/vida.mp3')
        //this.load.audio('correr','./assets/correr.flac')
        this.load.audio('zombieMuerto','./assets/zombieMuerto.wav')
        this.load.audio('disparo','./assets/disparo.mp3')
        this.load.image('rojo', './assets/bullet.png');
        this.load.image('zapatillas', './assets/zapatilla-icono.png');
        this.load.image('municion', './assets/disparos-icono.png');
        this.load.image('vida', './assets/vida-icono.png');
        // Cargamos el JSON del mapa
        this.load.tilemapTiledJSON('mapa', './assets/dani/mapa.json');
        this.load.spritesheet("tronco", "assets/log.png", { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('player2', 'assets/character.png',{ frameWidth: 16, frameHeight: 32 })
        this.load.spritesheet('zombie', 'assets/dani.png',{ frameWidth: 16, frameHeight: 32 })
    }

    create() {
        this.musicaDeFondo=this.sound.add('musica',{loop:true,volume:0.5})
        this.vidaM=this.sound.add('vida')
        //this.correrM=this.sound.add('correr')
        this.disparoM=this.sound.add('disparo')
        this.zombieMM=this.sound.add('zombieMuerto',{volume:0.4})
        this.zombieMC=this.sound.add('zombieComiendote',{volume:0.7})
        this.musicaDeFondo.play()
        // hacemos el tilemap
        let mapa = this.make.tilemap({ key: 'mapa', tileWidth: 16, tileHeight: 16 });
        var tOver = mapa.addTilesetImage('Overworld', 'overw');
        let capaSuelo = mapa.createStaticLayer('Suelo', tOver, 0, 0);
        let capaArbustos = mapa.createStaticLayer('Arbustos', tOver, 0, 0);
        let capaSetos = mapa.createStaticLayer('setos', tOver, 0, 0);
        this.player2 = this.physics.add.sprite(100, 100, 'player2');
        this.player2.body.setSize(10,10)
        this.player1 = this.physics.add.sprite(150, 100, 'tronco');
        this.player1.body.setSize(10,10)
        this.disparos=this.physics.add.group();
        this.zombies=this.physics.add.group();
        this.vidas=this.physics.add.group();
        this.municiones=this.physics.add.group();
        this.cañoncetes=this.physics.add.group();
        this.zapatillas=this.physics.add.group();
        this.balasDobles=this.physics.add.group();
        this.movimiento1=[1,0]
        this.movimiento2=[1,0]
        this.mordisco=false
        this.disparoPV1=1
        this.disparoPV2=1
        this.velocidad1=100
        this.velocidad2=100
        this.vidas1=20
        this.vidas2=20
        this.recuento1=30
        this.recuento2=30
        this.player1balas = this.add.text(16, 16, 'balas1: 30', { fontSize: '12px', fill: '#ffffff' });
        this.player2balas = this.add.text(16,39, 'balas2: 30', { fontSize: '12px', fill: '#ffffff' });
        this.player1vidas = this.add.text(390, 16, 'vidas1: 20', { fontSize: '12px', fill: '#ffffff' });
        this.player2vidas = this.add.text(390,39, 'vidas2: 20', { fontSize: '12px', fill: '#ffffff' });
        this.finDelJuego
        
        setInterval(()=>{
            let zombie=this.zombies.create(480,Phaser.Math.Between(430,450),"zombie",1,true,true)
            zombie.body.setSize(16,16)
        },4000)
        setTimeout(()=>{
            setInterval(()=>{
                //let vida=this.add.image(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),'vida')
                let vida=this.vidas.create(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),"vida",1,true,true)
                vida.scale=0.40
            },30000)
        },40000)
        setInterval(()=>{
            //let vida=this.add.image(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),'vida')
            let zapatilla=this.zapatillas.create(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),"zapatillas",1,true,true)
            zapatilla.scale=0.40
        },30000)
        setInterval(()=>{
            //let vida=this.add.image(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),'vida')
            let balaDoble=this.balasDobles.create(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),"pistolaDoble",1,true,true)
            balaDoble.scale=0.04
        },6000)
        setTimeout(()=>{
            setInterval(()=>{
                //let vida=this.add.image(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),'vida')
                let municion=this.municiones.create(Phaser.Math.Between(10,470),Phaser.Math.Between(10,470),"municion",1,true,true)
                municion.scale=0.40
            },30000)
        },20000)
        this.physics.add.overlap(this.player1,this.vidas,(p,v)=>{
            this.vidas1=this.vidas1+5
            v.destroy()
            this.player1vidas.setText('vidas1= '+this.vidas1)
            this.vidaM.play()
        },null,this)
        this.physics.add.overlap(this.player2,this.vidas,(p,v)=>{
            this.vidas2=this.vidas2+5
            v.destroy()
            this.player2vidas.setText('vidas2= '+this.vidas2)
            this.vidaM.play()
        },null,this)
        this.physics.add.overlap(this.player1,this.municiones,(p,m)=>{
            this.recuento1=this.recuento1+5
            m.destroy()
            this.player1balas.setText('balas1= '+this.recuento1)
        },null,this)
        this.physics.add.overlap(this.player2,this.municiones,(p,m)=>{
            this.recuento2=this.recuento2+5
            m.destroy()
            this.player2balas.setText('balas2= '+this.recuento2)
        },null,this)
        this.physics.add.overlap(this.player2,this.balasDobles,(p,b)=>{
            this.balasPV2=this.balasPV2+1
            b.destroy()
        },null,this)
        this.physics.add.overlap(this.player1,this.balasDobles,(p,b)=>{
            b.destroy()
            const rafaga=(numeroBalas)=> {
                setTimeout(()=>{
                    let disparo1 = this.disparos.create(this.player1.x,this.player1.y, 'rojo');
                    disparo1.setCollideWorldBounds(true)
                    disparo1.scale=0.75
                    disparo1.setCircle(5,5,5)
                    disparo1.setBounce(1)
                    let velocidadDisparoX1=this.movimiento1[1]*200
                    let velocidadDisparoY1=this.movimiento1[0]*200
                    disparo1.setVelocity(velocidadDisparoX1,velocidadDisparoY1)
                    //console.log(numeroBalas)
                    //this.balasPV1=this.balasPV1+1
                    if(numeroBalas>0){
                        rafaga(numeroBalas-1)
                    }
                },400)
                
            }
            rafaga(10)
            
        },null,this)
        this.physics.add.overlap(this.player2,this.balasDobles,(p,b)=>{
            b.destroy()
            const rafaga=(numeroBalas)=> {
                setTimeout(()=>{
                    let disparo1 = this.disparos.create(this.player2.x,this.player2.y, 'rojo');
                    disparo1.setCollideWorldBounds(true)
                    disparo1.scale=0.75
                    disparo1.setCircle(5,5,5)
                    disparo1.setBounce(1)
                    let velocidadDisparoX2=this.movimiento2[1]*200
                    let velocidadDisparoY2=this.movimiento2[0]*200
                    disparo1.setVelocity(velocidadDisparoX2,velocidadDisparoY2)
                    console.log(numeroBalas)
                    //this.balasPV1=this.balasPV1+1
                    if(numeroBalas>0){
                        rafaga(numeroBalas-1)          
                    }
                },400)
                
            }
            console.log("pasa por aqui")
            rafaga(10)
            
        },null,this)
        this.physics.add.overlap(this.player1,this.zapatillas,(p,z)=>{
            //this.correrM.play()
            this.velocidad1=this.velocidad1+20
            z.destroy()
            this.player1.setTint(0xff0000)
            setTimeout(()=>{
                this.velocidad1=this.velocidad1-20
                if(this.velocidad1==100)this.player1.setTint(0xffffff)
            },5000)
        },null,this)
        this.physics.add.overlap(this.player2,this.zapatillas,(p,z)=>{
            //this.correrM.play()
            this.velocidad2=this.velocidad2+20
            z.destroy()
            this.player2.setTint(0xff0000)
            setTimeout(()=>{
                this.velocidad2=this.velocidad2-20
                if(this.velocidad2==100)this.player2.setTint(0xffffff)
            },5000)
        },null,this)
        this.physics.add.collider(this.zombies,this.zombies)
        this.physics.add.collider(this.zombies,this.player1,(zombies,player1)=>{
            this.zombieMC.play()
            this.vidas1=this.vidas1-1
            this.player1vidas.setText('vidas1= '+this.vidas1)
            console.log(this.vidas1)
            this.mordisco=true
            setTimeout(()=>{
                this.mordisco=false
            },1000)
            if(this.vidas1==0){
                this.physics.pause()
                this.add.text(100, 150, 'TE HAN COMIDO\n LOS ZOMBIES', { fontSize: '40px', fill: '#000000',backgroundColor:'#ffffff' });
            }
        })
        this.physics.add.collider(this.zombies,this.player2,(zombies,player2)=>{
            this.zombieMC.play()
            this.vidas2=this.vidas2-1
            this.player2vidas.setText('vidas2= '+this.vidas2)
            console.log(this.vidas2)
            this.mordisco=true
            setTimeout(()=>{
                this.mordisco=false
            },1000)
            if(this.vidas2==0){
                this.physics.pause()
                this.add.text(100, 150, 'TE HAN COMIDO\n LOS ZOMBIES', { fontSize: '40px', fill: '#000000',backgroundColor:'#ffffff'});
            }
        })
        this.physics.add.collider(this.player1,this.player2)
        this.physics.add.collider(capaArbustos,this.player1)
        this.physics.add.collider(capaArbustos,this.player2)
        this.physics.add.collider(capaArbustos,this.zombies)
        this.physics.add.collider(capaSetos,this.player1)
        this.physics.add.collider(capaSetos,this.player2)
        this.physics.add.collider(capaSetos,this.zombies)
        this.physics.add.collider(this.disparos,this.zombies,(disparo,zombie)=>{
            this.zombieMM.play()
            disparo.destroy(true)
            zombie.destroy(true)
        })
        this.physics.add.collider(this.disparos,capaSetos,(disparo,setos)=>{
            this.zombieMM.play()
            disparo.destroy(true)
        })
        capaArbustos.setCollisionByProperty({collides:true})
        capaSetos.setCollisionByProperty({collides:true})
        this.player1.setCollideWorldBounds(true);

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('tronco', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('tronco', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('tronco', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('tronco', { start: 18, end: 21 }),
            frameRate: 10,
            repeat: -1
        });


        this.anims.create({
            key: 'stop',
            frames: [{ key: 'tronco', frame: 1 }],
            frameRate: 20
        });
        this.player2.setCollideWorldBounds(true);

        this.anims.create({
            key: 'downp2',
            frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'upp2',
            frames: this.anims.generateFrameNumbers('player2', { start: 34, end: 37 }),
            frameRate: 10,
            repeat: -1
        });this.anims.create({
            key: 'leftp2',
            frames: this.anims.generateFrameNumbers('player2', { start: 51, end: 54 }),
            frameRate: 10,
            repeat: -1
        });this.anims.create({
            key: 'rightp2',
            frames: this.anims.generateFrameNumbers('player2', { start: 17, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'stopp2',
            frames: [{ key: 'player2', frame: 0 }],
            frameRate: 20
        });
        this.keyEnter=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.keySpace=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyW = this.input.keyboard.addKey('W');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyD = this.input.keyboard.addKey('D');
        this.keyQ = this.input.keyboard.addKey('Q');


        this.add.text(200, 30, 'Dani´s Village', { fontFamily: '"Roboto Condensed"', fontSize: 30 });
    }

    update() {
        if (this.keyQ.isDown){
            let cañoncete=this.cañoncetes.create(this.player2.x,this.player2.y,"cañon",1,true,true)
            cañoncete.scale=0,4
        }
        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {

            if (this.cursors.left.isDown) {
                this.player1.setVelocityX(-this.velocidad1);
                this.movimiento1[1]=-1
                this.player1.anims.play('left', true);
            }
            else if (this.cursors.right.isDown) {
                this.player1.setVelocityX(this.velocidad1);
                this.movimiento1[1]=1
                this.player1.anims.play('right', true);
            }else{
                this.movimiento1[1]=0
            }
             if (this.cursors.up.isDown) {
                this.player1.setVelocityY(-this.velocidad1);
                this.movimiento1[0]=-1
                this.player1.anims.play('up', true);
            }
            else if (this.cursors.down.isDown) {
                this.player1.setVelocityY(this.velocidad1);
                this.movimiento1[0]=1
                this.player1.anims.play('down', true);
                

            }else{
                this.movimiento1[0]=0
            }
            
        }
        else {
            this.player1.setVelocityX(0);
            this.player1.setVelocityY(0);
            this.player1.anims.play('stop', true);
        }
        if (this.keyW.isDown || this.keyA.isDown || this.keyS.isDown || this.keyD.isDown) {
            if (this.keyA.isDown) {
                this.player2.setVelocityX(-this.velocidad2);
                this.movimiento2[1]=-1
                this.player2.anims.play('leftp2', true);
            }
            else if (this.keyD.isDown) {
                this.player2.setVelocityX(this.velocidad2);
                this.movimiento2[1]=1
                this.player2.anims.play('rightp2', true);

            }else{
                this.movimiento2[1]=0
            }
             if (this.keyW.isDown) {
                this.player2.setVelocityY(-this.velocidad2);
                this.movimiento2[0]=-1
                this.player2.anims.play('upp2', true);

            }
            else if (this.keyS.isDown) {
                this.player2.setVelocityY(this.velocidad2);
                this.movimiento2[0]=1
                this.player2.anims.play('downp2', true);
            }else{
                this.movimiento2[0]=0
            }
            

        }
        else {
            this.player2.setVelocityX(0);
            this.player2.setVelocityY(0);
            this.player2.anims.play('stopp2', true);
        }
        this.zombies.children.iterate((zombie)=>{
            let distanciaplayer1=Phaser.Math.Distance.Between(this.player1.x,this.player1.y,zombie.x,zombie.y)
            let distanciaplayer2=Phaser.Math.Distance.Between(this.player2.x,this.player2.y,zombie.x,zombie.y)
            if(this.mordisco==true){
                this.physics.moveToObject(zombie,this.player1,0) 
            }else{
                if (distanciaplayer1<distanciaplayer2){
                    this.physics.moveToObject(zombie,this.player1,Phaser.Math.Between(10,50)) 
                }
                else{
                    this.physics.moveToObject(zombie,this.player2,Phaser.Math.Between(10,50))
                }
            }           

        })
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)){
            if(this.recuento1>0){
                this.disparoM.play()
                let disparo = this.disparos.create(this.player1.x,this.player1.y, 'rojo');
                disparo.setCollideWorldBounds(true)
                disparo.scale=0.75
                disparo.setCircle(5,5,5)
                disparo.setBounce(1)
                let velocidadDisparoX=this.movimiento1[1]*200
                let velocidadDisparoY=this.movimiento1[0]*200
                disparo.setVelocity(velocidadDisparoX,velocidadDisparoY)
                this.recuento1=this.recuento1-1
                this.player1balas.setText('balas1= '+this.recuento1)
                //this.disparos.add(disparo)
                console.log(this.movimiento1)
            
                                
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)){
            if(this.recuento2>0){
                this.disparoM.play()
                let disparo = this.disparos.create(this.player2.x,this.player2.y, 'rojo');
                disparo.setCollideWorldBounds(true)
                disparo.scale=0.75
                disparo.setCircle(5,5,5)
                disparo.setBounce(1)
                let velocidadDisparoX=this.movimiento2[1]*200
                let velocidadDisparoY=this.movimiento2[0]*200
                disparo.setVelocity(velocidadDisparoX,velocidadDisparoY)
                this.recuento2=this.recuento2-1
                this.player2balas.setText('balas2= '+this.recuento2)
            }
            //this.disparos.add(disparo
        
        }
        //if(this.zombies,this.player1){
            //let vidas1=10;
            //vidas1=vidas1-1;
            //this.player1vidas.setText('vidas1= '+this.vidas1)
        //}
        //if(this.zombies,this.player2){
            //let vidas2=10;
            //vidas2=vidas2-1;
            //this.player2vidas.setText('vidas1= '+this.vidas2)
        //}

    }




}
