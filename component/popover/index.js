// component/popover/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: Number,
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
            this.triggerEvent('delete', true)
        },
        goToDetailPage() {
            wx.navigateTo({
                url: '../../pages/activity-detail/index?index=' + this.properties.index
            })
        }
    }
})
