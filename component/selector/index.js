// component/selector/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        selectWordDefault: {
            value: '',
            type: String,
            observer: function (oldVal, newVal) {
                if(oldVal !== newVal) {
                    this.setData({
                        selectWord: this.properties.selectWordDefault
                    })
                }
            }
        },
        selectWords: {
            value: [],
            type: Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selectorShow: false,
        selectWord: ''
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
                selectWord: this.properties.selectWords[event.currentTarget.dataset.index],
                selectorShow: false
            })
            this.triggerEvent('selectWord', this.data.selectWord)
        }
    }
})
