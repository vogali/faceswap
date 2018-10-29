BasicGame.TakePhotoPage = function(game) {
  this.CAPTURE_WIDTH = 1920;
  this.CAPTURE_HEIGHT = 1080;
};

BasicGame.TakePhotoPage.prototype = {
  init: function() {
    document.getElementById('overlay').style.display = 'block';
    this.common = new Common(this);
    this.openCamera();
    this.isCaptured = true;
     $("#flipbook").turn("page", 1);
  },

  create: function() {
    this.input.onDown.add(function() {
    }, this);

    var scaler = this.scale.userScaler;
    var CenterX = scaler.designRefWidth / 2;
    var CenterY = scaler.designRefHeight / 2;
    var designX, designY, sprite, button;
    var self = this;

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bg4');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    designX = CenterX;
    designY = 1385;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'countdown6');
    sprite.anchor.setTo(0.5, 0.5);
    scaler.scaleSprite(sprite);
    this.countDownImg = sprite;

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

    this.uploadPhotoGroup = this.add.group();

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'mask');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.uploadPhotoGroup.add(sprite);

    designX = 43.3;
    designY = 32.2;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'logo');
    scaler.scaleSprite(sprite);

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'circle0');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.uploadPhotoGroup.add(sprite);

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'circleIn');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.add.tween(sprite).to({ angle: 360},
      2000,  Phaser.Easing.Linear.None, true,
      0, -1, false);
    this.uploadPhotoGroup.add(sprite);

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'circleOut');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.add.tween(sprite).to({ angle: -360},
      2000,  Phaser.Easing.Linear.None, true,
      0, -1, false);
    this.uploadPhotoGroup.add(sprite);

    // designX = CenterX;
    // designY = CenterY;
    // sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'circleWhole');
    // sprite.anchor.setTo(0.5);
    // scaler.scaleSprite(sprite);
    // this.uploadPhotoGroup.add(sprite);
    //
    // var mask = this.add.graphics(0, 0);
    // mask.beginFill(0xffffff);
    // sprite.mask = mask;
    // this.waitingProMask = mask;
    // this.uploadPhotoGroup.add(mask);

    designX = CenterX;
    designY = CenterY + 6;
    var style = {
      font: 20 + "px 阿里智能黑",
      fill: "#ffffff",
      align: "center"
    };
    var str = 'loading';
    this.loadingNumber = this.add.text(scaler.scaleX(designX), scaler.scaleY(designY), str, style);
    scaler.scaleSprite(this.loadingNumber);
    this.loadingNumber.anchor.set(0.5);
    this.uploadPhotoGroup.add(this.loadingNumber);

    designX = CenterX;
    designY = CenterY + 230;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'loading');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.uploadPhotoGroup.add(sprite);

    this.uploadPhotoGroup.visible = false;

    this.common.countDown(6, true, function(num) {
      self.countDownImg.loadTexture('countdown' + num);
      if(num < 4) {
        self.countDownImg.y = scaler.scaleY(1421.5);
      }
    },function(num) {
      self.takePhoto();
    });
  },

  update: function(){
    var scaler = this.scale.userScaler;

    if (this.isCaptured) {
      this.overlayCC.drawImage(this.vid,
        (this.vid.width - this.vid.height*this.overlay.width/this.overlay.height)/2,
        0,
        this.vid.height*this.overlay.width/this.overlay.height,
        this.vid.height,
        0, 0,
        this.overlay.width,
        this.overlay.height);
    }
  },

  viewUI: function() {
    var scaler = this.scale.userScaler;
    var CenterX = scaler.designRefWidth / 2;
    var CenterY = scaler.designRefHeight / 2;
    var designX, designY, sprite, button;
    var self = this;

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bg4');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    // designX = CenterX - 35;
    // designY = 860.5;
    // sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'cat');
    // sprite.anchor.setTo(0.5);
    // scaler.scaleSprite(sprite);

    this.bmd = this.make.bitmapData(scaler.scaleX(680), scaler.scaleY(680));
    var bmdSprite = this.add.image(scaler.scaleX(CenterX - 1), scaler.scaleY(500), this.bmd);
    bmdSprite.anchor.set(0.5, 0);
    bmdSprite.scale.x = -1;
    this.bmd.alphaMask(this.overlay, 'photoMask', {x: -87.5, y: 0, width: scaler.scaleX(1080), height: scaler.scaleY(905)});

    designX = CenterX;
    designY = 840.5;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'maskPhoto');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    designX = 325;
    designY = 1389;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnAgain',
      this.onAgain, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.btnAgain = sprite;

    designX = 771.2;
    designY = 1389;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnSubmit',
      this.onSubmitPhoto, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.btnSubmit = sprite;

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

    this.downloadProcessedPhotoGroup = this.add.group();

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'mask');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.downloadProcessedPhotoGroup.add(sprite);

    designX = 43.3;
    designY = 32.2;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'logo');
    scaler.scaleSprite(sprite);

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'circle0');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.downloadProcessedPhotoGroup.add(sprite);

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'circleIn');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.add.tween(sprite).to({ angle: 360},
      2000,  Phaser.Easing.Linear.None, true,
      0, -1, false);
    this.downloadProcessedPhotoGroup.add(sprite);

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'circleOut');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.add.tween(sprite).to({ angle: -360},
      2000,  Phaser.Easing.Linear.None, true,
      0, -1, false);
    this.downloadProcessedPhotoGroup.add(sprite);

    designX = CenterX;
    designY = CenterY + 6;
    var style = {
      font: 20 + "px 阿里智能黑",
      fill: "#ffffff",
      align: "center"
    };
    var str = 'loading';
    this.downloadNumber = this.add.text(scaler.scaleX(designX), scaler.scaleY(designY), str, style);
    scaler.scaleSprite(this.downloadNumber);
    this.downloadNumber.anchor.set(0.5);
    this.downloadProcessedPhotoGroup.add(this.downloadNumber);

    designX = CenterX;
    designY = CenterY + 270;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'download');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.downloadProcessedPhotoGroup.add(sprite);

    this.downloadProcessedPhotoGroup.visible = false;

    this.failedGroup = this.add.group();

    designX = CenterX;
    designY = 840.5;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'failed');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.failedGroup.add(sprite);

    designX = CenterX;
    designY = 1370;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnTakePhotoAgain',
      this.onAgain, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.failedGroup.add(sprite);

    this.failedGroup.visible = false;
  },
  takePhoto: function() {
    this.pauseVideo();
    this.isCaptured = false;

    var scaler = this.scale.userScaler;

    var self = this;
    //step1: take take photo
    this.uploadPhoto(function(){
      self.viewUI();
    }, function(){
      self.viewUI();
      self.btnAgain.visible  = false;
      self.btnSubmit.visible  = false;
      self.failedGroup.visible = true;
    });
    //step2: upload photo animation
    this.uploadPhotoGroup.visible = true;
    //this.waitingAnimation();
    //step3:upload photo success
    //此处的timeout为假设的上传照片的时间
    setTimeout(function() {
      //self.viewUI();
    }, 2000);
  },
  onExitGame: function() {
    //this.state.start('StartPage');
    window.location.reload();
  },
  onAgain: function() {
    this.state.start('TakePhotoPage');
  },
  onSubmitPhoto: function() {
    var self = this;

    this.btnAgain.visible  = false;
    this.btnSubmit.visible  = false;

    this.downloadProcessedPhotoGroup.visible  = true;

    //to submit photo and download processed photo
    //假设用时为2秒
    setTimeout(function() {
      var submitAndDownload = true;
      if(submitAndDownload) {
        document.getElementById('overlay').style.display = 'none';
        self.state.start('CustomizePage');
      } else {
        self.downloadProcessedPhotoGroup.visible  = false;
        self.failedGroup.visible = true;
      }
    }, 2000);
  },

  waitingAnimation: function(){
    var scaler = this.scale.userScaler;
    var CenterX = scaler.designRefWidth / 2;
    var CenterY = scaler.designRefHeight / 2;
    var totalTime = 2*1000;

    var signalT = 20;
    var step = 360/(totalTime/signalT);

    var angle = 270;
    var timer = this.game.time.create(false);
    timer.loop(signalT, function() {
      angle += step;
      if(angle > 270 + 360){
        timer.stop();
      } else {
        this.waitingProMask.arc(
          scaler.scaleX(CenterX),
          scaler.scaleY(CenterY),
          scaler.scaleX(97),
          this.math.degToRad(angle + step*2),
          this.math.degToRad(270),
          true
        );
      }
    }, this);
    timer.start();
  },

  openCamera: function(){
    var self = this;
    this.vid = document.getElementById('videoel');
    this.overlay = document.getElementById('overlay');
    this.overlayCC = this.overlay.getContext('2d');
    this.overlay.style.top = this.scale.userScaler.scaleY(437)/window.devicePixelRatio + 'px';

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
    // check for camerasupport
    if (navigator.getUserMedia) {
      // set up stream
      var videoSelector = {
        video: {
          width: this.CAPTURE_WIDTH,
          height: this.CAPTURE_HEIGHT,
          deviceId: '38bb276fb48d62b3a4ab8f6b9e984278807386a3f6da478297461b9773efcbca'
        }
      };
      if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
        var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
        if (chromeVersion < 20) {
          videoSelector = "video";
        }
      };
      navigator.getUserMedia(videoSelector, function(stream) {
        if (self.vid.mozCaptureStream) {
          self.vid.mozSrcObject = stream;
        } else {
          self.vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
        self.vid.play();
      }, function() {
        insertAltVideo(vid);
        document.getElementById('gum').className = "hide";
        document.getElementById('nogum').className = "nohide";
        alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
      });
    } else {
      insertAltVideo(vid);
      document.getElementById('gum').className = "hide";
      document.getElementById('nogum').className = "nohide";
      alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
    }

    this.vid.addEventListener('canplay', this.startVideo, false);

    this.vid.addEventListener('loadstart', function(){
      console.log('ok');
      clearTimeout(self.restartCamera);
    }, false);

    self.restartCamera = setTimeout(function(){
      self.openCamera();
    }, 3000);
  },

  startVideo: function() {
    // start video
    document.getElementById('videoel').play();
  },

  pauseVideo: function(){
     document.getElementById('videoel').pause();
  },

  uploadPhoto: function(callback_success, callback_failed){
    var photoData = this.overlay.toDataURL();
    //uuid =  Math.uuid();
    let uuid = ShortUUID.uuid();
    //test
    //uuid = '3f2ac44d-10f0-4800-9a83-4fdab6f76e51';
    BasicGame.sessionUuid = uuid;

    var self = this;
    $.ajax({
        type :"POST",
        dataType: 'json',
        contentType:"application/json",
        data: JSON.stringify({
          'data': photoData,
          'sessionUuid': uuid
        }),
        url: 'services/photo/process',
        async:true,
        success: function(data) {
          console.log("success");
          console.log(data);
          if(JSON.stringify(data) != '{}'){
            callback_success();
          } else{
            callback_failed();
          }
        }, error : function(response) {
          callback_failed();
          console.log("failed");
          console.log(JSON.stringify(response));
        },complete: function(){
        }
    });
  },

};
