// component/selector/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        frequency: '每天一次',
        selectorShow: false,
        frequencies: [
            '每天一次', '两天一次', '每周一次'
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showSelector() {
            if(!this.data.selectorShow) {
                this.setData({
                    selectorShow: true
                });
            }
        },
        selectFrequency(event) {
            this.setData({
                frequency: this.data.frequencies[event.currentTarget.dataset.index],
                selectorShow: false
            })
            this.triggerEvent('selectFrequency', this.data.frequency)
        }
    }
})
