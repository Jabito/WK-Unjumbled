'use strict';


Game.Unjumble = {
  areaWidth: 800,
  areaHeight: 400,
  startHeight: 120,
  question:{word: 'Witchetty Grub', image_uri: 'grub'},
  word: 'Witchetty Grub',
  correctWord: [],
  shuffledWord: [],
  blankContainer: [],
  charContainer: [],

  init: function() {
    wingaru.games.on.callInitialized('au.com.wingaru.unjumble', this.initialize);
  },

  initialize: function(res) {
    console.log('Initialize', res);
    // if (typeof(res.data)!='undefined') {
    //   Game.Quiz.type = res.data.type;
    //   Game.Quiz.options = res.data.options;
    //   Game.Quiz.options_type = res.data.options_type;
    //   Game.Quiz.question = res.data.question;
    //   Game.Quiz.answerSequence = res.data.answer_sequence;
      //display the quiz option screen
      //layout base on number of options using this.options.length

    },

    next: function(res) {
      if (res.status) {
        Game.Quiz.state.start('Unjumble', true, false);
      } else {
        var doneStyle ={ font: "60px Arial", fill: "#F00", wordWrap: true, wordWrapWidth: Game.Quiz.world.width, align: "center" };
        var done = Game.Quiz.add.text(Game.Quiz.world.centerX, Game.Quiz.world.centerY, "Quiz Completed", doneStyle);
        done.anchor.setTo(0.5);
        console.log('Result', res.score, res.percentageScore);
        console.log('Game Over');
      }
    },

    create: function() {
      this.initializeQuiz();
      this.generateQuestion();
      this.generateFrames();
    },

    update: function(){

    },
  //Initializes common variables that will be removed on deployment
  initializeQuiz: function(){
    var green = this.game.add.image(this.game.world.centerX, this.game.world.height * 0.93, 'green');
    green.anchor.setTo(0.5);
    var kangaroo = this.game.add.image(10,0, 'kangaroo');
    kangaroo.scale.set(0.8);
    var home = this.game.add.image(this.game.world.centerX * 0.15, this.game.world.height * 0.935, 'home');
    home.anchor.setTo(0.5);
    var next = this.game.add.image(this.game.world.width * 0.93, this.game.world.height * 0.93, 'next');
    next.anchor.setTo(0.5);
    next.scale.set(0.15);
    next.inputEnabled = true;
    next.events.onInputDown.add(function(){
      this.checkAnswer();
    }, this);
  },
  //Generates the question box at the top
  generateQuestion: function(text){
    var questionBox = this.game.add.image(this.game.world.centerX, this.game.world.centerY * 0.25, 'question');
    questionBox.anchor.setTo(0.5);
    var questionAudio = this.game.add.image(questionBox.x + questionBox.width * 0.45, questionBox.y + questionBox.height * 0.2, 'audio');
    questionAudio.anchor.setTo(0.5);
    var questionIcon = this.game.add.image(questionBox.x + questionBox.width * 0.36, questionBox.y + questionBox.height * 0.2, 'icon');
    questionIcon.anchor.setTo(0.5);

    var style = {font: "24px Arial", fill: "#FFF", wordWrap: true, wordWrapWidth: questionBox.width * 0.6, align: "center"};
    var question = this.game.add.text(questionBox.x, questionBox.y, "Find the name of this bush tucker item.", style);
    question.anchor.setTo(0.5);
  },
  //Generates the layout design of the module
  generateFrames: function(){
    var wholeContainer = this.game.add.image(this.game.world.centerX, this.game.world.centerY + this.game.world.height * 0.025, 'container');
    wholeContainer.anchor.setTo(0.5);
    wholeContainer.scale.set(1, 0.75);

    var imageContainer = this.game.add.image(this.game.world.centerX, this.game.world.centerY - this.game.world.height * 0.1, 'imageContainer');
    imageContainer.anchor.setTo(0.5);
    imageContainer.scale.set(0.8);

    var answerContainer = this.game.add.image(this.game.world.centerX, this.game.world.height * 0.69, 'pinkbar');
    answerContainer.anchor.setTo(0.5);
    answerContainer.scale.set(1, 0.9);

    var image = this.game.add.image(imageContainer.x, imageContainer.y, this.question.image_uri);
    image.anchor.setTo(0.5);
    this.generateAnswerTiles(answerContainer);
  },
  //Generates the entire answer area
  generateAnswerTiles: function(answerContainer){
    var shuffle = this.game.add.image(answerContainer.x + answerContainer.width * 0.42, answerContainer.y + answerContainer.height * 0.22, 'shuffle');
    shuffle.anchor.setTo(0.5);

    var audio = this.game.add.image(answerContainer.x - answerContainer.width * 0.42, answerContainer.y + answerContainer.height * 0.22, 'audio');
    audio.anchor.setTo(0.5);

    var wordCaps = this.question.word.toUpperCase();
    this.shuffledWord = wordCaps.split('');
    this.correctWord = wordCaps.split('');
    //Removes blank spaces in the array of letters on first invoke
    for(var x=0; x<this.shuffledWord.length; x++){
      if(this.shuffledWord[x] === ' '){
        this.shuffledWord.splice(x, 1);
        this.correctWord.splice(x, 1);
      }
    }
    //Shuffles the letters
    this.shuffleLetters(this.shuffledWord);

    //Creates the tile holders
    var tilesWidth = answerContainer.width * 0.7;
    var offset = tilesWidth / this.shuffledWord.length+1;

    for(var i=0; i<this.shuffledWord.length; i++){
      var tile = this.game.add.image(answerContainer.x - (answerContainer.width * 0.35) + (offset*i+1), answerContainer.y - answerContainer.height*0.2,'tilepink');
      tile.anchor.setTo(0.5);
      this.blankContainer.push(tile);
    }

    for(var i=0; i<this.shuffledWord.length; i++){
      var tile = this.game.add.image(answerContainer.x - (answerContainer.width * 0.35) + (offset*i+1), answerContainer.y + answerContainer.height*0.2,'tilewhite');
      tile.anchor.setTo(0.5);
      this.charContainer.push(tile);

      var style = { font: 'bold 20px Arial', fill: '#000'};
      var letter = this.game.add.text(0, 0, this.shuffledWord[i], style);
      letter.anchor.setTo(0.5);

      tile.addChild(letter);
    }



    console.log(offset);
    console.log(this.shuffledWord);
  },
  //Shuffles an array of letters
  shuffleLetters: function(letters){
    for(var x = letters.length-1; x>0; x--){
      var y = Math.floor(Math.random() * (x+1));
      var temp = letters[x];
      letters[x] = letters[y];
      letters[y] = temp;
    }
    return letters;
  }
};
