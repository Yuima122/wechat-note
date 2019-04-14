// pages/special-day/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        groupsUrl: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const groupsUrl = [];
        Object.keys(options).forEach(key => {
            groupsUrl.push(decodeURIComponent(options[key]));
        })
        this.setData({
            groupsUrl: groupsUrl
        })
    },

})