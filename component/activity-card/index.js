// component/activity-card/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        checked: {
            type: Boolean,
            value: false
        },
        name: {
            type: String,
            value: ''
        },
        frequency: {
            type: Number,
            value: 0
        },
        groupsUrl: {
            type: Array,
            value: null
        },
        index: {
            type: Number,
            value: null
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selfCheck: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        finshActivity() {
            if(!this.properties.checked) {
                this.triggerEvent('checkActivity', {
                    index: this.properties.index,
                    checked: true
                })
            } else {
                this.triggerEvent('checkActivity', {
                    index: this.properties.index,
                    checked: false
                })
            }
        }
    }
})
