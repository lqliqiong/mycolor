var postsData = require('../../data/posts-data.js')

Page({
  data: {
  },
  onLoad: function () {
    // this.data.postList = postsData.postList
    this.setData({
       postList:postsData.postList
      });
  },
  //创建一个活动
    onCraeteTap: function (event) {
      console.log("创建一个活动！" );
      wx.navigateTo({
        url: "create-detail/create-detail"
      })
  },

})