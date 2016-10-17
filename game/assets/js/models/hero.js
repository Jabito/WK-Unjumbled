var Hero = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'images', frame);
  console.log('Hero has been created');
};
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.changeSize = function() {
	this.scale.x = this.scale.y = game.rnd.realInRange(2, 4);
  console.log('Changed size');
}
