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
var score=0;

function init() {
            var platforms;
            var player;
            var cursors;
            var coins;
            var sprint;
            var scoreText;
        }



function preload(){
            this.load.image('background_0','assets/sky.png');
            this.load.image('background_1','assets/sol_1.png');
            this.load.image('plat_0','assets/plat_base.png');
            this.load.image('plat_1','assets/platform_square.png');
            this.load.image('coin','assets/gold.png');
            this.load.spritesheet('perso','assets/spritesheet_hamon.png',{frameWidth:50, frameHeight:77});
            this.load.image('champ','assets/champ.png');
        }



function create() {
            this.add.image(400,300,'background_0');
            this.add.image(400,300,'background_1');


            platforms = this.physics.add.staticGroup();
            platforms.create(350,50,'plat_1').setScale(1).refreshBody();
            platforms.create(150,400,'plat_1').setScale(1).refreshBody();
            platforms.create(10,520,'plat_1').setScale(1).refreshBody(); //559
            platforms.create(400,400,'plat_1').setScale(1).refreshBody();
            platforms.create(10,250,'plat_1').setScale(1).refreshBody();
            platforms.create(710,250,'plat_1').setScale(1).refreshBody();
            platforms.create(680,390,'plat_1').setScale(1).refreshBody();
            platforms.create(300,520,'plat_1').setScale(1).refreshBody();
            platforms.create(400,610,'plat_0').setScale(1).refreshBody();

            player = this.physics.add.sprite(50,450,'perso').setSize(0,50).setOffset(0,28);
            player.setCollideWorldBounds(true);

            this.physics.add.collider(player,platforms);
            player.setBounce(0.01);
            cursors = this.input.keyboard.createCursorKeys();
            scoreText=this.add.text(16,16,'score : 0');
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
            coins= this.physics.add.group
            ({
              key: 'coin',
              repeat: 8,
              setXY: { x:12, y:0, stepX: 100}
            });
            coins.children.iterate(function (child) {
              child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });
            this.physics.add.collider(coins, platforms);
            this.physics.add.overlap(player, coins, get_coin, null, this);
            champs = this.physics.add.group();
            this.physics.add.collider(champs, platforms);
            this.physics.add.collider(player, champs, hitChamp, null, this);
        }

function get_coin(player, coin)
        {
          coin.disableBody(true,true);
          score += 10;
          scoreText.setText('score :' + score);
          if (coins.countActive(true) == 1 )
          {
            coins.children.iterate( function(child) {
              child.enableBody(true, child.x, 0, true, true);
            })
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            var champ = champs.create(x, 16, 'champ');
            champ.setBounce(1);
            champ.setCollideWorldBounds(true);
            champ.setVelocity(Phaser.Math.Between(-200, 200), 20);
          }
        }


function hitChamp (player, champ)
        {
            this.physics.pause();
            player.setTint(0xff0000);
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


function update()
        {
              if (cursors.right.isDown)
              {
                  player.setVelocityX(200+sprint);
                  player.setFlipX(false);
                  player.anims.play('droite', true);
              }
              else if (cursors.left.isDown)
              {
                  player.setVelocityX(-200-sprint);
                  player.setFlipX(true);
                  player.anims.play('droite', true);
              }
              else
              {
                  player.setVelocityX(0);
                  player.anims.play('stop', true);
              }

              if (cursors.space.isDown && player.body.touching.down) { //cursors.up.isDown && player.body.touching.down
                player.setVelocityY(-900);
              }
              if (cursors.down.isDown) {
                player.setVelocityY(450);
              }
              if (cursors.shift.isDown)
              {
                sprint=200;
              }
              else {
                sprint=0;
              }
        }
