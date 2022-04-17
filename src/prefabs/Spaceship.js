// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,frame,pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    fly(startF = 0){
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('fly', { start: 0, end: 1, first: startF}),
            frameRate: 1,
            repeat: -1,
        });
        this.anims.play('fly');
    }
    reset() {
        this.x = game.config.width;
    }
}