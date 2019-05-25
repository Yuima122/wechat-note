// pages/create-activity/index.js
import Activity from '../../service/activity'
import Map from '../../utils/map'

const map = new Map();
const frequencyMap = map.word2frequencyMap;
const typeMap = map.word2TypeMap;
const activity = new Activity()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        showError: false,
        types: ['招聘信息', '面试经验', '心得体会'],
        frequencies: ['一个月内', '两个月内', '三个月内'],
        type: '招聘信息',
        frequency: '一个月内',
        text: '',
        word: '0/1000'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    selectType(event) {
        this.setData({
            type: event.detail
        })
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

    watchTextareaInput(event) {
       this.setData({
           text: event.detail.value,
           word: event.detail.value.length + '/' + '1000'
       })
    },

    cancleError() {
       this.setData({
           showError: false
       })
    },

    sendCreate() {
        if (this.data.name) {
            const activityInfo = {
                name: this.data.name,
                frequency: frequencyMap[this.data.frequency],
                type: typeMap[this.data.type],
                text: this.data.text,
                createrId: wx.getStorageSync('openId')
            }
            activity.create(activityInfo).then(() => {
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