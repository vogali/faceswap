BasicGame.StartPage = function(game) {

};

BasicGame.StartPage.prototype = {
  create: function() {
    var scaler = this.scale.userScaler;
    var CenterX = scaler.designRefWidth / 2;
    var CenterY = scaler.designRefHeight / 2;
    var designX, designY, sprite, button;

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bg1');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.bg = sprite;

    designX = CenterX;
    designY = 735;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'animation_0');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.visible = true;
    this.animation0 = sprite;

    var mask = this.add.graphics(0, 0);
    mask.beginFill(0xffffff);
    sprite.mask = mask;
    this.nameMask = mask;

    designX = CenterX;
    designY = 884;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'animation_1');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.visible = true;
    this.animation1 = sprite;

    var mask = this.add.graphics(0, 0);
    mask.beginFill(0xffffff);
    sprite.mask = mask;
    this.numberMask = mask;

    designX = CenterX;
    designY = 1316.5;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnStart',
      this.onStart, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    this.wordAnimation();
	},
  onStart: function() {
    this.state.start('GuidePage');
    this.state.start('CustomizePage', true, false, {uuid: '3f2ac44d-10f0-4800-9a83-4fdab6f76e51'});
  },

  wordAnimation: function(){
    var self = this;
    this.nameAnimation(function(){
      self.numberAnimation(function(){
        self.time.events.add(Phaser.Timer.SECOND * 2, function() {
          self.wordAnimation();
        }, this);
      });
    });
  },

  nameAnimation: function(callback){
    var scaler = this.scale.userScaler;
    var totalTime = 1*1000;
    var signalT = 100;
    var w = 0;
    this.nameMask.clear();
    this.numberMask.clear();

    var timer = this.time.create(false);
    timer.loop(signalT, function() {
      w += 30;
      if(w > 232){
        w = 232;
        timer.stop();
        if(callback)
          callback();
      }
      var startX = 425;
      var startY = 714;
      this.nameMask.drawRect(
        scaler.scaleX(startX),
        scaler.scaleY(startY),
        scaler.scaleX(w),
        scaler.scaleY(45),
      );
    }, this);
    timer.start();
  },

  numberAnimation: function(callback){
    var scaler = this.scale.userScaler;
    var totalTime = 1*1000;
    var signalT = 100;
    var w = 0;

    var timer = this.time.create(false);
    timer.loop(signalT, function() {
      w += 80;
      if(w > 181){
        w = 181;
        timer.stop();
        if(callback)
          callback();
      }
      var startX = 450;
      var startY = 810;
      this.numberMask.drawRect(
        scaler.scaleX(startX),
        scaler.scaleY(startY),
        scaler.scaleX(w),
        scaler.scaleY(150),
      );
    }, this);
    timer.start();
  },
};
