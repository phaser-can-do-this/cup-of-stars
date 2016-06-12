class GameState extends Phaser.State {

  preload() {
    this.load.image('star', '../res/star.png')
    this.load.physics('physicsData', '../res/star.json')
  }

  create() {
    this.physics.startSystem(Phaser.Physics.P2JS)

    this.stage.backgroundColor = 0xdddddd

    this.physics.p2.gravity.y = 100
    this.physics.p2.restitution = 0.5


    for (let i = 0; i < 50; i++) {
      let star = this.add.sprite(this.world.randomX, this.world.randomY, 'star')
      star.tint = 0xA18F61
      this.physics.p2.enable(star)
      star.body.clearShapes();

      star.body.loadPolygon('physicsData', 'star');

    }

  }
}

export default GameState;
