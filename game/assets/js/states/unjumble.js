    'use strict';


    Game.Unjumble = {
      areaWidth: 800,
      areaHeight: 400,
      startHeight: 120,
      question:{word: 'Witchetty Grub', image_uri: 'grub'},
      correctWord: [], //Store correct order of Letters here
      shuffledWord: [], //Here is the array of shuffled letters
      answers: [], //Store Empty(To be replaced) Tiles here
      selections: [], //Stores Selection Tiles here
      verify: [], //Add verification tiles here
      startCoordsX: [], //Stores start X Coordinates of Selection Letters
      startCoordsY: [], //Stores start Y Coordinates of Selection Letters
      isDrag: false,
      quesAudioEnabled: false,
      quesAudioIcon: null,

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
        var doneStyle ={ font: '60px Arial', fill: '#F00', wordWrap: true, wordWrapWidth: Game.Quiz.world.width, align: 'center' };
        var done = Game.Quiz.add.text(Game.Quiz.world.centerX, Game.Quiz.world.centerY, 'Quiz Completed', doneStyle);
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

      var style = {font: '24px Arial', fill: '#FFF', wordWrap: true, wordWrapWidth: questionBox.width * 0.6, align: 'center'};
      var question = this.game.add.text(questionBox.x, questionBox.y, 'Find the name of this bush tucker item.', style);
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

      var selections = this.game.add.image(this.game.world.centerX, this.game.world.height * 0.69, 'pinkbar');
      selections.anchor.setTo(0.5);
      selections.scale.set(1, 0.9);

      var image = this.game.add.image(imageContainer.x, imageContainer.y, this.question.image_uri);
      image.anchor.setTo(0.5);
      this.generateAnswerTiles(selections);
    },
    //Generates the entire answer area
    generateAnswerTiles: function(selections){
      var shuffle = this.game.add.image(selections.x + selections.width * 0.42, selections.y + selections.height * 0.22, 'shuffle');
      shuffle.anchor.setTo(0.5);
      shuffle.inputEnabled = true;
      shuffle.events.onInputDown.add(this.shuffleSelections, this);

      this.quesAudioIcon = this.game.add.image(selections.x - selections.width * 0.42, selections.y + selections.height * 0.22, 'audio');
      this.quesAudioIcon.anchor.setTo(0.5);
      this.quesAudioIcon.inputEnabled = true;
      this.quesAudioIcon.alpha = 0;

      this.quesAudioIcon.events.onInputDown.add(this.questionAudio, this);

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
    var tilesWidth = selections.width * 0.7;
    var offset = tilesWidth / this.shuffledWord.length;

    for(var i=0; i<this.shuffledWord.length; i++){
      var tile = this.game.add.image(selections.x - (selections.width * 0.40) + (offset*(i+1)), selections.y - selections.height*0.2,'tilepink');
      tile.anchor.setTo(0.5);
      tile.name = i;
      this.answers.push(tile);
      tile.inputEnabled = true;
    }

    for(var i=0; i<this.shuffledWord.length; i++){
      var style = { font: 'bold 20px Arial', fill: '#0F0'};
      var verif = this.game.add.text(selections.x - (selections.width * 0.40) + (offset*(i+1)), selections.y - selections.height*0.02, this.correctWord[i], style);
      verif.anchor.setTo(0.5);
      verif.alpha = 0;
      this.verify.push(verif);
    }

    for(var i=0; i<this.shuffledWord.length; i++){
      var tile = this.game.add.image(selections.x - (selections.width * 0.40) + (offset*(i+1)), selections.y + selections.height*0.2,'tilewhite', i);
      tile.anchor.setTo(0.5);
      this.selections.push(tile);
      this.logCoords(tile);
      tile.name = i;

      var style = { font: 'bold 20px Arial', fill: '#000'};
      var letter = this.game.add.text(0, 0, this.shuffledWord[i], style);
      letter.anchor.setTo(0.5);

      tile.inputEnabled = true;
      tile.input.pixelPerfectOver = true;
      tile.input.enableDrag(true);

      //Should be able to differentiate click from drag
      tile.events.onDragStop.add(this.selectItem, this);

      tile.addChild(letter);
    }
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
    },
    //Put all click and drag selections here
    selectItem: function(item){
      var alreadySelected = false;
      var index = -1;
      for(var z=0; z<this.answers.length; z++){
        if(this.answers[z].children.length > 0)
          if(this.answers[z].children[0].name == item.name)
          {
            console.log('Item already in answer area');
            alreadySelected = true;
            index = z;
          }
        }

        console.log(this.answers[0]);
    //Check if object is dragged from original position or clicked
    var origX = this.startCoordsX[item.name];
    var origY = this.startCoordsY[item.name];

    if(alreadySelected){
      if(item.x < -item.width/2  || item.x > item.width/2 || item.y < -item.height/2 || item.y > item.height/2){
        console.log('Dragged from answer box');
        this.isDrag = true;
      }
    }else{
      if(item.x < origX-item.width/2 || item.x > origX+item.width/2 || item.y < origY-item.height/2 || item.y > origY+item.height/2){
        console.log('Dragged from question area');
        this.isDrag = true;
      }
    }

    //** ON DRAG EVENT **
    if(this.isDrag){
      var hit=false;
    //Checks if the selected tile hits an answer box
    if(!alreadySelected){
      for(var x=0; x<this.answers.length; x++){
        if(this.checkOverlap(this.answers[x], item)){
          console.log("checking for overlap");
          //Should check if answer box is already occupied
          if(this.answers[x].children.length > 0){
            console.log("Another object is here");
            //Remove and return object inside
            var temp = this.answers[x].children[0];
            console.log(temp);
            console.log(temp.name);
            temp.x = this.startCoordsX[temp.name];
            temp.y = this.startCoordsY[temp.name];
            //this.answers[x].removeChild(temp);
            this.game.world.addChild(temp);
            //Replace with new one
            item.x = 0;
            item.y = 0;
            this.answers[x].addChild(item);
            console.log(item);
          //If not yet occupied
        }else{
          item.x = 0;
          item.y = 0;
          this.answers[x].addChild(item);
        }
        hit=true;
        break;
      }
    }
        //If no answer tiles are hit
        if(!hit){
          item.x = this.startCoordsX[item.name];
          item.y = this.startCoordsY[item.name];
        }
      //If item is in the answers area
    }else{
        //Check if answer box is already occupied
        for(var x=0; x<this.answers.length; x++){
          if(this.checkOverlap(this.answers[x], item)){
            console.log("checking for overlap");
          //Should check if answer box is already occupied
          if(this.answers[x].children.length > 0){
            var parent = item.parent;
            hit=true;
            console.log("Another object is here");
            //Remove and return object inside
            var temp = this.answers[x].children[0];
            parent.addChild(temp);
            //Replace with new one
            item.x = 0;
            item.y = 0;
            this.answers[x].addChild(item);
            console.log(item);
        //If not yet occupied
      }else{
        console.log('No object here yet');
        for(var x=0; x<this.answers.length; x++){
          if(this.checkOverlap(this.answers[x], item)){
            item.x = 0;
            item.y = 0;
            this.answers[x].addChild(item);
            hit=true;
            console.log(this.answers[x]);
            break;
          }
        }
      }
      break;
    }
  }
        //If no answer tiles are hit
        if(!hit){
          console.log("removed from parent");
          this.game.world.addChild(item);
          item.x = this.startCoordsX[item.name];
          item.y = this.startCoordsY[item.name];
          console.log(this.answers[index]);
        }
      }
    //** ON CLICK EVENT **
  }else{    
    //If it is in the selections area
    if(!alreadySelected){
      console.log('First selection');
      for(var x=0; x<this.answers.length; x++){
      //If answerbox has nothing in it yet
      if(this.answers[x].children.length == 0){
        console.log('ItemX = ' + item.x + ' and ItemY = ' + item.y);
        item.x = 0;
        item.y = 0;
        this.answers[x].addChild(item);
        break;
      }
    }
    //Item is already inside an answerbox
  }else{
    for(var y=0; y<this.answers.length; y++){
      if(this.answers[y].children.length > 0){
        if(this.answers[y].children[0].name == item.name){
          item.x = origX;
          item.y = origY;
          //this.answers[y].removeChild(item);
          this.game.world.addChild(item);
          console.log('Second selection');
          alreadySelected = true;
          console.log(this.answers[y]);
          break;
        }
      }
    }
  }
}
this.isDrag = false;
},
    //This logs the startCoordinates of the selection tiles
    logCoords: function(item){
      this.startCoordsX.push(item.x);
      this.startCoordsY.push(item.y);
    },
    //Checks if two sprites collide, returns a boolean
    checkOverlap: function(spriteA, spriteB){
      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();

      return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    checkAnswer: function(){
      console.log(this.answers);
      var isCorrect = true;
      var isComplete = true;
      for(var x=0; x<this.answers.length; x++){
        if(this.answers[x].children.length > 0){
          if(this.answers[x].children[0].children[0].text != this.correctWord[x]){
            this.verify[x].fill = '#F00';
            isCorrect = false;
          }
          this.verify[x].alpha = 1;
        }else{
          isComplete = false;
          break;
        }
      }

      if(isComplete){
        this.quesAudioEnabled = true;
        this.quesAudioIcon.alpha = 1;
        if(isCorrect){
          var style = {font: '24px Arial', fill: '#FFF', align: 'center'};
          var question = this.game.add.text(this.game.world.centerX-50, this.game.world.centerY, 'Correct!!!', style);
        }else{
          var style = {font: '24px Arial', fill: '#FFF', align: 'center'};
          var question = this.game.add.text(this.game.world.centerX-50, this.game.world.centerY, 'Incorrect.', style);
        }
      }else{
        console.log('Answer Incomplete. Please fill out all the boxes.');
      }
    },

    questionAudio: function(){
      if(this.quesAudioEnabled){
        responsiveVoice.speak(this.question.word);
      }
    },

    shuffleSelections: function(){
      var excluded = [];
    //Add tiles that are already in the answer area
    for(var z=0; z<this.selections.length; z++){
      console.log(this.selections[z].parent.length);
      if(this.selections[z].parent.name != '__world'){
        excluded.push(this.selections[z].name);
      }
    }
    console.log(excluded);
    //Loops through the selections
    for(var x=this.selections.length-1; x>0; x--){
      var go = true;
      //Check for exceptions before continuing
      for(var a=0; a<excluded.length; a++){
        if(excluded[a] == this.selections[x].name){
          go = false;
        }
      }

      //Gets a random number
      if(go){
        var y = Math.floor(Math.random() * (x+1));
        var go2 = true;
        for(var b=0; b<excluded.length; b++){
          if(excluded[b] == y){
            go2 = false;
          }
        }
        if(go2){
          var temp = this.selections[x];
          var tempName = this.selections[x].name
          var tempX = this.selections[x].x;
          var tempY = this.selections[x].y;

          this.selections[x].x = this.selections[y].x;
          this.selections[x].y = this.selections[y].y;
          this.selections[x].name = this.selections[y].name;
          this.selections[x] = this.selections[y];
          this.selections[y].x = tempX;
          this.selections[y].y = tempY;
          this.selections[y].name = tempName;
          this.selections[y] = temp;
        }
      }
    }
  }
};
