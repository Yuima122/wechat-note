// pages/activity-detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activity: [], //用户的所有活动，通过传入的索引去取具体值
        time: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData(options.index);
    },

    initData(index) {
        //request 请求
        const activities = [{
            name: '每日阅读两小时并进行阅读笔记',
            frequency: 1,
            createdTime: 1555312183860,
            messages: []
        }, {
            name: '每日阅读两小时并进行阅读笔记',
            frequency: 25,
            createdTime: 1555312183860,
            messages: []
        }];
        this.setData({
            activity: activities[index]
        })
        this.translateTime(this.data.activity.createdTime)
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
    }


})