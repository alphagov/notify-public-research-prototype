var express = require('express')
var router = express.Router()
var NotifyClient = require('notifications-node-client').NotifyClient,

notify = new NotifyClient(process.env.NOTIFYAPIKEY);

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

  if (req.body.email) {
    notify.sendEmail(
      "a65e12cb-030c-4944-8948-fc445d0e2936",
      req.body.email,
      {
        'delivery date': '8 December',
        'reference number': 'DC563412B'
      }
    );
  }

  if (req.body.phone) {
    notify.sendSms(
      "5e5c1075-fcae-432c-b344-1a00ef18ee84",
      req.body.phone
    );
  }

  res.redirect('/dvla-change-address/result');

})

router.get('/dvla-change-address/update', function (req, res) {
  res.render('dvla-change-address/update', {
    sentTo: req.query.sentTo
  })
})

router.post('/dvla-change-address/update', function (req, res) {

  if (req.body.phone) {
    notify.sendSms(
      "ffa370ad-4129-4ceb-86b6-6a4c64db9250",
      req.body.phone
    )
  }

  res.redirect('/dvla-change-address/update?sentTo=' + req.body.phone);

})

module.exports = router
