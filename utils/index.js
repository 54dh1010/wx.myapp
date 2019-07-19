export const ajax = ({ url,method, data, cb }) => {
    // wx.showLoading({
    //     title: "请求中..."
    // })
    wx.request({
        url: url,
        method: method,
        data: data,
        header: {
            'content-type': 'application/json' // 默认值
        },
        success(res) {
            cb(res)
            wx.hideLoading();
            wx.showToast({
                title: res.data.msg
            })
        }
    })
}