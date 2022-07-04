// pages/goods-index/goods-index.js
const App=getApp();
Page({
  //获取数据
  onLoad:function(options){
    this.setData({
      main_key:App.globalData.data//获取app.js文件中的商品数据
    })
  },
  //点击商品列表跳转商品详情页
  btntodetail:function(e){
    var listid=e.currentTarget.dataset.id//获取用户具体点击的那件商品的下标
    console.log('你点击了第'+(listid+1)+'个商品')
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?listid='+listid,
    })
  }
})