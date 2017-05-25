// 引用 wechat 库，详细请查看 https://github.com/node-webot/wechat
var router = require('express').Router();
var axios = require('axios');

router.get('/code', (req, res, next) => {
  var url = req.query.url
  console.log('url', url)
  axios.get(url)
    .then(res => {
      return res.send('asdsad')
    })
    .catch(err => {
      console.error(err)
      return res.send('err')
    })
})

module.exports = router;
