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

module.exports = router
