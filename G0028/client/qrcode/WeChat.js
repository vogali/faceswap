function WeChat() {
};

WeChat.prototype.init = function() {
  var urlBase = window.location.href;
  urlBase = urlBase.replace(/\/[A-Za-z]*\/games(.)*/, '');
  var url = "wxconfig?url=" + document.location.href;

  $.getJSON(url, function(config) {
    // alert (data.result);
    //alert(JSON.stringify(config));

    config.debug = false;
    config.jsApiList = ['onMenuShareTimeline',
      'onMenuShareAppMessage'
    ]
    wx.config(config);

    wx.ready(function() {

      wx.onMenuShareTimeline({
        title: '定制我的NBA战袍',
        link: window.location.href,
        imgUrl: require('../../server/public/images/qrcode/logo.png'),
        success: function() {
          console.log('share success');
        },
        cancel: function() {},
        complete: function(res) {}
      });

      wx.onMenuShareAppMessage({
        title: 'NBA战袍加身，在哪儿都是赛场!',
        link: window.location.href,
        imgUrl: require('../../server/public/images/qrcode/logo.png'),
        desc: 'Powered by SAP Leonardo',
        type: '',
        dataUrl: '',
        success: function() {
          console.log('share success');
        },
        cancel: function() {},
        complete: function(res) {}
      });

      // play audio here

      //alert("ready");
      //console.log('successed')
    });

    wx.error(function(res) {
      //alert(res);
      console.log('error!!');
    });
  });
}
module.exports = new WeChat();
