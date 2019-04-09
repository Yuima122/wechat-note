// pages/log/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户信息
        if(wx.getStorageSync('userInfo')) {
            wx.navigateTo({
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
                            }
                        })
                    }
                }
            })
        }
    },

    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
    }
})