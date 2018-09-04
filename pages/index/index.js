//index.js
//获取应用实例
const app = getApp()
var letterList = {
  'a': '.-',
  'b': '-...',
  'c': '-.-.',
  'd': '-..',
  'e': '.',
  'f': '..-.',
  'g': '--.',
  'h': '....',
  'i': '..',
  'j': '.---',
  'k': '-.-',
  'l': '.-..',
  'n': '-.',
  'm': '--',
  'o': '---',
  'p': '.--.',
  'q': '--.-',
  'r': '.-.',
  's': '...',
  't': '-',
  'u': '..-',
  'v': '...-',
  'w': '.--',
  'x': '-..-',
  'y': '-.--',
  'z': '--..',

  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.'
};

Page({
  data: {
    needGetUserInfp:true,
    originalText: '',
    result: ''
  },

  onLoad:function(){
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.setData({
            needGetUserInfp:false
          })
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },

  bindGetUserInfo: function(){
      var that = this;
      that.setData({
        needGetUserInfp: false
      })
  },

  mosiToEnglish: function() {
    var that = this;
    var result = '';
    var mosiString = this.data.originalText;
    var mosiList = mosiString.split(' ');
    for (var i = 0; i < mosiList.length; i++) {
      var letter = mosiList[i];
      console.log('letter:  ' + letter);
      if (letter == '') {
        result += ' ';
      }
      for (var a in letterList) {
        if (letter == letterList[a]) {
          result += a;
          continue
        }
      }
    }

    if (result != null) {
      that.setData({
        result: result
      })
    }
  },

  englishToMosi: function() {
    if (this.data.originalText == null) {
      return
    }
    var that = this;
    var result = '';
    var englishString = this.data.originalText.toLowerCase();
    for (var i = 0; i < englishString.length; i++) {
      if (englishString[i] != ' ') {
        for (var a in letterList) {
          if (englishString[i] == a) {
            result += letterList[a] + ' ';
            continue;
          }
        }
      }
      if (englishString[i] == ' ') {
        result += ' ';
      }

    }
    if (result != null) {
      that.setData({
        result: result
      })
    }
  },

  input: function(e) {
    var that = this;
    that.setData({
      originalText: e.detail.value
    })
  },

  copy: function() {
    if (this.data.result == null) {
      return
    }
    wx.setClipboardData({
      data: this.data.result,
      success: function(res) {}
    })
  },

  deleteOriginalText:function(){
    var that = this;
    that.setData({
      originalText:''
    })
  },
  parse:function(){
    var that = this;
    wx.getClipboardData({
      success: function (res) {
        that.setData({
          originalText: res.data
        })
      }
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '摩斯密码翻译小程序',
      path: '/pages/index/index'
    }
  }

})