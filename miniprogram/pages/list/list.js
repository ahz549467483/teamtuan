import Toast from 'vant-weapp/toast/toast';
import utils from '../../utils/util'

var app = getApp()
Page({
    data:{
        visible:false,
        title:'',
        desc:'',
        hasSubmit:false,
        data:[],
        isLoginPopup:false
    },

    onShow:function() {
        this.queryListInfo()
    },

    getUserInfo:function(event) {
        console.log(event)
    },

    queryListInfo:function (params) {
        const db = wx.cloud.database()
        db.collection('lists').get({
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                this.setData({
                    data: res.data
                })
                wx.showToast({
                    title: '获取信息成功',
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
            }
        })
    },

    addItem:function() {
        this.setData({
            visible: true
        })
        // if (app.globalData.hasLogin) {
        //     this.setData({
        //         visible: true
        //     })
        // }else{
        //     this.setData({
        //         isLoginPopup:true
        //     })
        // }
        
    },

    cancelClick:function(params) {
        this.setData({
            visible:false
        })
    },

    onClose:function(even) {
        console.log(even)
        if (even.type=='close'&&even.detail=='cancel'){
            this.setData({
                visible:false
            })
        }
        if (even.type == 'close' && even.detail == 'confirm') {
            if(this.data.title&&this.data.desc){
                const db = wx.cloud.database()
                this.setData({
                    hasSubmit: true
                })
                db.collection('lists').add({
                    data: {
                        title: this.data.title,
                        desc: this.data.desc,
                        create_time: utils.formatTime(new Date())
                    },
                    success: res => {
                        // 在返回结果中会包含新创建的记录的 _id
                        this.queryListInfo()
                        wx.showToast({
                            title: '新增记录成功',
                        })
                        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                    },
                    fail: err => {
                        wx.showToast({
                            icon: 'none',
                            title: '新增记录失败'
                        })
                        console.error('[数据库] [新增记录] 失败：', err)
                    }
                })
                // Toast('添加成功');
            }
        }
    },

    onChangeTitle: function (event) {
        console.log(event.detail)
        this.setData({
            title: event.detail
        })
    },

    onChangeDesc: function (event) {
        console.log(event.detail)
        this.setData({
            desc: event.detail
        })
    },
})