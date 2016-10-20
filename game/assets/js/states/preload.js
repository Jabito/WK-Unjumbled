'use strict';
Game.Preload = {
  preload: function() {

    var ASSETS_IMAGE_URL = ASSETS_URL + 'assets/images/';
    this.game.load.image('audio', ASSETS_IMAGE_URL + 'mk_audio.png');
    this.game.load.image('grub', ASSETS_IMAGE_URL + 'mk_grub.png');
    this.game.load.image('icon', ASSETS_IMAGE_URL + 'mk_icon.png');
    this.game.load.image('question', ASSETS_IMAGE_URL + 'mk_question.png');
    this.game.load.image('home', ASSETS_IMAGE_URL + 'home.png');
    this.game.load.image('next', ASSETS_IMAGE_URL + 'kids_next.png');
    this.game.load.image('green', ASSETS_IMAGE_URL + 'greenbar.png');
    this.game.load.image('kangaroo', ASSETS_IMAGE_URL + 'mk_kangaroo.png');
    
    var otherAssets = ['greenbar', 'pinkbar', 'shuffle', 'imageContainer', 'tilepink', 'tilewhite', 'container'];

    otherAssets.forEach(function(name){
      Game.Preload.load.image(name, ASSETS_IMAGE_URL + name + '.png');
    });
    this.game.load.crossOrigin = true;
    
  },

  create: function(res) {
    this.game.state.start('Unjumble');
  }
};
