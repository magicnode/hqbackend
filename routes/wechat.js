// 引用 wechat 库，详细请查看 https://github.com/node-webot/wechat
var router = require('express').Router();
var wechat = require('wechat');
var config = require('../config');
var WechatAPI = require('wechat-api');
var api = new WechatAPI(config.appid, config.appsecret);

router.use('/', wechat('testwc', (req, res, next) => {
  // 微信输入信息都在req.weixin上
  const message = req.weixin,
    openid = message.FromUserName,
    scence = message.EventKey,
    event = message.Event;
  const content = message.Content;
  let messageContent = "";
  const menu = {
    "button": [{
        "type":"view",
        "name":"上传视频",
        "url":"http://www.youku.com/"
    },{
        "type":"view",
        "name":"以往视频",
        "url":"http://www.youku.com/"
    }]
  }
  api.createMenu(menu, function (err, result) {
    console.log('err', err)
    console.log('result', result)
  });
}));

module.exports = router;
