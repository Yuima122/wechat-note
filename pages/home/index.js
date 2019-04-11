// pages/home/index.js
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
        showDeleteToast: false
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
        this.setData({
            activities: [
                {
                    name: '每日阅读两小时并进行阅读笔记',
                    checked: false,
                    frequency: 1,
                    groupsUrl: ['http://img1.imgtn.bdimg.com/it/u=1351704171,1033291640&fm=214&gp=0.jpg']
                },
                {
                    name: '每日阅读两小时并进行阅读笔记',
                    checked: true,
                    frequency: 2,
                    groupsUrl: ['http://img1.imgtn.bdimg.com/it/u=1351704171,1033291640&fm=214&gp=0.jpg', 'http://img1.imgtn.bdimg.com/it/u=1351704171,1033291640&fm=214&gp=0.jpg']
                }
            ]
        })
    },

    checkActivity(event) {
        //需要将状态上传到服务器
        let newActivities = this.data.activities;
        newActivities[event.detail.index].checked = event.detail.checked;
        this.setData({
            activities: newActivities
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
        newActivites.splice(this.data.showIndex, 1);
        this.setData({
            showDeleteToast: true,
            menuShow: false,
            showIndex: null,
            activities: newActivites
        })
        // 3s的定时取消
        timer = setTimeout(() => {
            self.setData({
                showDeleteToast: false
            });
            //需要有服务器上传 目前问题是撤销的问题
        }, 3000)
    }
})