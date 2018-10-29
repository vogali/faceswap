'use strict';

import "../../server/public/js/libs/head-1.0.3.js";

import zepto from "../../node_modules/zepto/dist/zepto.min.js";

require('../../server/public/css/qrcode.css');

// Load up some JS
head.load([
  zepto,
  "//res.wx.qq.com/open/js/jweixin-1.0.0.js"
], function() {
  Zepto(function($) {
    let wechat = require('./WeChat.js');

    // initialize wechat
    wechat.init();
    
    // adjust the photo position
    var poster = document.getElementById('poster');
    let ratio = poster.width / poster.height;
    if (window.innerWidth / window.innerHeight > poster.width / poster.height) {
      let height = window.innerHeight * 0.98;
      let width = height * ratio;
      poster.style.height = height + 'px'; 
      poster.style.top = (window.innerHeight * 0.01) + 'px';
      poster.style.left = (window.innerWidth -  width) / 2 + 'px';
    } else {
      let width = window.innerWidth * 0.98;
      let height = width / ratio;
      poster.style.width = width + 'px'; 
      poster.style.left = (window.innerWidth * 0.01) + 'px';
      poster.style.top = (window.innerHeight -  height) / 2 + 'px';
    }

  });
});
