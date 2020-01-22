var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    init: init,
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:2400,x:0},
      debug: false
    }
  }
}

var game = new Phaser.Game(config);

function init() {
  var platforms;
  var player;
  var cursors;
}

function preload(){
  this.load.image('background_0','assets/sky.png');
  this.load.image('background_1','assets/sol_1.png');
  this.load.image('plat_0','assets/plat_base.png');
  this.load.spritesheet('perso','assets/perso_stand.png',{frameWidth:110, frameHeight:52});
}

function create() {
  this.add.image(400,300,'background_0');
  this.add.image(400,300,'background_1');
  platforms = this.physics.add.staticGroup();

  platforms.create(400,560,'plat_0').setScale(1).refreshBody(); //559
  platforms.create(400,420,'plat_0').setScale(0.5).refreshBody();
  platforms.create(10,300,'plat_0').setScale(0.5).refreshBody();
  platforms.create(790,300,'plat_0').setScale(0.5).refreshBody();
  platforms.create(400,180,'plat_0').setScale(0.5).refreshBody();


  player = this.physics.add.sprite(50,450,'perso').setSize(41,52).setOffset(10,0);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player,platforms);
  player.setBounce(0.01);
  cursors = this.input.keyboard.createCursorKeys();
}

function update(){
  if (cursors.left.isDown) { player.setVelocityX(-300); }
  else if (cursors.right.isDown) { player.setVelocityX(300); }
  else { player.setVelocityX(0); }

  if (player.body.touching.down) { //cursors.up.isDown && player.body.touching.down
    player.setVelocityY(-200);
  }
  if (cursors.up.isDown && player.body.touching.down) { //cursors.up.isDown && player.body.touching.down
    player.setVelocityY(-800);
  }
  if (cursors.down.isDown) {
    player.setVelocityY(450);
  }
}
