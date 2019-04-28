// component/message/index.js
import User from '../../service/user'
import Star from '../../service/star'

const user = new User();
const star = new Star();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        message: {
            type: Object,
            value: {}
        }
    },

    attached() {
        user.get(this.properties.message.openId).then(data => {
            this.setData({
                userInfo: data.userInfo
            })
        })
        this.translateTime(this.properties.message.createdTime * 1000);
        if (this.properties.message.whoStar.indexOf(wx.getStorageSync('openId')) !== -1) {
            this.setData({
                stared: true
            })
        }
        this.setData({
            starNumber: this.properties.message.whoStar.length
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        userInfo: {},
        time: '',
        stared: false,
        starNumber: 0,
        userStar: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        translateTime(time) {
            const date = new Date(time);
            const hours = date.getHours();
            let minutes = date.getMinutes();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            let day = date.getDate();
            const today = new Date();
            if (today.getDate() !== date.getDate() || today.getMonth() !== date.getMonth()) {
                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                if (today.getFullYear() !== date.getFullYear()) {
                    this.setData({
                        time: year + '/' + month + '/' + day
                    })
                } else {
                    this.setData({
                        time: month + '/' + day
                    })
                }
            } else {
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                this.setData({
                    time: hours + ':' + minutes
                })
            }
        },

        star() {
            if (this.data.stared) {
                star.delete(this.properties.message.msgId, wx.getStorageSync('openId')).then(() => {
                    this.setData({
                        stared: false,
                        starNumber: this.data.starNumber - 1,
                        userStar: false
                    })
                })
            } else {
                const data = {
                    openId: wx.getStorageSync('openId'),
                    msgId: this.properties.message.msgId
                }
                star.create(data).then(() => {
                    this.setData({
                        stared: true,
                        starNumber: this.data.starNumber + 1,
                        userStar: true
                    })
                })
            }
        }
    }
})
