let scene;
let tileWidthHalf;
let tileHeightHalf;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.game = game;
    this.skeletons = [];
  }

  preload() {
    this.load.setPath('images/');
    this.load.json('map', 'isometric-grass-and-water.json');
    this.load.json('baseMap', 'isometric_world2.json');
    this.load.atlas('hero', 'hero.png', 'hero.json');
    this.load.atlas('candle', 'candle.png', 'candle.json');
    this.load.spritesheet('tiles', 'isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('base', 'iso-64x64-outside.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('skeleton', 'skeleton8.png', { frameWidth: 128, frameHeight: 128 });
    this.load.image('house', 'rem_0002.png');
  }

  create() {
    const scene = this;
    const buildMap = () => {
      const data = this.cache.json.get('baseMap');
      const { tilewidth, tileheight } = data;
      tileWidthHalf = tilewidth / 2;
      tileHeightHalf = tileheight / 2;

      for (let l = 0; l < data.layers.length; l++) {
        const layer = data.layers[l].data;
        const mapwidth = data.layers[l].width;
        const mapheight = data.layers[l].height;
        const centerX = mapwidth * tileWidthHalf;
        const centerY = 16;
        let i = 0;

        for (let y = 0; y < mapheight; y++) {
          for (let x = 0; x < mapwidth; x++) {
            let id = layer[i] - 1;
            const tx = (x - y) * tileWidthHalf;
            const ty = (x + y) * tileHeightHalf;
            i++;
            if (id === -1) continue;
            const tile = this.add.image(centerX + tx, centerY + ty, 'base', id);
            tile.depth = centerY + ty + 50 * l;
          }
        }
      }
    }
    const placeHouses = () => {
      let house = this.add.image(270, 370, 'house');
      house.depth = house.y + 860;
    }
    const addSkeletons = () => {
      this.skeletons.push(this.add.existing(new Skeleton(this, 240, 290, 'walk', 'southEast', 100)));
      this.skeletons.push(this.add.existing(new Skeleton(this, 100, 380, 'walk', 'southEast', 230)));
      this.skeletons.push(this.add.existing(new Skeleton(this, 620, 140, 'walk', 'south', 380)));
      this.skeletons.push(this.add.existing(new Skeleton(this, 460, 180, 'idle', 'south', 0)));
      this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 180, 'walk', 'southEast', 160)));
      this.skeletons.push(this.add.existing(new Skeleton(this, 1450, 320, 'walk', 'southWest', 320)));
      this.skeletons.push(this.add.existing(new Skeleton(this, 1500, 340, 'walk', 'southWest', 340)));
      this.skeletons.push(this.add.existing(new Skeleton(this, 1550, 360, 'walk', 'southWest', 330)));
    }

    buildMap();
    placeHouses();
    // addSkeletons();

    this.hero = this.physics.add.sprite(300, 300, 'hero');
    this.hero.depth = 1200;

    this.cameras.main.startFollow(this.hero);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.mouse.disableContextMenu();
    this.input.on('pointermove', pointer => {
      if (pointer.isDown && pointer.leftButtonDown()) {
        const { x, y } = pointer.manager._tempPoint;
        this.physics.moveTo(this.hero, x, y, 150);
        if (x > this.hero.x && y > this.hero.y) {
          this.hero.play('south');
        } else if (x > this.hero.x && y < this.hero.y) {
          this.hero.play('east')
        } else if (x < this.hero.x && y < this.hero.y) {
          this.hero.play('north')
        } else {
          this.hero.play('west');
        }
      }
    });
    this.input.on('pointerup', pointer => {
      this.hero.body.setVelocity(0);
      this.hero.play('turn');
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'hero', frame: 'villager_walk_south1.png' }]
    });
    this.anims.create({
      key: 'south',
      frames: this.anims.generateFrameNames('hero', { prefix: 'villager_walk_south', suffix: '.png', start: 0, end: 15 }),
      frameRate: 16,
      repeat: -1
    });
    this.anims.create({
      key: 'north',
      frames: this.anims.generateFrameNames('hero', { prefix: 'villager_walk_north', suffix: '.png', start: 0, end: 15 }),
      frameRate: 16,
      repeat: -1
    });
    this.anims.create({
      key: 'west',
      frames: this.anims.generateFrameNames('hero', { prefix: 'villager_walk_west', suffix: '.png', start: 0, end: 15 }),
      frameRate: 16,
      repeat: -1
    });
    this.anims.create({
      key: 'east',
      frames: this.anims.generateFrameNames('hero', { prefix: 'villager_walk_east', suffix: '.png', start: 0, end: 15 }),
      frameRate: 16,
      repeat: -1
    });
  }

  update() {
    this.skeletons.forEach(skeleton => skeleton.update());
  }
}