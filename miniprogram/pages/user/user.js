var app = getApp()
Page({
    data: {
        hasUserInfo: false
    },
    getUserInfo: function () {
        var that = this
        console.log(app.globalData.hasLogin)
        if (app.globalData.hasLogin === false) {
            console.log(888)
            wx.login({
                success: _getUserInfo
            })
        } else {
            _getUserInfo()
        }

        function _getUserInfo() {
            console.log(67)
            wx.getUserInfo({
                success: function (res) {
                    that.setData({
                        hasUserInfo: true,
                        userInfo: res.userInfo
                    })
                    that.update()
                }
            })
        }
    },
    clear: function () {
        this.setData({
            hasUserInfo: false,
            userInfo: {}
        })
    }
})