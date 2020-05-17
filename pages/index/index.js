//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id0:"0",
    id1:"1",
    id2:"2",
    id3:"3",
    id4:"4",
    id5:"5",
    id6:"6",
    id7:"7",
    id8:"8",
    id9:"9",
    dot:".",
    plus:"+",
    substring:"-",
    mutiply:"x",
    divide:"÷",
    equal:"=",
    clear:"c",
    screenData:"",
    nums:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  clickButton: function (e) {
    var id = e.target.id;
    this.data.screenData += id;
    if (id == "c") {
      this.data.screenData = ""
    }
    var data = this.data.screenData;
    console.log(data);
    if (data[data.length-1] == "=") {
      var num = 0;
      var strs = "";
      var opr = "";
      for (var i=0; i<data.length; i++) {
        if (data[i] != "+" && data[i] != "-" && data[i] != "x" && data[i] != "÷" && data[i] != "=") {
          strs += data[i];
        } else if (data[i] == "=") {
          if (opr == "+") {
            num += Number(strs);
          } else if (opr == "-") {
            num -= Number(strs);
          } else if (opr == "x") {
            num *= Number(strs);
          } else if (opr == "÷") {
            num /= Number(strs);
          }
        } else {
          num = Number(strs);
          strs = "";
          opr = data[i];
        }
      }
      data += String(num);
      this.data.screenData = "";
    }
    
    this.setData({
      show: data
    });
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
