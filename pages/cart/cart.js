// pages/cart/cart.js
const App=getApp();
Page({
  data:{//数据初始化
    cartItems:[],
    total:0,
    checkAll:true
  },
  //获取缓存中的数据
  onLoad:function(options){
    var cartItems=wx.getStorageSync("cartItems")//从数据缓存区中获得购物车中的商品数据
    this.setData({
      cartList:false,
      cartItems:cartItems
    })
    this.getsumTotal()
  },
  //选中图标
  selectIcon:function(e){
    var cartItems=this.data.cartItems//获取购物车列表
    var index=e.currentTarget.dataset.index;//获取当前点击事件的下标索引
    var selected=cartItems[index].selected;//获取购物车里面的value值
    //未选中图标
    cartItems[index].selected=!selected;
    this.setData({
      cartItems:cartItems
    })
    this.getsumTotal();
    wx.setStorageSync("cartItems",cartItems)
  },
  //增加商品数量
  add:function(e){
    var cartItems=this.data.cartItems
    var index=e.currentTarget.dataset.index
    var value=cartItems[index].value
    value++
    cartItems[index].value=value
    this.setData({
      cartItems:cartItems
    });
    this.getsumTotal()
    wx.setStorageSync('cartItems', cartItems)//存入缓存
  },
    //减少商品数量
    reduce:function(e){
      var cartItems=this.data.cartItems
      var index=e.currentTarget.dataset.index
      var value=cartItems[index].value
      if(value==1){
        value--;
        cartItems[index].value=1  
      }else{
        value--;
        cartItems[index].value=value;
      }
      this.setData({
        cartItems:cartItems
      });
      this.getsumTotal()
      wx.setStorageSync("cartItems", cartItems)//存入缓存
    },
    //全选
    select:function(e){
      var checkAll=this.data.checkAll;
      checkAll=!checkAll
      var cartItems=this.data.cartItems
      for(var i=0;i<cartItems.length;i++){
        cartItems[i].selected=checkAll
      }
      this.setData({
        cartItems:cartItems,
        checkAll:checkAll
      })
      this.getsumTotal()
    },
    //删除商品列表
    delete:function(e){
      var cartItems=this.data.cartItems;
      var index=e.currentTarget.dataset.index;
      cartItems.splice(index,1)
      this.setData({
        cartItems:cartItems
      });
      if(cartItems.length){
        this.setData({
          cartList:false
        });
      }
      this.getsumTotal()
      wx.setStorageSync('cartItems', cartItems)//存入缓存 
    },
    //清空购物车
    clearcart:function(e){
      this.setData({
        cartItems:[],
        total:0
      })
      wx.setStorageSync('cartItems', [])
    },
    //跳转到支付页面
    goPay:function(e){
      wx.setStorageSync('cartItems', this.data.cartItems)
      wx.setStorageSync('total', this.data.total)
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    },
    //合计商品总价
    getsumTotal:function(){
      var cost=0;
      for(var i = 0;i< this.data.cartItems.length;i++) {
        if(this.data.cartItems[i].selected){
          cost+=this.data.cartItems[i].value*this.data.cartItems[i].price
        }
      }
      //更新数据
      this.setData({
        total:cost
      })
    },
})