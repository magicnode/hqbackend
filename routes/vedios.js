'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Vedio = AV.Object.extend('Vedio');

// 查询 Vedio 列表
router.get('/', function(req, res, next) {
  var openid = req.query.openid;
  var query = new AV.Query(Vedio);
  query.equalTo('openid', openid);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.json(results)
  }, function(err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      res.send('err')
    } else {
      next(err);
    }
  }).catch(next);
});

// 新增视频项目
router.post('/', function(req, res, next) {
  var openid = req.body.openid;
  if (!openid) {
    return res.status(500).send('err')
  }
  var title = req.body.title;
  var href = req.body.href;
  var pwd = req.body.pwd || '';
  var content = req.body.content;
  var vedio = new Vedio();
  vedio.set('openid', openid);
  vedio.set('title', title);
  vedio.set('href', href);
  vedio.set('pwd', pwd);
  vedio.save().then(function(vedio) {
    res.send(vedio);
  }).catch(next);
});

// 更新视频项目
router.put('/:id', function(req, res, next) {
  var objectId = req.params.id;
  var title = req.body.title;
  var href = req.body.href;
  var pwd = req.body.pwd;
  // 第一个参数是 className，第二个参数是 objectId
  var vedio = AV.Object.createWithoutData('Vedio', objectId);
  // 修改属性
  vedio.set('title', title);
  vedio.set('href', href);
  vedio.set('pwd', pwd);
  // 保存到云端
  vedio.save().then(function(vedio) {
    res.send(vedio);
  }).catch(next);
});


// 删除视频项目
router.delete('/:id', function(req, res, next) {
  var objectId = req.params.id;
  // 第一个参数是 className，第二个参数是 objectId
  var vedio = AV.Object.createWithoutData('Vedio', objectId);
  vedio.destroy().then(function (success) {
    // 删除成功
    res.send(success);
  }, function (error) {
    // 删除失败
    res.send(error).status(500)
  });
});

module.exports = router;
