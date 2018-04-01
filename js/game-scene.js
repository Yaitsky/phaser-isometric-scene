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
    this.load.json('map', 'images/isometric-grass-and-water.json');
    this.load.json('baseMap', 'images/isometric_world2.json');
    this.load.spritesheet('tiles', 'images/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('base', 'images/iso-64x64-outside.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('skeleton', 'images/skeleton8.png', { frameWidth: 128, frameHeight: 128 });
    this.load.image('house', 'images/rem_0002.png');
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

    buildMap();
    placeHouses();
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.skeletons.push(this.add.existing(new Skeleton(this, 240, 290, 'walk', 'southEast', 100)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 100, 380, 'walk', 'southEast', 230)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 620, 140, 'walk', 'south', 380)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 460, 180, 'idle', 'south', 0)));
    // this.skeletons.push(this.add.existing(new Skeleton(this, 760, 100, 'attack', 'southEast', 0)));
    // this.skeletons.push(this.add.existing(new Skeleton(this, 800, 140, 'attack', 'northWest', 0)));
    // this.skeletons.push(this.add.existing(new Skeleton(this, 750, 480, 'walk', 'east', 200)));
    // this.skeletons.push(this.add.existing(new Skeleton(this, 1030, 300, 'die', 'west', 0)));
    // this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 340, 'attack', 'northEast', 0)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 1180, 180, 'walk', 'southEast', 160)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 1450, 320, 'walk', 'southWest', 320)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 1500, 340, 'walk', 'southWest', 340)));
    this.skeletons.push(this.add.existing(new Skeleton(this, 1550, 360, 'walk', 'southWest', 330)));
  }

  update() {
    this.skeletons.forEach(skeleton => skeleton.update());

    if (this.cursors.right.isDown) this.cameras.main.scrollX += 3;
    if (this.cursors.left.isDown) this.cameras.main.scrollX -= 3;
    if (this.cursors.up.isDown) this.cameras.main.scrollY -= 3;
    if (this.cursors.down.isDown) this.cameras.main.scrollY += 3;
  }
}