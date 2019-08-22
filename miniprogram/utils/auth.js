const Auth = {}

Auth.checkSession = function (appPage, flag) {
    let openid = wx.getStorageSync('openid');
    if (!openid) {
        if ('isLoginNow' == flag) {
            appPage.setData({ isLoginPopup: true });
        }

    }
}

module.exports = Auth;