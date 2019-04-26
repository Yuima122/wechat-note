// component/activity-card/index.js
import Activity from '../../service/activity'
import Associate from '../../service/associate'

const activity = new Activity();
const associate = new Associate();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        activityId: {
            type: String,
            value: null,
            observer: function (oldVal, newVal) {
                if (oldVal !== newVal) {
                    this.initData();
                }
            }
        },
        index: {
            type: Number,
            value: null
        },
        menuShow: {
            type: Boolean,
            value: false
        },
        showIndex: {
            type: Number,
            value: -1
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selfCheck: false,
        activity: {},
        checked: 0
    },

    attached() {
        this.initData();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        initData() {
            activity.get(this.properties.activityId).then(data => {
                const activity = {};
                Object.keys(data.activityInfo).forEach(key => {
                    activity[key] = data.activityInfo[key];
                })
                data.associates.forEach(associaty => {
                    if (associaty.openId === wx.getStorageSync('openId')) {
                        Object.keys(associaty).forEach(key => {
                            activity[key] = associaty[key];
                        })
                    }
                })
                activity.groupsUrl = data.participants.map(participant => participant.avatarUrl)
                this.setData({
                    activity: activity,
                    checked: activity.checked
                })
            })
        },
        finishActivity() {
            const data = {
                openId: wx.getStorageSync('openId'),
                activityId: this.data.activity.activityId,
                checked: 0
            }
            if (!this.data.activity.checked) {
                data.checked = 1;
                //post服务器 check 状态
                associate.put(data).then(() => {
                    this.data.activity.checked = 1;
                    this.setData({
                        checked: 1
                    })
                })
            } else {
                //post服务器 check 状态
                associate.put(data).then(() => {
                    this.data.activity.checked = 0;
                    this.setData({
                        checked: 0
                    })
                })
            }
        },
        showMenu() {
            this.triggerEvent('showMenu', true)
        },
        delete() {
            this.triggerEvent('delete', true)
        },
        goSpecialDay() {
            let param = '';
            this.properties.groupsUrl.forEach((item, index) => {
                param += 'groupsUrl' + index + '=' + encodeURIComponent(item) + '&';
            })
            param = param.substring(0, param.length - 1);
            wx.navigateTo({
                url: '../../pages/special-day/index?' + param
            })
        }
    }
})
