Game.Boot = {
	init: function(){
    console.log('Wingaru Integration', wingaru);
    this.game.stage.backgroundColor = '#CCC';
    var gameId = 'au.com.wingaru.unjumble';

    wingaru.games.on.callInitialized(gameId, function(res) {
        console.log('Phaser Init', res);

        wingaru.games.on.callNext(gameId, {answer: 'Phaser'}, function(res) {
            console.log('Phaser Listen', res);
        });
    });
	},

	preload: function() {

	},

	create: function() {
        this.game.state.start('Preload');
	}
};
