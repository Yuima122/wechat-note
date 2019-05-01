// pages/finish-create/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    cancel() {
        wx.navigateTo({
            url: '../home/index'
        })
    },

    onShareAppMessage(res) {
        if (res.from === 'button') {
            return {
                title: '微计划为你带来更好的就业指南',
                path: '/page/login/index'
            }
        }
    }
})