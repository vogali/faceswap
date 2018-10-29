BasicGame.CustomizePage = function(game) {

};

BasicGame.CustomizePage.prototype = {
  init: function() {
  //init: function() {
    this.common = new Common(this);
    this.categoryGroup = [];
    this.optionsGroup = [];
    this.selectedCategory = 0;
    this.nickNameInput = document.getElementById('nickName');
    this.numberInput = document.getElementById('number');
    this.nickNameInput.value = '';
    this.numberInput.value = '';

    this.chooseIndex = {
      gender: 0,//0 male, 1 female
      hair: 0,
      backImg: 0,
      clothes: 0,
      number: '20',
      nickName: ''
    };
  },

  preload: function() {
    this.load.image('elementGender_1', './data/' + BasicGame.sessionUuid + '_female.png');
    this.load.image('elementGender_0', './data/' + BasicGame.sessionUuid + '_male.png');
  },

  create: function() {
    this.input.onDown.add(function() {
    }, this);

    var scaler = this.scale.userScaler;
    var CenterX = scaler.designRefWidth / 2;
    var CenterY = scaler.designRefHeight / 2;
    var designX, designY, sprite, button;
    var self = this;

    designX = CenterX - 4;
    designY = 974;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'back_' + this.chooseIndex.backImg);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.525;
    sprite.scale.y *= 0.525;
    this.backImgSprite = sprite;

    designX = CenterX - 6;
    designY = 974;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'elementGender_' + this.chooseIndex.gender);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.525;
    sprite.scale.y *= 0.525;
    this.genderSprite = sprite;

    designX = CenterX - 6;
    designY = 974;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'elementClothes_' + this.chooseIndex.gender + '_' + this.chooseIndex.clothes);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.525;
    sprite.scale.y *= 0.525;
    this.clothesSprite = sprite;

    designX = CenterX - 6;
    designY = 974;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'elementHair_' + this.chooseIndex.gender + '_' + this.chooseIndex.hair);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.525;
    sprite.scale.y *= 0.525;
    this.hairSprite = sprite;

    this.letterSprite = this.add.bitmapData(400, 54);

    designX = CenterX - 20;
    designY = 1005;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), this.letterSprite);
    scaler.scaleSprite(sprite);
    sprite.anchor.setTo(0.5);
    sprite.scale.x *= 0.6;
    sprite.scale.y *= 0.6;
    this.nickNameWord = sprite;

    designX = 500;
    designY = 990;
    var text = this.add.bitmapText(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'wordFont',
      '',
      40);
    text.anchor.setTo(0.5);
    scaler.scaleSprite(text);
    this.nickNameText = text;

    /*
    this.handleNickName();
    this.nickNameSprite = [];
    for(var i = 0; i < this.nickNameArray.length; i++) {
      if(this.chooseIndex.gender == 0) {
        designX = 450 + i * 30;
        designY = CenterY - 50;
      } else {
        designX = 450 + i * 30;
        designY = CenterY + 30;
      }
      sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'letter' + this.nickNameArray[i]);
      scaler.scaleSprite(sprite);
      sprite.anchor.setTo(0.5);
      sprite.scale.x *= 0.6;
      sprite.scale.y *= 0.6;
      this.nickNameSprite.push(sprite);
    }
    */

    var firstNum = this.chooseIndex.number.substr(0, 1);
    var secNum = this.chooseIndex.number.substr(1, 1);

    designX = CenterX - 120;
    designY = 1045;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'number' + firstNum);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.5;
    sprite.scale.y *= 0.5;
    this.firstNum = sprite;

    designX = CenterX - 20;
    designY = 1045;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'number' + secNum);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.5;
    sprite.scale.y *= 0.5;
    this.secNum = sprite;

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bg3');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    // designX = 43.3;
    // designY = 32.2;
    // sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'logo');
    // scaler.scaleSprite(sprite);

    for(var i = 0; i < 6; i++) {
      if(i < 3) {
        designX = 81.6;
        designY = 679 + i * 205;
      } else {
        designX = 994.4;
        designY = 679 + (i - 3) * 205;
      }
      sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'category' + i);
      sprite.anchor.setTo(0.5, 0);
      scaler.scaleSprite(sprite);
      sprite.index = i;
      this.categoryGroup.push(sprite);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(this.onSelectCategory, this);
    }

    this.genderGroup = [];
    for(var i = 0; i < 2; i++) {
      designX = 411.6 + i * 265.4;
      designY = 430;
      sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), '0_' + i);
      sprite.anchor.setTo(0.5);
      scaler.scaleSprite(sprite);
      sprite.visible = false;
      sprite.index = i;
      this.genderGroup.push(sprite);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(this.onSelectOptions, this);
    }
    this.optionsGroup.push(this.genderGroup);

    this.hairGroup = [];
    for(var i = 0; i < 3; i++) {
      designX = 346.6 + i * 195.4;
      designY = 430;
      if(this.chooseIndex.gender == 0) {
        sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), '1_0_' + i);
      } else {
        sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), '1_1_' + i);
      }
      sprite.anchor.setTo(0.5);
      scaler.scaleSprite(sprite);
      sprite.visible = false;
      sprite.index = i;
      this.hairGroup.push(sprite);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(this.onSelectOptions, this);
    }
    this.optionsGroup.push(this.hairGroup);

    this.backImgGroup = [];
    for(var i = 0; i < 5; i++) {
      designX = 245.7 + i * 146.1;
      designY = 430;
      if(this.chooseIndex.gender == 0) {
        sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), '2_0_' + i);
      } else {
        sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), '2_1_' + i);
      }

      sprite.anchor.setTo(0.5);
      scaler.scaleSprite(sprite);
      sprite.visible = false;
      sprite.index = i;
      this.backImgGroup.push(sprite);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(this.onSelectOptions, this);
    }
    this.optionsGroup.push(this.backImgGroup);

    this.clothesGroup = [];
    for(var i = 0; i < 3; i++) {
      designX = 346.6 + i * 195.4;
      designY = 430;
      sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), '3_0_' + i);
      sprite.anchor.setTo(0.5);
      scaler.scaleSprite(sprite);
      sprite.visible = false;
      sprite.index = i;
      this.clothesGroup.push(sprite);
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(this.onSelectOptions, this);
    }
    this.optionsGroup.push(this.clothesGroup);

    this.nickName = [];
    designX = CenterX;
    designY = 430;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bgNickName');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.visible = false;
    this.nickName.push(sprite);
    this.optionsGroup.push(this.nickName);

    designX = CenterX;
    designY = 464;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'placeholderNick');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.visible = false;
    this.placeholderNick = sprite;
    this.nickName.push(sprite);

    this.number = [];
    designX = CenterX;
    designY = 430;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bgNumber');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.visible = false;
    this.number.push(sprite);
    this.optionsGroup.push(this.number);

    designX = CenterX;
    designY = 464;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'placeholderNum');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.visible = false;
    this.placeholderNum = sprite;
    this.number.push(sprite);

    designX = 411.6;
    designY = 430;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'selectedRec');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 1.2;
    sprite.scale.y *= 1.2;
    this.selectedRec = sprite;
    this.selectedRec.visible = false;

    designX = CenterX;
    designY = 424.5;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'beginText');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.text = sprite;
    this.textTween = this.add.tween(this.text).to({alpha: 0.3}, 500,
       Phaser.Easing.Linear.None, true, 0, -1, true);

    designX = CenterX;
    designY = 1518;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'btnOk');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.btnOk = sprite;
    this.btnOk.inputEnabled = true;
    this.btnOk.events.onInputDown.add(this.onOk, this);
    this.btnOk.events.onInputUp.add(this.onNextPage, this);

    designX = 918;
    designY = 190.4;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnAgainPhoto',
      this.onAgainPhoto, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    designX = 918;
    designY = 111.5;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnExitGame',
      this.onExitGame, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    this.numKeyboard = this.createNumKeyboard(338, 1204);
    this.numKeyboard.visible = false;

    this.alphabetKeyboard = this.createAlphabetKeyboard(269, 1133);
    this.alphabetKeyboard.visible = false;
  },
  onAgainPhoto: function() {
    this.nickNameInput.style.display = 'none';
    this.numberInput.style.display = 'none';
    this.state.start('TakePhotoPage');
  },
  onExitGame: function() {
    this.nickNameInput.style.display = 'none';
    this.numberInput.style.display = 'none';
    //this.state.start('StartPage');
    window.location.reload();
  },
  onOk: function() {
    this.nickNameInput.style.display = 'none';
    this.numberInput.style.display = 'none';
    this.btnOk.loadTexture('btnOnOk');
  },
  onNextPage: function() {
    this.nickNameInput.style.display = 'none';
    this.numberInput.style.display = 'none';

    var params = {
      'chooseIndex': this.chooseIndex,
			'nickName': this.nickNameInput.value ? this.nickNameInput.value : '',
      'number': this.numberInput.value
		}
    if(params.number.length == 1){
      params.number = '0' + params.number;
    }
    this.state.start('ResultPage', true, false, params);
  },
  onSelectCategory: function(e) {
    this.selectedCategory = e.index;

    this.textTween.stop();
    this.text.visible = false;
    this.nickNameInput.style.display = 'none';
    this.numberInput.style.display = 'none';
    this.alphabetKeyboard.visible = false;
    this.numKeyboard.visible = false;

    var genderIndex = this.chooseIndex.gender;
    var hairIndex = this.chooseIndex.hair;
    var backIndex = this.chooseIndex.backImg;
    var clothesIndex = this.chooseIndex.clothes;

    if(this.selectedCategory < 4) {
      this.selectedRec.visible = true;

      if(this.selectedCategory == 0) {
        this.selectedRec.x = this.optionsGroup[this.selectedCategory][genderIndex].x;
        this.optionsGroup[this.selectedCategory][genderIndex].loadTexture(this.selectedCategory + '_' + genderIndex + '_on');
      } else if(this.selectedCategory == 1) {
        this.selectedRec.x = this.optionsGroup[this.selectedCategory][hairIndex].x;
        for(var i = 0; i < this.optionsGroup[this.selectedCategory].length; i++) {
          if(i == hairIndex) {
            this.optionsGroup[this.selectedCategory][i].loadTexture(this.selectedCategory + '_' + genderIndex + '_' + i + '_on');
          } else {
            this.optionsGroup[this.selectedCategory][i].loadTexture(this.selectedCategory + '_' + genderIndex + '_' + i);
          }
        }

      } else if(this.selectedCategory == 2) {
        this.selectedRec.x = this.optionsGroup[this.selectedCategory][backIndex].x;
        this.optionsGroup[this.selectedCategory][backIndex].loadTexture(this.selectedCategory + '_' + genderIndex + '_' + backIndex + '_on');
      } else if(this.selectedCategory == 3) {
        this.selectedRec.x = this.optionsGroup[this.selectedCategory][clothesIndex].x;
        this.optionsGroup[this.selectedCategory][clothesIndex].loadTexture(this.selectedCategory + '_' + genderIndex + '_' + clothesIndex + '_on');
      }

    } else {
      this.selectedRec.visible = false;
    }

    for(var i = 0; i < 6; i++) {
      if(i == e.index) {
        this.categoryGroup[i].loadTexture('categoryOn' + i);
        for(var j = 0; j < this.optionsGroup[i].length; j++) {
          this.optionsGroup[i][j].visible = true;
          if(i == 4) {
            this.alphabetKeyboard.visible = true;
            this.nickNameInputs();
            if(this.nickNameInput.value.length == 0){
              this.placeholderNick.visible = true;
            } else{
              this.placeholderNick.visible = false;
            }
          }
          if(i == 5) {
            this.numKeyboard.visible = true;
            this.numberInputs();
            if(this.numberInput.value.length == 0){
              this.placeholderNum.visible = true;
            } else{
              this.placeholderNum.visible = false;
            }
          }
        }

      } else {
        this.categoryGroup[i].loadTexture('category' + i);
        for(var j = 0; j < this.optionsGroup[i].length; j++) {
          this.optionsGroup[i][j].visible = false;
        }
      }
    }
  },
  onSelectOptions: function(e) {
    var scaler = this.scale.userScaler;
    var genderIndex = this.chooseIndex.gender;
    this.selectedRec.x = this.optionsGroup[this.selectedCategory][e.index].x;

    switch (this.selectedCategory) {
      case 0:
        this.chooseIndex.gender = e.index;
        if(this.chooseIndex.gender == 0){
          this.nickNameText.y = scaler.scaleY(990);
        } else {
          this.nickNameText.y = scaler.scaleY(1010);
        }
        break;
      case 1:
        this.chooseIndex.hair = e.index;
        break;
      case 2:
        this.chooseIndex.backImg = e.index;
        break;
      case 3:
        this.chooseIndex.clothes = e.index;
        break;
      default:
    }
    this.updateModel();

    for(var i = 0; i < this.optionsGroup[this.selectedCategory].length; i++) {
      if(this.selectedCategory == 0) {
        if(e.index == i) {
          this.optionsGroup[this.selectedCategory][i].loadTexture(this.selectedCategory + '_' + i + '_on');
        } else {
          this.optionsGroup[this.selectedCategory][i].loadTexture(this.selectedCategory + '_' + i);
        }
      } else {
        if(e.index == i) {
          this.optionsGroup[this.selectedCategory][i].loadTexture(this.selectedCategory + '_' + genderIndex + '_' + i + '_on');
        } else {
          this.optionsGroup[this.selectedCategory][i].loadTexture(this.selectedCategory + '_'  + genderIndex + '_' + i);
        }
      }

    }

  },
  nickNameInputs: function() {
     var scaler = this.scale.userScaler;
     var CenterX = scaler.designRefWidth / 2;
     var self = this;
     this.numberInput.style.display = 'none';

     this.chooseIndex.nickName = this.nickNameInput.value ? this.numberInput.value : '';

     var letterArray = [];
     for (var i = 0; i < 26; i++) {
       letterArray[i] = String.fromCharCode((65 + i));
     }

     this.nickNameInput.oninput = function() {
       //console.log(self.nickNameInput.value);
       self.letterSprite.clear();
       if(/^[a-zA-Z]+$/.test(this.value) == false){
         this.value = this.value.replace(/[^a-zA-Z]/g,'');
       }
       this.value = this.value.toUpperCase();

       for(var i = 0; i < self.nickNameInput.value.length; i++) {
         for(var j = 0; j < letterArray.length; j++) {
           if(self.nickNameInput.value.substr(i, 1) == letterArray[j]) {
             letterArray[j] = self.nickNameInput.value.substr(i, 1);
           }
         }
       }

       var w = [47, 40, 43, 41, 35, 34, 44, 41, 12, 34, 43, 34, 47, 42, 49, 38, 51, 40, 41, 42, 42, 45, 62, 43, 43, 40];
       for(var i = 0; i < self.nickNameInput.value.length; i++) {
         //self.nickNameSprite[i].loadTexture('letter' + self.nickNameInput.value.substr(i, 1).toUpperCase());

         var totalWidth = 0;
         for(var j = 0; j < i; j ++){
           var currentIndex = 0;
           for(var m = 0; m < 26; m ++){
             if(self.nickNameInput.value.substr(j, 1).toUpperCase() == letterArray[m]){
               currentIndex = m;
               break;
             }
           }
           totalWidth += w[currentIndex];
         }
         console.log(totalWidth);
         self.letterSprite.draw('letter' + self.nickNameInput.value.substr(i, 1).toUpperCase(), totalWidth/*i * 40*/, 0);

       }

       var x = [620, 600, 590, 570, 560, 550, 540, 530, 520, 510];
       self.nickNameWord.x = scaler.scaleX(x[this.value.length - 1]);
     };

     this.nickNameInput.style.display = 'block';
     this.nickNameInput.style.width =  scaler.scaleX(556) + 'px';
     this.nickNameInput.style.height = scaler.scaleY(70) + 'px';
     this.nickNameInput.style.left = scaler.scaleX(262) + 'px';
     this.nickNameInput.style.top = scaler.scaleY(428) + 'px';
     this.nickNameInput.style.fontSize = 50 * scaler.hScale() + 'px';
     this.nickNameInput.style.backgroundColor = 'transparent';
     this.nickNameInput.style.textAlign = 'center';
     this.nickNameInput.style.color = '#ffffff';
     this.nickNameInput.style.borderStyle = "none";

   },
   numberInputs: function() {
     var scaler = this.scale.userScaler;
     var self = this;
     this.nickNameInput.style.display = 'none';

     this.numberInput.oninput = function() {
       var match = self.numberInput.value.match(/^\d+$/);
       if(!match){
         self.numberInput.value = self.numberInput.value.replace(/[^\d]/g,'');
       }
       if(self.numberInput.value.length == 1) {
         self.secNum.loadTexture('number' + self.numberInput.value);
         self.firstNum.loadTexture('number0');
       } else if(self.numberInput.value.length == 2) {
         self.firstNum.loadTexture('number' + self.numberInput.value.substr(0, 1));
         self.secNum.loadTexture('number' + self.numberInput.value.substr(1, 1));
       } else if(self.numberInput.value.length == 0) {
         self.firstNum.loadTexture('number2');
         self.secNum.loadTexture('number0');
       }
     }

     this.numberInput.style.display = 'block';
     this.numberInput.style.width =  scaler.scaleX(460) + 'px';
     this.numberInput.style.height = scaler.scaleY(73) + 'px';
     this.numberInput.style.left = scaler.scaleX(310) + 'px';
     this.numberInput.style.top = scaler.scaleY(428) + 'px';
     this.numberInput.style.fontSize = 50 * scaler.hScale() + 'px';
     this.numberInput.style.backgroundColor = 'transparent';
     this.numberInput.style.textAlign = 'center';
     this.numberInput.style.color = '#ffffff';
     this.numberInput.style.borderStyle = "none";
   },
   updateModel: function() {
     this.backImgSprite.loadTexture('back_' + this.chooseIndex.backImg);
     this.genderSprite.loadTexture('elementGender_' + this.chooseIndex.gender);
     this.hairSprite.loadTexture('elementHair_' + this.chooseIndex.gender + '_' + this.chooseIndex.hair);
     this.clothesSprite.loadTexture('elementClothes_' + this.chooseIndex.gender + '_' + this.chooseIndex.clothes);
     this.firstNum.loadTexture('number' + this.chooseIndex.number.substr(0, 1));
     this.secNum.loadTexture('number' + this.chooseIndex.number.substr(1, 1));
   },
   handleNickName: function() {
     this.letterArray = [];
     for (var i = 0; i < 26; i++) {
       this.letterArray[i] = String.fromCharCode((65 + i));
     }

     this.nickNameArray = [];
     for(var i = 0; i < this.chooseIndex.nickName.length; i++) {
       this.nickNameArray[i] = this.chooseIndex.nickName.toUpperCase().substr(i, 1);
     }

     for(var i = 0; i < this.nickNameArray.length; i++) {
       for(var j = 0; j < this.letterArray.length; j++) {
         if(this.nickNameArray[i] == this.letterArray[j]) {
           this.nickNameArray[i] = this.letterArray[j];
         }
       }
     }
     return this.nickNameArray;
   },

   createNumKeyboard: function(x, y){
     var group = this.add.group();
     var scaler = this.scale.userScaler;
     var CenterX = scaler.designRefWidth / 2;
     var CenterY = scaler.designRefHeight / 2;
     var designX, designY, sprite, button;

     designX = 0;
     designY = 0;
     sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bgNumKeyboard');
     scaler.scaleSprite(sprite);
     group.add(sprite);


     for(var i = 0; i < 10; i ++){
       var index = (i + 1);
       if(i == 9){
         index = 0;
       }
       designX = 70.5 + 55*(i%5);
       designY = 61.5 + 54*parseInt(i/5);
       sprite = this.add.button(
         scaler.scaleX(designX),
         scaler.scaleY(designY),
         'num' + index,
         this.onNum, this,
         0, 0, 1, 0);
       sprite.anchor.setTo(0.5);
       scaler.scaleSprite(sprite);
       sprite.index = index;
       group.add(sprite);
     }

     designX = 344;
     designY = 88;
     sprite = this.add.button(
       scaler.scaleX(designX),
       scaler.scaleY(designY),
       'btnDelete',
       this.onDeleteNum, this,
       0, 0, 1, 0);
     sprite.anchor.setTo(0.5);
     scaler.scaleSprite(sprite);
     group.add(sprite);

     group.x = scaler.scaleX(x);
     group.y = scaler.scaleY(y);
     return group;
   },

   createAlphabetKeyboard: function(x, y){
     var group = this.add.group();
     var scaler = this.scale.userScaler;
     var CenterX = scaler.designRefWidth / 2;
     var CenterY = scaler.designRefHeight / 2;
     var designX, designY, sprite, button;

     designX = 0;
     designY = 0;
     sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bgAlphabetKeyboard');
     scaler.scaleSprite(sprite);
     group.add(sprite);

     for(var i = 0; i < 26; i ++){
       var row, rowNum, lastRowNum, startX;
       if(i < 10){
         row = 0;
         rowNum = 10;
         lastRowNum = 0;
         startX = 52;
       } else if(i >= 10 && i < 19){
         row = 1;
         rowNum = 9;
         lastRowNum = 10;
         startX = 75;
       } else{
         row = 2;
         rowNum = 7;
         lastRowNum = 19;
         startX = 101;
       }
       designX = startX + 48*((i - lastRowNum)%rowNum);
       designY = 57.5 + 51*row;
       sprite = this.add.button(
         scaler.scaleX(designX),
         scaler.scaleY(designY),
         'alphabet' + i,
         this.onAlphabet, this,
         0, 0, 1, 0);
       sprite.anchor.setTo(0.5);
       scaler.scaleSprite(sprite);
       sprite.index = i;
       group.add(sprite);
     }

     designX = 452;
     designY = 158.5;
     sprite = this.add.button(
       scaler.scaleX(designX),
       scaler.scaleY(designY),
       'btnDeleteSmall',
       this.onDeleteAlphabet, this,
       0, 0, 1, 0);
     sprite.anchor.setTo(0.5);
     scaler.scaleSprite(sprite);
     group.add(sprite);

     designX = 226.5;
     designY = 208;
     sprite = this.add.button(
       scaler.scaleX(designX),
       scaler.scaleY(designY),
       'btnSpace',
       this.onSpace, this,
       0, 0, 1, 0);
     sprite.anchor.setTo(0.5);
     scaler.scaleSprite(sprite);
     group.add(sprite);

     designX = 428;
     designY = 208;
     sprite = this.add.button(
       scaler.scaleX(designX),
       scaler.scaleY(designY),
       'btnClear',
       this.onClear, this,
       0, 0, 1, 0);
     sprite.anchor.setTo(0.5);
     scaler.scaleSprite(sprite);
     group.add(sprite);

     group.x = scaler.scaleX(x);
     group.y = scaler.scaleY(y);
     return group;
   },

   updateNumber: function(){
     if(this.numberInput.value.length == 1) {
       this.secNum.loadTexture('number' + this.numberInput.value);
       this.firstNum.loadTexture('number0');
     } else if(this.numberInput.value.length == 2) {
       this.firstNum.loadTexture('number' + this.numberInput.value.substr(0, 1));
       this.secNum.loadTexture('number' + this.numberInput.value.substr(1, 1));
     } else if(this.numberInput.value.length == 0) {
       this.firstNum.loadTexture('number2');
       this.secNum.loadTexture('number0');
     }
   },

   onNum: function(e){
     console.log(e.index);
     if(this.numberInput.value.length < 2){
       this.numberInput.value += e.index;
     }
     if(this.numberInput.value.length >= 0){
       this.placeholderNum.visible = false;
     }

     this.updateNumber();
   },

   onDeleteNum: function(){
     var str = this.numberInput.value;
     this.numberInput.value = str.substr(0, str.length - 1);
     if(this.numberInput.value.length == 0){
       this.placeholderNum.visible = true;
     }
     this.updateNumber();
   },

   onAlphabet: function(e){
     var alphabetList = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
                         'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
                         'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
     if(this.nickNameInput.value.length < 10){
       this.nickNameInput.value += alphabetList[e.index];
     }
     if(this.nickNameInput.value.length >= 0){
       this.placeholderNick.visible = false;
     }

     this.nickNameText.setText(this.nickNameInput.value);
   },

   onDeleteAlphabet: function(){
     var str = this.nickNameInput.value;
     this.nickNameInput.value = str.substr(0, str.length - 1);
     if(this.nickNameInput.value.length == 0){
       this.placeholderNick.visible = true;
     }
     this.nickNameText.setText(this.nickNameInput.value);
   },

   onSpace: function(){
     if(this.nickNameInput.value.length < 10){
       this.nickNameInput.value += ' ';
     }
     if(this.nickNameInput.value.length >= 0){
       this.placeholderNick.visible = false;
     }
     this.nickNameText.setText(this.nickNameInput.value);
   },

   onClear: function(){
     this.nickNameInput.value = '';
     this.placeholderNick.visible = true;
     this.nickNameText.setText(this.nickNameInput.value);
   }
};
