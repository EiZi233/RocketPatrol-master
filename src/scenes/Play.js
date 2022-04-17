class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('bar', './assets/bar2.png');
        this.load.image('bound', './assets/Bound.png');
        this.load.image('spaceship', './assets/fairy1.png');
        //this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield', './assets/star4.png');
        this.load.image('bFront', './assets/b2.png');
        this.load.image('bBack', './assets/b1.png');
        this.load.image('card', './assets/f1.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/boom2.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7});
        this.load.spritesheet('fly', './assets/FairyAnim.png', {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 1});
    }

    create() {
        this.timer = 0;
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        this.back = this.add.tileSprite(0, game.config.height - 56, 640, 64, 'bBack').setOrigin(0, 0);
        this.front = this.add.tileSprite(0, game.config.height- 64, 640, 64, 'bFront').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, 0, game.config.width, borderUISize * 2, 0x000000).setOrigin(0, 0).setDepth(2);
        this.add.sprite(0, 0, 'bar').setOrigin(0, 0).setDepth(3);
        // white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize*1.2, 0x2E0800).setOrigin(0 ,0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.sprite(game.config.width - borderUISize, 0, 'bound').setOrigin(0, 0).setDepth(1);
        this.add.sprite(0, 0, 'bound').setOrigin(0, 0).setDepth(1).setFlipX(true);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0 ,0);

        // add Rocket (p1)
        
        if(game.settings.playermode == 1) {
            this.p1Rocket = new Rocket(this, game.config.width/3, game.config.height - borderUISize - borderPadding, 'card').setOrigin(0.5, 0).setScale(0.3,0.3);
            this.p2Rocket = new Rocket(this, 2*game.config.width/3, game.config.height - borderUISize - borderPadding, 'card', 1).setOrigin(0.5, 0).setScale(0.3,0.3);
        }else{
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'card').setOrigin(0.5, 0).setScale(0.3,0.3);
        }
        

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'fly', 0, 30).setOrigin(0, 0);
        this.ship01.fly(0);

        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'fly', 0, 20).setOrigin(0,0);
        this.ship02.fly(1);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'fly', 0, 10).setOrigin(0,0);
        this.ship03.fly(0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        keyFF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //keyR2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6, first: 0}),
            frameRate: 30
        });


        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#843605',
            align: 'right',
            padding: {
                top: 4,
                bottom: 4,
            },
            fixedWidth: 60
        }
        let endConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding*5, borderUISize - borderPadding, this.p1Score, scoreConfig).setDepth(3);
        this.scoreRight = this.add.text(borderUISize + borderPadding*45, borderUISize - borderPadding, this.p2Score, scoreConfig).setDepth(3);

        // GAME OVER flag
        this.gameOver = false;
        this.gamePaused = false;

        // 60-second play clock
        this.pauseText = this.add.text(game.config.width/2, game.config.height/2, 'GAME PAUSED', endConfig).setOrigin(0.5).setVisible(false);
        this.PausePromt = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', endConfig).setOrigin(0.5).setVisible(false);
        //this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        //    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', endConfig).setOrigin(0.5);
        //    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', endConfig).setOrigin(0.5);
        //    this.gameOver = true;
        //}, null, this); 
        


    }


    update(time,delta) {
        // check key input for restart 
        if(this.gameOver == false){
            this.timer += delta;
            //print(this.timer);
        }
        if(this.timer > 45000){
            this.pauseText.setText("GAME OVER");
            this.pauseText.setVisible(true);
            this.PausePromt.setVisible(true);
            this.gameOver = true;
            this.gamePaused = true;
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyESC) && this.gamePaused == false) {
            if(this.gameOver){
                this.PausePromt.setVisible(false);
                this.pauseText.setVisible(false);
                this.gameOver = false;

            }else{
                this.pauseText.setVisible(true);
                this.PausePromt.setVisible(true);
                this.gameOver = true;
            }
        }

        this.starfield.tilePositionX -= 1;  // update tile sprite
        this.front.tilePositionX += 0.6;
        this.back.tilePositionX += 0.3;

        if(!this.gameOver) {
            this.p1Rocket.update();  
            if(game.settings.playermode == 1) {
                this.p2Rocket.update();    
            }   
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(game.settings.playermode == 1) {
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03,1);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02,1);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01,1);
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width -64 > ship.x && 
            rocket.y < ship.y + ship.height+10 &&
            rocket.height + rocket.y -120 > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship,player = 0) {
        // temporarily hide ship
        this.timer -= 1000;
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x-16, ship.y-8, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        if(player == 0){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score; 
        }else{
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score; 
        }

        
        this.sound.play('sfx_explosion');
      }
}