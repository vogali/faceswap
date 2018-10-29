BasicGame.GuidePage = function(game) {
  this.timer;
};

BasicGame.GuidePage.prototype = {
  init: function() {
    var scaler = this.scale.userScaler;
    document.getElementById('flipbook').style.display = 'block';
    document.getElementById('flipbook').style.backgroundColor = 'white';
    document.getElementById('flipbook').style.left = scaler.scaleX(203) + 'px';
    document.getElementById('flipbook').style.top = scaler.scaleY(273) + 'px';

  },
  create: function() {
    var scaler = this.scale.userScaler;
    var CenterX = scaler.designRefWidth / 2;
    var CenterY = scaler.designRefHeight / 2;
    var designX, designY, sprite, button;

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bg5');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    designX = CenterX;
    designY = 422;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'rec');
    sprite.anchor.setTo(0.5, 0);
    scaler.scaleSprite(sprite);

    this.animationLeftGroup = this.add.group();
    for(var i = 0; i < 7; i++) {
      designX = 112.4;
      designY = CenterY - 127;
      sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'flow' + i);
      sprite.anchor.setTo(0.5);
      sprite.index = i;
      scaler.scaleSprite(sprite);
      this.animationLeftGroup.add(sprite);
    }

    this.animationRightGroup = this.add.group();
    for(var i = 0; i < 7; i++) {
      designX = 984.5;
      designY = CenterY - 127;
      sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'flow' + i);
      sprite.anchor.setTo(0.5);
      sprite.index = i;
      scaler.scaleSprite(sprite);
      sprite.angle = 180;
      this.animationRightGroup.add(sprite);
    }

    this.animationLeft();
    this.animationRight();
    this.guideGroup = this.add.group();

    /*designX = CenterX;
    designY = CenterY - 127;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'guide0');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.532;
    sprite.scale.y *= 0.506;
    this.guideGroup.add(sprite);
    this.guidePictrue = sprite;*/

    designX = CenterX;
    designY = 1520;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'guideText0');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.guideGroup.add(sprite);
    this.guideText = sprite;

    this.animationGuide();

    // designX = CenterX;
    // designY = 1610.5;
    // sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'textLine');
    // sprite.anchor.setTo(0.5);
    // scaler.scaleSprite(sprite);
    // this.guideGroup.add(sprite);

    designX = CenterX;
    designY = 328;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnIgnore',
      this.onIgnore, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.guideGroup.add(sprite);

    designX = CenterX + 18;
    designY = 328;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'arrow0');
    sprite.anchor.setTo(0, 0.5);
    scaler.scaleSprite(sprite);
    this.arrow = sprite;
    this.arrow.inputEnabled = true;
    this.arrow.events.onInputDown.add(this.onIgnore, this);
    this.guideGroup.add(this.arrow);

    this.arrowAnimation();

    this.startGroup = this.add.group();

    designX = CenterX;
    designY = 878.5;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'guide3');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.532;
    sprite.scale.y *= 0.506;
    this.startGroup.add(sprite);

    designX = CenterX;
    designY = 1520;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'guideText3');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.startGroup.add(sprite);

    designX = CenterX;
    designY = 340;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnStartSmall',
      this.onStart, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.startGroup.add(sprite);

    this.startGroup.visible = false;

    designX = 917;
    designY = 110.5;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnExitGame',
      this.onExitGame, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
	},
  animationLeft: function() {
    var self = this;
    this.leftInterval = setInterval(function() {
      for(var i = 0; i < 7; i++) {
        self.animationLeftGroup.children[i].x -= (i + 1) * 4;
        if(self.animationLeftGroup.children[i].x + 1 / 2 * self.animationLeftGroup.children[i].width < 0) {
          self.animationLeftGroup.children[i].x = 224.8;
        }
      }
    }, 120);
  },
  animationRight: function() {
    var self = this;
    this.rightInterval = setInterval(function() {
      for(var i = 0; i < 7; i++) {
          self.animationRightGroup.children[i].x += (i + 1) * 4;
          if(self.animationRightGroup.children[i].x - 1 / 2 * self.animationRightGroup.children[i].width > 1080) {
            self.animationRightGroup.children[i].x = 889;
          }
      }
    }, 120);
  },
  animationGuide: function() {
    var self = this;
    this.timer = this.time.create(false);
    var time = 0;
    this.timer.loop(1000, function() {
      time ++;
      if(time == 3) {
        //self.guidePictrue.loadTexture('guide1');
        $('#flipbook').turn('next');
        self.guideText.loadTexture('guideText1');
      } else if(time == 6) {
        //self.guidePictrue.loadTexture('guide2');
        $('#flipbook').turn('next');
        self.guideText.loadTexture('guideText2');
      } else if(time == 9) {
        self.guideGroup.visible = false;
        //self.guidePictrue.loadTexture('guide3');
        $('#flipbook').turn('next');
        self.guideText.loadTexture('guideText3');
        self.startGroup.visible = true;
        this.timer.stop();
      }
    }, this);
    this.timer.start();
  },
  arrowAnimation: function() {
    var self = this;
    var index = this.arrow.key.substr(5);
    this.arrowLoop = setInterval(function() {
      if(index == 0) {
        self.arrow.loadTexture('arrow1');
        index = 1;
      } else if(index == 1) {
        self.arrow.loadTexture('arrow0');
        index = 0;
      }
    }, 1000);
  },
  onIgnore: function() {
    this.timer.stop();
    this.guideGroup.visible = false;
    this.startGroup.visible = true;
  },
  onStart: function() {
    clearInterval(this.leftInterval);
    clearInterval(this.rightInterval);
    clearInterval(this.arrowLoop);
    document.getElementById('flipbook').style.display = 'none';
    this.state.start('TakePhotoPage');
    //this.state.start('CustomizePage');
  },
  onExitGame: function() {
    window.location.reload();
  },
};
