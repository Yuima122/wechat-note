// component/popover/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        activityId: {
            type: String,
            value: null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        delete() {
            this.triggerEvent('delete', true);
        },
        goToDetailPage() {
            this.triggerEvent('closeMenu', true);
            wx.navigateTo({
                url: '../../pages/activity-detail/index?activityId=' + this.properties.activityId
            })
        }
    }
})
