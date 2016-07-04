var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/deskpro', function (req, res) {
  res.render('deskpro')
})

router.get('/tawk', function (req, res) {
  res.render('tawk')
})

router.get('/livechatinc', function (req, res) {
  res.render('livechatinc')
})

module.exports = router
