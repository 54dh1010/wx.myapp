// components/photo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    url: '',
    latitude:'',
    longitude:'',

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      wx.getLocation({
        type: 'wgs84',
        success: (res)=> {
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          this.setData({
            latitude,longitude
          })
        }
       })
      

    },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    takaphoto() {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          this.setData({
            url: tempFilePaths
          })
        }

      })
    },
    takeshao() {
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    },
    Photo() {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            url: res.tempImagePath
          })
        }
      })
    },
    error(e) {
      console.log(e.detail)
    }

  }
})
