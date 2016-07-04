var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/deskpro', function (req, res) {
  console.log('deskpro')
  res.render('index')
})

router.get('/tawk', function (req, res) {
  res.render('index')
})

router.get('/livechatinc', function (req, res) {
  res.render('index')
})

module.exports = router
