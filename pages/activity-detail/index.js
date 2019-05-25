// pages/activity-detail/index.js
import Activity from '../../service/activity'
import Message from '../../service/message'
import Map from '../../utils/map'

const map = new Map();
const activity = new Activity();
const message = new Message();
const frequncyMap = map.frequency2WordMap;
const typeMap = map.type2WordMap;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activity: {}, //用户的所有活动，通过传入的索引去取具体值
        time: '',
        messages: [],
        dataLoaded: false,
        showCheckToast: false
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
            data.associates.forEach(associaty => {
                if (associaty.openId === wx.getStorageSync('openId')) {
                    Object.keys(associaty).forEach(key => {
                        newActivity[key] = associaty[key];
                    })
                }
            })
            newActivity.frequency = frequncyMap[newActivity.frequency];
            newActivity.type = typeMap[newActivity.type];
            newActivity.text = newActivity.text.replace(/\\n/gm,'\n');
            this.setData({
                activity: newActivity
            })
            message.get(activityId).then(data => {
                let messages = data.messages;
                messages = messages.map(message => {
                    message.text = message.text.replace(/\\n/gm,'\n');
                    return message;
                })
                this.setData({
                    messages: messages,
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
        if (this.data.activity.checked) {
            wx.navigateTo({
                url: '../write-message/index?activityId=' + this.data.activity.activityId
            })
        } else {
            this.setData({
                showCheckToast: true
            })
            setTimeout(() => {
                this.setData({
                    showCheckToast: false
                })
            }, 3000)
        }
    }
})