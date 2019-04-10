// pages/create-activity/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        frequency: '每天一次',
        name: '',
        showError: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    selectFrequency(event) {
        this.setData({
            frequency: event.detail
        })
    },

    watchInput(event) {
        this.setData({
            name: event.detail.value
        })
    },

    cancleError() {
       this.setData({
           showError: false
       })
    },

    sendCreate() {
        if (this.data.name) {
            const message = {
                name: this.data.name,
                frequency: this.data.frequency
            }
            console.log(message);
            wx.navigateTo({
                url: '../finish-create/index'
            })
        } else {
            this.setData({
                showError: true
            })
        }
    }
})