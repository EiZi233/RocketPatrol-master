class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/kira.wav');
    this.load.audio('bgm', './assets/Reiiden.mp3');
    this.load.audio('sfx_explosion', './assets/explode.wav');
    this.load.audio('sfx_rocket', './assets/charge.wav');
    this.load.image('bg', './assets/menu.png');
  }

  create() {
      // menu text configuration
      let menuConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }
      
      
      // show menu text
      this.add.sprite(0, 0, 'bg').setOrigin(0, 0).setDepth(0);
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'NOT ROCKET PATROL (NOR TOUHOU)', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use ←→/A D to move & ↑/W to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#FFFFFF';
      menuConfig.color = '#000';
      menuConfig.fontSize= '20px',
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for ONE PLAYER or → for TWO PLAYER', menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000,
          playermode: 0
        }
        this.sound.play('sfx_select');
        this.sound.play('bgm');
        this.scene.start("playScene");    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {

        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 45000,
          playermode: 1
        }
        this.sound.play('sfx_select');
        this.sound.play('bgm');
        this.scene.start("playScene");    
      }
    }
}