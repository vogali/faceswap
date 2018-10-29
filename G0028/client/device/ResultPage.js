let QRCode = require('../../node_modules/qrcode-generator/qrcode.js');
BasicGame.ResultPage = function(game) {

};

BasicGame.ResultPage.prototype = {
  init: function(params) {
    this.params = params;
    this.chooseIndex = this.params.chooseIndex;
    this.nickName = this.params.nickName.toUpperCase();

    this.common = new Common(this);
    this.qrcodeUrl = this.generateQRcode();
    this.uploadSuccessed = false;
  },
  preload: function() {
    this.load.image('qrcode', this.qrcodeUrl);
  },
  create: function() {
    this.input.onDown.add(function() {
    }, this);

    var scaler = this.scale.userScaler;
    var CenterX = scaler.designRefWidth / 2;
    var CenterY = scaler.designRefHeight / 2;
    var designX, designY, sprite, button;
    var self = this;

    designX = CenterX + 3;
    designY = 919;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'back_' + this.chooseIndex.backImg);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.6;
    sprite.scale.y *= 0.6;

    designX = CenterX + 3;
    //designY = CenterY + 7;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'elementGender_' + this.chooseIndex.gender);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.6;
    sprite.scale.y *= 0.6;

    designX = CenterX + 3;
    //designY = CenterY + 7;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'elementClothes_' + this.chooseIndex.gender + '_' + this.chooseIndex.clothes);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.6;
    sprite.scale.y *= 0.6;

    designX = CenterX + 3;
    //designY = CenterY + 7;

    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'elementHair_' + this.chooseIndex.gender + '_' + this.chooseIndex.hair);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.6;
    sprite.scale.y *= 0.6;

    designX = 236;
    designY = 1201;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'maskSlogan');
    scaler.scaleSprite(sprite);

    designX = CenterX;
    designY = CenterY;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'bg2');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    // designX = 43.3;
    // designY = 32.2;
    // sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'logo');
    // scaler.scaleSprite(sprite);

    designX = 259.7;
    designY = 387.1;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'logo');
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.58;
    sprite.scale.y *= 0.58;

    // designX = 449;
    // designY = 390;
    // sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'textSlogan');
    // scaler.scaleSprite(sprite);

    this.handleNickName();

    designX = 510;
    designY = 940;
    if(this.chooseIndex.gender == 1){
      designY = 965;
    }
    var text = this.add.bitmapText(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'wordFont',
      this.nickName,
      50);
    scaler.scaleSprite(text);
    text.anchor.setTo(0.5);



    // var w = [47, 40, 43, 41, 35, 34, 44, 41, 12, 34, 43, 34, 47, 42, 49, 38, 51, 40, 41, 42, 42, 45, 62, 43, 43, 40];
    // for(var i = 0; i < this.nickNameArray.length; i++) {
    //   var startX = [520, 500, 490, 480, 470, 460, 450, 430, 400, 390];
    //   var totalWidth = 0;
    //   for(var j = 0; j < i; j ++){
    //     var currentIndex = 0;
    //     for(var m = 0; m < 26; m ++){
    //       if(this.nickNameArray[j] == this.letterArray[m]){
    //         currentIndex = m;
    //         break;
    //       }
    //     }
    //     totalWidth += w[currentIndex]*0.66;
    //   }
    //
    //   var totalWidth2 = 0;
    //   for(var j = 0; j <= i; j ++){
    //     var currentIndex2 = 0;
    //     for(var m = 0; m < 26; m ++){
    //       if(this.nickNameArray[j] == this.letterArray[m]){
    //         currentIndex2 = m;
    //         break;
    //       }
    //     }
    //     totalWidth2 += w[currentIndex2]*0.66;
    //   }
    //   console.log("total:" + totalWidth);
    //   //var x0 = (1080 - totalWidth2)/2;
    //   if(this.chooseIndex.gender == 0) {
    //     designX = startX[this.nickNameArray.length - 1] - 30 + totalWidth;
    //   //  designX = (1080 - totalWidth)/2-70;
    //     designY = CenterY + 30;
    //   } else {
    //     designX = startX[this.nickNameArray.length - 1] - 30 + totalWidth;
    //     designY = CenterY + 50;
    //   }
    //   sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'letter' + this.nickNameArray[i]);
    //   scaler.scaleSprite(sprite);
    // //  sprite.anchor.setTo(1);
    //   sprite.scale.x *= 0.66;
    //   sprite.scale.y *= 0.66;
    // }

    if(this.params.number != '') {
      var firstNum = this.params.number.substr(0, 1);
      var secNum = this.params.number.substr(1, 1);
    } else {
      var firstNum = 2;
      var secNum = 0;
    }

    designX = CenterX - 110;
    designY = CenterY + 40;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'number' + firstNum);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.55;
    sprite.scale.y *= 0.55;

    designX = CenterX - 20;
    designY = CenterY + 40;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'number' + secNum);
    scaler.scaleSprite(sprite);
    sprite.scale.x *= 0.55;
    sprite.scale.y *= 0.55;

    // for(var i = 0; i < this.nickNameArray.length; i++) {
    //   designX = 272 + i * 18;
    //   designY = 1491.9;
    //   sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'letter' + this.nickNameArray[i]);
    //   scaler.scaleSprite(sprite);
    //   sprite.anchor.setTo(0.5);
    //   sprite.scale.x *= 0.4;
    //   sprite.scale.y *= 0.4;
    // }


    this.maskScanToShare = this.add.group();

    designX = 538;
    designY = 916.5;
    sprite = this.add.sprite(scaler.scaleX(designX), scaler.scaleY(designY), 'maskScanToShare');
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);
    this.maskScanToShare.add(sprite);

    //create share qrcode and add to maskScanToShare group
    designX = CenterX;
    designY = 772;
    sprite = this.add.image(scaler.scaleX(designX), scaler.scaleY(designY), 'qrcode');
    scaler.scaleSprite(sprite);
    sprite.anchor.setTo(0.5);
    sprite.width = scaler.scaleX(215);
    sprite.height = scaler.scaleY(215);
    this.maskScanToShare.add(sprite);

    this.maskScanToShare.visible = false;

    designX = 390.6;
    designY = 1581;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnGetPoster',
      this.onGetPoster, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

    designX = 704.1;
    designY = 1581;
    sprite = this.add.button(
      scaler.scaleX(designX),
      scaler.scaleY(designY),
      'btnPlayAgain',
      this.onPlayAgain, this,
      0, 0, 1, 0);
    sprite.anchor.setTo(0.5);
    scaler.scaleSprite(sprite);

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
  onExitGame: function() {
    //this.state.start('StartPage');
    window.location.reload();
  },
  onGetPoster: function() {
    var self = this;

    if(!this.uploadSuccessed){
      this.uploadPoster(function(){
        self.uploadSuccessed = true;
        self.maskScanToShare.visible = true;
      });
    } else{
      this.maskScanToShare.visible = true;
    }
  },
  onPlayAgain: function() {
    //this.state.start('StartPage');
    window.location.reload();
  },
  generateQRcode: function() {
    var nickName = this.params.nickName ? this.params.nickName : ' ';
    var number = this.params.number ? this.params.number : '20';
    //var redirectUrl = 'http://' + window.location.host + '/development/games/G0028/qrcode.html?nickName=' + nickName + '&number=' + number;
    var redirectUrl = 'http://projects.36krvm.com/staging/games/G0028/qrcode?uuid=' + BasicGame.sessionUuid;
    console.log(redirectUrl);

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(redirectUrl);
    qr.make();
    var qrcode_url = qr.createDataURL();
    return qrcode_url;
  },
  uploadPoster: function(callback_success, callback_failed){
    var scaler = this.scale.userScaler;
    var posterWidth = 600;
    var posterHeight = 1095;

    var posterCanvas = document.getElementById('posterCanvas');
    posterCanvas.width = scaler.scaleX(posterWidth)/window.devicePixelRatio;
    posterCanvas.height = scaler.scaleY(posterHeight)/window.devicePixelRatio;
    var posterCC = posterCanvas.getContext('2d');
    var deviceCanvas = document.getElementById('devicePage').children[0];
    posterCC.drawImage(deviceCanvas,
      scaler.scaleX(238),
      scaler.scaleY(372),
      scaler.scaleX(posterWidth),
      scaler.scaleY(posterHeight),
      0, 0,
      scaler.scaleX(posterWidth),
      scaler.scaleY(posterHeight));

    var posterData = posterCanvas.toDataURL();
    //console.log(posterData);

    var self = this;
     $.ajax({
         type :"POST",
         dataType: 'json',
         contentType:"application/json",
         data: JSON.stringify({
           'data': posterData,
           'sessionUuid': BasicGame.sessionUuid
         }),
         url: 'http://projects.36krvm.com/staging/games/G0028/services/photo/saveQRCode',
         //url: 'services/photo/saveQRCode',
         async:true,
         success: function(data) {
           console.log("success");
           console.log(data);
           if(callback_success)
             callback_success();
         }, error : function(response) {
           console.log("failed");
           console.log(JSON.stringify(response));
           if(callback_failed)
             callback_failed();
         },complete: function(){
         }
     });
  },
  handleNickName: function() {
    this.letterArray = [];
    for (var i = 0; i < 26; i++) {
      this.letterArray[i] = String.fromCharCode((65 + i));
    }

    this.nickNameArray = [];
    for(var i = 0; i < this.nickName.length; i++) {
      this.nickNameArray[i] = this.nickName.substr(i, 1);
    }

    for(var i = 0; i < this.nickNameArray.length; i++) {
      for(var j = 0; j < this.letterArray.length; j++) {
        if(this.nickNameArray[i] == this.letterArray[j]) {
          this.nickNameArray[i] = this.letterArray[j];
        }
      }
    }
    return this.nickNameArray;
  }
};
