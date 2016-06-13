class GameState extends Phaser.State {

  preload() {
    this.load.image('star', '../res/star.png')
    this.load.image('cup', '../res/cup.png')
    this.load.physics('starPB', '../res/star.json')
    this.load.physics('cupPB', '../res/cup.json')
    this.load.image('cover', '../res/cover.png')
    this.load.image('logo', '../res/starbucks.png')
  }

  create() {
    this.physics.startSystem(Phaser.Physics.P2JS)
    this.physics.p2.gravity.y = 100
    this.physics.p2.restitution = 0.01

    this.stage.backgroundColor = 0x000

    var cup = this.add.sprite(this.world.centerX, this.world.height - 180, 'cup')
    cup.anchor.setTo(0.5, 0.5)

    this.physics.p2.enable(cup)
    cup.body.clearShapes()
    cup.body.loadPolygon('cupPB', 'cup');
    cup.body.kinematic = true
    this.cup = cup


    this.world.add(cup)
    this.time.events.repeat(500, 10, ()=> {
      this.createStar(this.world.centerX + this.rnd.between(-20, 20), 20)
    })

    this.time.events.add(5500, ()=> {
      this.cover = this.add.sprite(this.world.centerX, 20, 'cover')
      this.cover.anchor.set(0.5, 1)

      this.add.tween(this.cover).to({
        y: 180
      }, 800, Phaser.Easing.Bounce.InOut, true)
    })

    var logo = this.add.image(this.world.width, 0, 'logo')
    logo.anchor.setTo(1, 0)
    logo.scale.setTo(0.3)
    
  }

  createStar(x, y) {
    let star = this.add.sprite(x, y, 'star')
    this.physics.p2.enable(star)
    star.body.clearShapes();
    star.body.loadPolygon('starPB', 'star');
    return star;
  }

  render() {
    this.game.debug.body(this.cup)
  }
}

export default GameState;
