// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        firstCreate: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.translateDate();
    },

    translateDate() {
        const dateMap = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        }
        const date = new Date();
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        const month = dateMap[date.getMonth()];
        this.setData({
            day: day,
            month: month
        })
    },

    create() {
        wx.navigateTo({
            url: '../create-activity/index'
        })
    }
})