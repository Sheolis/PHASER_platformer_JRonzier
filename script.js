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
            debug: true
        }
    }
}

var game = new Phaser.Game(config);

function init() {
    var platforms;
    var player;
    var cursors;
    var coin;
}

function preload(){
    this.load.image('background_0','assets/sky.png');
    this.load.image('background_1','assets/sol_1.png');
    this.load.image('plat_0','assets/plat_base.png');
    this.load.image('coin','assets/gold.png');
    this.load.spritesheet('perso','assets/spritesheet_hamon.png',{frameWidth:50, frameHeight:77});
}

function create() {
    this.add.image(400,300,'background_0');
    this.add.image(400,300,'background_1');



    platforms = this.physics.add.staticGroup();
    platforms.create(400,560,'plat_0').setScale(1).refreshBody(); //559
    platforms.create(400,400,'plat_0').setScale(0.5).refreshBody();
    platforms.create(10,250,'plat_0').setScale(0.5).refreshBody();
    platforms.create(790,250,'plat_0').setScale(0.5).refreshBody();
    platforms.create(400,120,'plat_0').setScale(0.5).refreshBody();

    player = this.physics.add.sprite(50,450,'perso');
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player,platforms);
    player.setBounce(0.01);
    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create
    ({
        key:'droite',
        frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
        frameRate: 7,
        repeat: -1
    });
    this.anims.create
    ({
        key:'stop',
        frames: [{key:'perso', frame:0}] ,
        frameRate: 20
    });
    coin= this.physics.add.group
    ({
      key: 'coin',
      repeat: 8,
      setXY: { x:12, y:0, stepX: 70}
    });
    this.physics.add.collider(coin, platforms);
    this.physics.add.overlap(player, coin, get_coin, null, this);
}

function get_coin(player, coin)
{
    coin.disableBody(true,true);
}

function update()
{
      if (cursors.right.isDown)
      {
          player.setVelocityX(200);
          player.setFlipX(false);
          player.anims.play('droite', true);
      }
      else if (cursors.left.isDown)
      {
          player.setVelocityX(-200);
          player.setFlipX(true);
          player.anims.play('droite', true);
      }
      else
      {
          player.setVelocityX(0);
          player.anims.play('stop', true);
      }

      if (cursors.up.isDown && player.body.touching.down) { //cursors.up.isDown && player.body.touching.down
        player.setVelocityY(-900);
      }
      if (cursors.down.isDown) {
        player.setVelocityY(450);
      }
}
