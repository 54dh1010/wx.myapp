// pages/classfiy/classfiy.js
import {ajax} from "../../utils/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    goods:[],
    num:0,
  },
  btn(e){
  // console.log(e.target.dataset.id)
    this.setData({
      num:e.target.dataset.id
    })
  },
  change(e){
    // console.log(e.detail.current)
    this.setData({num:e.detail.current})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax({
      url:'http://localhost:1992/vue/goodsType',
      cb:(res)=>{
        // console.log(res.data)
        this.setData({
          arr:res.data.result
        })
      }
    }),
    ajax({
      url:'http://localhost:1992/vue/goods',
      cb:(res)=>{
        console.log(res.data.result)
        this.setData({
          goods:res.data.result
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})