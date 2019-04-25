// pages/create-activity/index.js
import Activity from '../../service/activity'

const activity = new Activity()
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
            const frequencyMap = {
                '每天一次': 0,
                '两天一次': 1,
                '每周一次': 2
            }
            const activityInfo = {
                name: this.data.name,
                frequency: frequencyMap[this.data.frequency]
            }
            const data = {
                openId: wx.getStorageSync('openId'),
                activityInfo: activityInfo
            }
            console.log(data);
            activity.create(data).then(() => {
                wx.navigateTo({
                    url: '../finish-create/index'
                })
            })
        } else {
            this.setData({
                showError: true
            })
        }
    }
})