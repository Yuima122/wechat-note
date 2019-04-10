// pages/log/index.js
const app = getApp();
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
        // 获取用户信息
        if(wx.getStorageSync('userInfo')) {
            wx.redirectTo({
                url: '../home/index'
            });
        } else {
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: res => {
                                app.globalData.userInfo = res.userInfo;
                                wx.setStorageSync('userInfo', res.userInfo);
                                wx.redirectTo({
                                    url: '../home/index'
                                });
                            }
                        })
                    } else {
                        this.setData({
                            showPage: true
                        })
                    }
                }
            })
        }
    },

    bindGetUserInfo(e) {
        wx.redirectTo({
            url: '../home/index'
        });
    },

    cancel() {
        wx.showModal({
            title:'警告',
            content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入',
            showCancel:false,
            confirmText:'返回授权',
            success:function(res){
                if (res.confirm) {
                    console.log('用户点击了“返回授权”')
                }
            }
        })
    }
})