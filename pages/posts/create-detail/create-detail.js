var postsData = require('../../../data/invitecode-data.js')
var app = getApp();
Page({
  //默认值
  data: {
    activityAddress: ['江苏省', '南京市', '鼓楼区'],
    index: 0,
    activityDate: "2018-07-08",
    tipsTxt: "我是提示信息，有什么可以帮助您的！",

  },
  onLoad: function (option) {
    //获取当前地址
    //获取当前时间
  },
  //邀请码提示
  onActivtyCodeMsgTap: function () {
    wx.showModal({
      content: "可向开发者**获取验证码哦，扫码添加",
      showCancel: false,
      confirmText: "好的"
    })
  },
  //日期选择
  bindDateChange: function (e) {
    this.setData({
      activityDate: e.detail.value
    })
  },
  //地点选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      activityAddress: e.detail.value
    })
  },
  //表单提交
  formSubmit: function (e) {
    var that = this;
    //表单项验证
    if (that.formvalid(e)) {
      //表单数据

      var formData = e.detail.value;

      //提交请求
      wx.request({
        url: 'http://test.com:8080/test/socket.php?msg=2',
        data: formData,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          if (res.data == -99) {//请发送合法请求--数据不正确 、错误次数太多、用户验证不合法
            that.modalTap('请发送合法请求!');
          }
          if (res.data == -2) {//活动邀请码失效
            that.modalTap('活动邀请码已失效!');
          }
          if (res.data == -1) {//活动邀请码错误
            that.modalTap('活动邀请码错误!');
          }
          if (res.data == 1) {//创建成功
            that.modalTap('恭喜您，活动创建成功!');
          }
        }
      })

    }
  },
  formvalid: function (e) {
    var flage = true;

    if (e.detail.value.activtyName.length == 0 || e.detail.value.activtyName.length > 10) {
      this.modalTap('请填写活动名称!');
      return false;
    }
    if (e.detail.value.activtyCode.length == 0) {
      this.modalTap('请填写活动邀请码!');
      return false;
    }
    return flage;
  },

  //弹出确认框
  modalTap: function (txt) {
    wx.showToast({
      title: txt,
      icon: 'loading',
      image: '/images/icon/xx.png',
      duration: 1500
    })

    setTimeout(function () {
      wx.hideToast()

    }, 2000)
  },
  //取消返回上一级页面
  navigateBackTap: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})