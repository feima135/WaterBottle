g_MaxBottles = 5;
g_RNGBottleArray = [];

/////////////////
// HOME PAGE
/////////////////
class HomePage extends Phaser.Scene {
  constructor() {
    super('HomePage')
  }

  preload() {

    for(let i = 0; i < g_MaxBottles; ++i)
    {
      let imageName = 'assets/WaterBottles/Bottle_' + i + '.png';
      this.load.image('Bottle' + i, imageName);
      g_RNGBottleArray.push(i);
    }

    // shuffle the bottle array
    for(let index = g_RNGBottleArray.length - 1; index > 0; --index)
    {
      let rngIndex =  Math.floor(Math.random() * (index + 1));
      let temp = g_RNGBottleArray[index];
      g_RNGBottleArray[index] = g_RNGBottleArray[rngIndex];
      g_RNGBottleArray[rngIndex] = temp;
     }
  }

  create() 
  {

    let startPosX = 100;
    let startPosY = 100; 
    let gap = 130;
    let maxRow = 2;
    let maxCol = 3;
    let bottleIndex = 0;

    for (let rol = 0; rol < maxRow; ++rol) {
      for (let col = 0; col < maxCol; ++col) {

        let testBtn = this.add.image(startPosX + col * gap, startPosY + rol * gap, "Bottle" + g_RNGBottleArray[bottleIndex]);
        testBtn.setInteractive();
        testBtn.on('pointerdown', this.buttonAnimEffect.bind(this, testBtn, null));
        testBtn.setScale(0.2);

        ++bottleIndex;

      }
    }
  }

  createAllInputButtons()
  {

  }

  /***************************/
  // Generic Btn Click Effect
  /***************************/
  buttonAnimEffect(img, callback) {
    this.tweens.add({
      targets: img,
      scaleX: img.scaleY * 1.2,
      scaleY: img.scaleX * 1.2,
      duration: 80,
      onComplete: callback,
      yoyo: true
    });

    //this.sound.play('ButtonClick_SFX');
  }
}

var config =
{
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [HomePage]
}

var game = new Phaser.Game(config);
game.scene.start('HomePage');
