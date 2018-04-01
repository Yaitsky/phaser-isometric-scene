class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
    this.game = game;
  }

  preload() {
    this.load.image('logo', 'images/logo.png');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.logo = this.add.image(this.game.canvas.width / 2, 50, 'logo').setOrigin(0.5, 0);
    this.add.text(this.game.canvas.width / 2, 350,
      'Phaser 3 Isometric Game', { fontSize: '36px', fill: 'rgb(0,0,0)' }).setOrigin(0.5, 0);
    this.add.text(this.game.canvas.width / 2, 400,
      'Press SPACEBAR to start', { fontSize: '24px', fill: 'rgb(0,0,0)' }).setOrigin(0.5, 0);
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start('GameScene');
    }
  }
}