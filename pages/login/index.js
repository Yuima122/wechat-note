import User from '../../service/user'

const user = new User();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showPage: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户信息, 首先读本地的缓存，读不到再去查询服务器
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('openId')) {
            wx.redirectTo({
                url: '../home/index'
            });
        } else {
            wx.getSetting({
                success: setting => {
                    //已授权
                    if (setting.authSetting['scope.userInfo']) {
                        this.bindGetUserInfo();
                    } else {
                        this.setData({
                            showPage: true
                        })
                    }
                }
            })
        }
    },

    bindGetUserInfo() {
        wx.getUserInfo({
            success: userInfo => {
                // 登录发给服务器的用户数据用于更新数据库
                const message = {
                    userInfo: userInfo.userInfo
                }
                wx.setStorageSync('userInfo', userInfo);
                wx.login({
                    success: res => {
                        // 封装用户code给服务器
                        message.code = res.code;
                        user.create(message).then(data => {
                            wx.setStorageSync('openId', data.openId);
                            wx.redirectTo({
                                url: '../home/index'
                            });
                        })
                    }
                })

            }
        })
    },

    cancel() {
        wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击了“返回授权”')
                }
            }
        })
    }
})