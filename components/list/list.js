// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr:{
      type:Array
    },
    item:{
      type:Object
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    good:[],
  },
  lifetimes: {
    attached: function() {
      console.log(this.properties.item)
      console.log(this.properties.arr)
      var good =  this.properties.arr.filter(item=>item.type.value==this.properties.item.value);
      console.log(good)
      this.setData({
        good:good
      })

      // 在组件实例进入页面节点树时执行
    // const good=this.properties.arr.filter(item=>item.type.value==this.properties.item.value)
    // console.log(good)
    // this.setData({
    //   good
    // })

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
