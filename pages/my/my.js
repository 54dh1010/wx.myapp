// pages/my/my.js
function getcolor(){
  let rgb=[]
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')

}
import {ajax} from "../../utils/index.js"
let timer=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }],
    word:"",
    vSrc:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    num:0,
    show:true,
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    istrue: false,
    user: {
      username: 'aaa',
      age: 28,
      count: 1902
    },
    demon: {
      num: 1992,
      word: 'daydayup',
      flag: true
    },
    itemList: ["拍照", "从手机相册选择图片"],
    action: {
      hidden: true,
      arr: ['照相', "美颜相机", 'ps']
    },
    login: {
      islogin: false,
      mobile: '',
      code: '',
    },
    imgUrls:[],






  },
  videoPlay(){
    console.log(wx.getStorageSync('play'))
    if(!wx.getStorageSync('play')){
      this.showdanger()

    }
  },
  videoUpdate(){
    console.log(1111)
    if(!wx.getStorageSync('play')&&this.data.flag){
      this.showdanger()
      this.setData({
        flag:!this.data.flag,
      })
        
    }
  },
    showdanger(){
    this.videoCtx.pause()
    wx.showModal({
      title: '提示',
      content: '你正在用流量观看视频',
      cancelText: '取消',
      cancelColor: '#000',
      confirmText: '继续',
      confirmColor: '#d81e06',
      success:res=>{
        if (res.confirm) {
          wx.showToast({
            title: 'ok',
            icon: 'success',
            duration: 400
          })
          wx.setStorageSync("play",true);
          setTimeout(()=>{
            this.videoCtx.play()
            this.setData({
              flag:!this.data.flag,
            })
          },300)
          
        }
        if (res.cancel) {
        }
      }
    })
  },
  getword(e){
    console.log(e)
    this.setData({
      word:e.detail.value
    })
  },
  bindSendDanmu(){
    this.videoCtx.sendDanmu({
      text:this.data.word,
      color:getcolor()
    })
    this.setData({
      word:''
    })
  },
  bindButtonTap(){
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          vSrc: res.tempFilePath
        })
      }
    })
  },
  audioPlay(){
    this.audioCtx.play()
  },
  audioPause(){
    this.audioCtx.pause()
  },
  getImg(){
    ajax({
      url:'http://localhost:1992/vue/movie',
      method:'GET',
      data:{
        limit:4
      },
      
      cb:(res)=>{
        console.log(res.data)
        this.setData({
          imgUrls:res.data.result
        })
      }

    })
  },
  getMobile(e) {
    // console.log(e.detail.value)
    this.setData({
      "login.mobile": e.detail.value
    })
  },
  getCode(e) {
    console.log(e.detail.value)

    this.setData({
      "login.code": e.detail.value
    })
  },
  sendCode() {
    // console.log(this.data.login.mobile,this.data.login.code)
    wx.showLoading({
      title:"加载中..."
    })
    wx.request({
      url: 'http://localhost:1992/react/sendCode', 
      method:"POST",
      data: {
        mobile:this.data.login.mobile,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        wx.hideLoading();
        wx.showToast({
          title:res.data.msg
        })

      }
    })
  },
  logincancel(){
    this.setData({
      'login.islogin':true
    })
  },
  autoLogin(){
    ajax({
      url:'http://localhost:1992/react/check',
      method:'POST',
      data:{
        mobile:this.data.login.mobile,
        code:this.data.login.code,
      },
      cb:(res)=>{
        console.log(res.data)
        if(!!res.data.type){
          wx.setStorageSync('islogin',!!res.data.type)
        }else{
          wx.setStorageSync('islogin',!!res.data.type)
        }
        this.setData({
          "login.islogin":true,
        })
      }
    })
  },
  toOne(e) {
    console.log(e.target.dataset.ind)
    var ind = e.target.dataset.ind
    wx.showToast({
      title: `${this.data.action.arr[ind]}ok`,
      icon: 'success',
      duration: 500

    })

  },
  goback() {
    this.setData({
      "action.hidden": true,
    })
  },
  openMyAction() {
    this.setData({
      "action.hidden": false,
    })
  },
  openaction() {
    wx.showActionSheet({
      itemList: this.data.itemList,
      success(res) {
        console.log(res.tapIndex)

      },
      fail() {

      }
    })
  },
  openModal() {
    wx.showModal({
      title: '提示',
      context: '确定要关我',
      cancelText: '取消',
      cancelColor: '#000',
      confirmText: '继续',
      confirmColor: '#d81e06',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 400
          })
        }
        if (res.cancel) {
        }
      }
    })
  },
  change(e) {
    console.log(e)
    console.log(e.detail.value)
  },
  tapMe(e) {
    // console.log(e.targett)
    var flag = (e.target.dataset.msg)
    this.setData({
      istrue: !this.data.istrue
    })
  },
  getParent() {
    console.log('parent')
  },
  childOne() {
    console.log('childrenOne')
  },
  childTwo() {
    console.log('catchtap能阻止事件冒泡')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "login.islogin":!!wx.getStorageSync('islogin'),
    })
    timer=setInterval(()=>{
      if(this.data.num<100){
        this.setData({
          num:++this.data.num
        })
      }else{
        clearInterval(timer)
        this.setData({
          show:!this.data.show
        })
        this.getImg()
      }
    },10)
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
    this.videoCtx=wx.createVideoContext('myVideo')
    wx.getNetworkType({
      success (res) {
        const networkType = res.networkType
        console.log(networkType)
        if(networkType=="wifi"){
          wx.setStorageSync('play',true)
        }else{
          wx.setStorageSync('play',false)
        }
      }
    })
    

    wx.onNetworkStatusChange(function (res) {
      // console.log(res.isConnected)
      console.log(res.networkType)
      if(res.networkType=="wifi"){
        wx.setStorageSync('play',true)
      }else{
        wx.setStorageSync('play',false)
      }
    })
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