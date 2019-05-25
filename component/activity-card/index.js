// component/activity-card/index.js
import Activity from '../../service/activity'
import Associate from '../../service/associate'
import Map from '../../utils/map'

const activity = new Activity();
const associate = new Associate();
const map = new Map();
const frequencyMap = map.frequency2WordMap;
const typeMap = map.type2WordMap;
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
        checked: 0,
        hasChecked: false
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
                        activity.checked = associaty.checked;
                        this.setData({
                            hasChecked: true
                        })
                    }
                })
                activity.groups = {
                    urls: data.participants.filter(participant => participant.openId === data.activityInfo.createrId).map(participant => participant.avatarUrl),
                    names: data.participants.filter(participant => participant.openId === data.activityInfo.createrId).map(participant => participant.nickName)
                }
                activity.frequency = frequencyMap[activity.frequency];
                activity.type = typeMap[activity.type];
                this.setData({
                    activity: activity
                })
                if (activity.checked !== undefined) {
                    this.setData({
                        checked: activity.checked
                    })
                }
            })
        },
        checkActivity() {
            const data = {
                openId: wx.getStorageSync('openId'),
                activityId: this.data.activity.activityId,
                checked: 0
            }
            if (!this.data.activity.checked) {
                data.checked = 1;
                if (this.data.hasChecked) {
                    //post服务器 check 状态 1
                    associate.put(data).then(() => {
                        this.data.activity.checked = 1;
                        this.setData({
                            checked: 1
                        })
                    })
                } else {
                    associate.create(data).then(() => {
                        this.data.activity.checked = 1;
                        this.setData({
                            checked: 1,
                            hasChecked: true
                        })
                    })
                }
            } else {
                //post服务器 check 状态 0
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
        closeMenu() {
            this.triggerEvent('closeMenu', true)
        }
    }
})
