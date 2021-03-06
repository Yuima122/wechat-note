// pages/activity-detail/index.js
import Activity from '../../service/activity'
import Message from '../../service/message'

const activity = new Activity();
const message = new Message();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activity: {}, //用户的所有活动，通过传入的索引去取具体值
        time: '',
        messages: [],
        dataLoaded: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData(options.activityId);
    },

    initData(activityId) {
        activity.get(activityId).then(data => {
            const newActivity = {};
            Object.keys(data.activityInfo).forEach(key => {
                newActivity[key] = data.activityInfo[key];
            })
            this.setData({
                activity: newActivity
            })
            message.get(activityId).then(data => {
                this.setData({
                    messages: data.messages,
                    dataLoaded: true
                })
            })
            this.translateTime(this.data.activity.createdTime * 1000)
        })
    },

    translateTime(time) {
        const date = new Date(time);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        this.setData({
            time: year + '/' + month + '/' + day
        })
    },

    writeMessage() {
        wx.navigateTo({
            url: '../write-message/index?activityId=' + this.data.activity.activityId
        })
    }
})