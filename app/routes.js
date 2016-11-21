var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/jobseekers-allowance', function (req, res) {
  res.render('jobseekers-allowance/overview')
})

router.get('/universal-credit', function (req, res) {
  res.render('universal-credit/overview')
})

router.get('/new-state-pension', function (req, res) {
  res.render('new-state-pension/overview')
})

router.get('/shared-parental-leave-and-pay', function (req, res) {
  res.render('shared-parental-leave-and-pay/overview')
})

// Notify prototype specific

router.post('/dvla-change-address/phone-email', function (req, res) {
  res.redirect('/dvla-change-address/result')
})

module.exports = router
