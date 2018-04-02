const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 500,
  backgroundColor: '#eee',
  parent: 'ph_game',
  scene: [ TitleScene, GameScene ],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 }
    }
  }
}

const game = new Phaser.Game(config);