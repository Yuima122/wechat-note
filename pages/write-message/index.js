// pages/write-message/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message: '',
        word: '0/140'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    watchInput(event) {
        this.setData({
            message: event.detail.value,
            word: event.detail.value.length + '/' + '140'
        })
    }


})