// 引用 wechat 库，详细请查看 https://github.com/node-webot/wechat
var router = require('express').Router();
var axios = require('axios');

router.post('/code', (req, res, next) => {
  var url = req.query.url
  console.log('url', url)
  axios.get(url)
    .then(result => {
      console.log(result)
      return res.send(result.data)
    })
    .catch(err => {
      console.error(err)
      return res.send('err')
    })
})

router.get('/redirect', (req, res, next) => {
  var code = req.query.code
  var state = req.query.state
  return res.redirect('http://wechatme.leanapp.cn/wx/#/redirect?code=' + code + '&state=' + state)
})

module.exports = router;
