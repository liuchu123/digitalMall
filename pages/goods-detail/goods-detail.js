// pages/goods-detail/goods-detail.js
const App=getApp();
Page({
  data:{//数据初始化
    HomeIndex:0,
    hasCarts:false,
    num:0
  },
  //页面加载时获得app.js中的数据
  onLoad:function(option){
    var id=option.listid
    this.setData({
      data:App.globalData.data[id]
    })
  },
  //Tab栏切换
  switchTab:function(e){//用于实现"商品详情"和"产品参数"的跳转
    var index=parseInt(e.currentTarget.dataset.index)
    this.setData({
      HomeIndex:index
    })
  },
  //返回商品首页
  backtoindex:function(){
    wx.switchTab({
      url: '/pages/goods-index/goods-index',
    })
  },
  //增加图标中的数量
  addcart:function(e){
    let num=this.data.num;
    num++;
    this.setData({
      num:num,
      hasCarts:true
    })
  //将商品信息放入缓存中
  var cartItems=wx.getStorageSync('cartItems')||[]
  var exist=cartItems.find(function(el){
    return el.id==e.target.dataset.id
  })
  //当购物车里已经存在该商品数量时加1
  if(exist){
    exist.value=parseInt(exist.value)+1
  }else{
    cartItems.push({
      id:e.target.dataset.id,
      title:e.target.dataset.title,
      image:e.target.dataset.image,
      price:e.target.dataset.price,
      value:1,
      selected:true
    })
  }
  //弹窗显示
  wx.showToast({
    title: '加入购物车',
    duration:1000
  })
  //更新缓存数据
  wx.setStorageSync("cartItems", cartItems)
  },
  //跳转至购物车页面
  tocart:function(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})