'use strict';

import "../../server/public/js/libs/head-1.0.3.js";

import zepto from "../../node_modules/zepto/dist/zepto.min.js";
import pixi from  '../../node_modules/phaser-ce/build/custom/pixi.min.js';
import p2 from  '../../node_modules/phaser-ce/build/custom/p2.min.js';
import phaser from  '../../node_modules/phaser-ce/build/custom/phaser-split.min.js';
import canvasInput from  '../../node_modules/canvasinput/CanvasInput.min.js';

import short from '../../node_modules/short-uuid/dist/short-uuid.min.js';
import jquery from '../../node_modules/jquery/dist/jquery.min.js';

// Global variables
//var CTL;

var realWidth, realHeight;
var modelPos;
//window.myUtil = new Utils();
var headPoint;
var requestId = 0;
var agreeNoPrize = false;

// Load up some JS
head.load([jquery, pixi, p2, phaser, canvasInput, short,
  "https://cdnjs.cloudflare.com/ajax/libs/turn.js/3/turn.min.js"
], function() {
  require("./Tracker.js");
  require("./Base.js");
  require('./Boot.js');
  require('./Utils.js');
  require('./Common.js');
  require('./StartPage.js');
  require('./GuidePage.js');
  require('./TakePhotoPage.js');
  require('./CustomizePage.js');
  require('./ResultPage.js');

  require('../../server/public/css/device.css');

  //CTL = ctl.noConflict();

  //console.log(ShortUUID.uuid());

  //var vConsole = new VConsole();
  realWidth = window.innerWidth;
  realHeight = window.innerHeight;

  var designRatio = 1080 / 1920;
  var screenRatio = realWidth / realHeight;
  if (screenRatio > designRatio) {
    realWidth = realHeight * designRatio;
  }
  var game = new Phaser.Game(realWidth, realHeight, Phaser.CANVAS, 'devicePage', {}, true);

  // Add stages
  game.state.add('Boot', BasicGame.Boot);
  game.state.add('StartPage', BasicGame.StartPage);
  game.state.add('GuidePage', BasicGame.GuidePage);
  game.state.add('TakePhotoPage', BasicGame.TakePhotoPage);
  game.state.add('CustomizePage', BasicGame.CustomizePage);
  game.state.add('ResultPage', BasicGame.ResultPage);

  game.state.add('Game', BasicGame.Game);

  // Now start the Boot state.
  game.state.start('Boot');

  document.getElementById('extraElements').innerHTML = '<input id="nickName" type="text" name="nickName" maxlength="10" placeholder="" style="position:absolute;display:none">';
  document.getElementById('extraElements').innerHTML += '<input id="number" type="text" name="number" maxlength="2" placeholder="" style="position:absolute;display:none">';
  document.getElementById('extraElements').innerHTML += '<canvas id="posterCanvas"></canvas>';

  $(function() {
    $("#flipbook").turn({
      width: 658,
      height: 894,
      display: 'single',
      duration: 1000
    });
  });

  document.oncontextmenu = function(e){return false;}
});
