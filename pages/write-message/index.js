// pages/write-message/index.js
import Message from '../../service/message'

const message = new Message();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: '',
        word: '0/1000',
        activityId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            activityId: options.activityId
        })
    },

    watchInput(event) {
        this.setData({
            text: event.detail.value,
            word: event.detail.value.length + '/' + '1000'
        })
    },

    createMessage() {
        const data = {
            openId: wx.getStorageSync('openId'),
            activityId: this.data.activityId,
            text: this.data.text
        }
        message.create(data).then(() => {
            wx.navigateTo({
                url: '../activity-detail/index?activityId=' + this.data.activityId
            })
        })
    }


})