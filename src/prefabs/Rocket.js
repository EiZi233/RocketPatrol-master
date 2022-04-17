// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, playerValue = 0, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.pV = playerValue;      // track player value
    }

    update() {
        // left/right movement
        if(this.pV == 0) {
            if(!this.isFiring) {
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
            // if fired, move up
            if(this.isFiring && this.y >= borderUISize * 2 + borderPadding- 12) {
                this.y -= this.moveSpeed;
            }
            // reset on miss
            if(this.y <= borderUISize * 2 + borderPadding- 12) {
                this.reset();
            }
        }else{
            if(!this.isFiring) {
                if(keyLEFT2.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT2.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyFF) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
            // if fired, move up
            if(this.isFiring && this.y >= borderUISize * 2 + borderPadding - 12) {
                this.y -= this.moveSpeed;
            }
            // reset on miss    
            if(this.y <= borderUISize * 2 + borderPadding- 12) {
                this.reset();
            }
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
