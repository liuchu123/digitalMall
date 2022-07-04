// pages/sort/sort.js
const App=getApp();
Page({
  //数据初始化
  data:{
    flag:0,
    list:["手机产品","时尚耳机","mini相机","电脑硬盘","鼠标键盘","平板电脑"],
    sort:1
  },
  //获得数据
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
  },
  //Tab栏切换
  switchTab:function(e){
    console.log(e)
    this.setData({
      sort:e.currentTarget.id//<scroll-view>组件的每一个分类都对应一个id，这里接受该id赋值给页面变量sort
    })
  }
})