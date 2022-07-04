// pages/pay/pay.js
const App=getApp();
Page({
  onLoad:function(options){//从缓存中获取购物车中的数据
    var cartItems=wx.getStorageSync("cartItems")
    var total=wx.getStorageSync("total")
    var payId=options.id
    var data=App.globalData.data
    this.setData({
      cartItems:cartItems,
      total:total
    })
  },
  timeChange1:function(e){//选择配送时间
    var value1=e.detail.value;
    this.setData({
      time1:value1
    });
  },
  timeChange2:function(e){
    var value2=e.detail.value;
    this.setData({ 
      time2:value2
    });
  },
})