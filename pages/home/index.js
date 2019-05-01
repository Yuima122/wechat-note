// pages/home/index.js
import User from '../../service/user'
import Activity from '../../service/activity'
import Recommend from '../../service/recommend'

const user = new User();
const activity = new Activity();
const recommend = new Recommend();
let timer = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        firstCreate: false,
        menuShow: false,
        activities: [],
        showIndex: null,
        showDeleteToast: false,
        deleteActivity: {},
        dataLoaded:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.translateDate();
        this.initData();
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

    initData() {
        // 初始化数据过程，需要导入用户的活动并根据是否有活动改变是否初次创建的逻辑
        const openId = wx.getStorageSync('openId');
        user.get(openId).then(data => {
            this.setData({
                firstCreate: data.activities.length ? false : true
            })
            recommend.get().then(data => {
                this.setData({
                    activities: data,
                    dataLoaded: true
                })
            })
        })
    },

    create() {
        wx.navigateTo({
            url: '../create-activity/index'
        })
    },

    closeMenu() {
        this.setData({
            menuShow: false
        })
    },

    showMenu(e) {
        this.setData({
            menuShow: true,
            showIndex: e.target.dataset.index
        })
    },

    detele() {
        const self = this;
        // 第一步需要有暂时的动态删除
        const newActivites = this.data.activities;
        const deleteActivity = {
            activity: this.data.activities[this.data.showIndex],
            index: this.data.showIndex
        }
        newActivites.splice(this.data.showIndex, 1);
        this.setData({
            deleteActivity: deleteActivity,
            showDeleteToast: true,
            menuShow: false,
            showIndex: null,
            activities: newActivites
        })
        // 6s的定时取消
        clearTimeout(timer);
        timer = setTimeout(() => {
            self.setData({
                showDeleteToast: false
            });
            //需要有服务器上传 目前问题是撤销的问题
            self.postDelete(self.data.deleteActivity.activity.activityInfo.activityId);
        }, 6000)
    },

    cancel() {
        clearTimeout(timer);
        const newActivities = this.data.activities;
        newActivities.splice(this.data.deleteActivity.index, 0, this.data.deleteActivity.activity);
        this.setData({
            activities: newActivities,
            showDeleteToast: false
        })
    },

    postDelete(activityId) {
        activity.delete(activityId).then(data => {
            console.log('删除的帖子：', data)
        });
    },

    onShareAppMessage(res) {
        if (res.from === 'button') {
            return {
                title: '微计划为你带来更好的就业指南',
                path: '/page/login/index'
            }
        }
    }

})