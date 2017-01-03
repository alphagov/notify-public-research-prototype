var express = require('express');
var router = express.Router();
var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY),
    notifyDart = new NotifyClient(process.env.NOTIFYAPIKEYDART || 'abc123');

router.get('/', function (req, res) {
  res.render('index');
});

// Notify prototype specific

router.post('/dvla-change-address/phone-email', function (req, res) {

  if (req.body.email) {
    notify.sendEmail(
      "a65e12cb-030c-4944-8948-fc445d0e2936",
      req.body.email,
      {
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

});

router.get('/dvla-change-address/update', function (req, res) {
  res.render('dvla-change-address/update', {
    sentTo: req.query.sentTo
  });
});

router.post('/dvla-change-address/update', function (req, res) {

  if (req.body.phone) {
    notify.sendSms(
      req.body.template,
      req.body.phone
    );
  }

  res.redirect('/dvla-change-address/update?sentTo=' + req.body.phone);

});

router.post('/pay-dartford-crossing-charge/email', function (req, res) {

  req.session.email = req.body.email;
  res.redirect('/pay-dartford-crossing-charge/pay');

});

router.post('/pay-dartford-crossing-charge/pay', function (req, res) {

  notifyDart.sendSms(
    "3a692856-cbef-4e98-949a-135f335f51ae",
    req.session.email
  );

  res.redirect('/pay-dartford-crossing-charge/result');

});

router.get('/pay-dartford-crossing-charge/result', function(req, res) {

  res.render('pay-dartford-crossing-charge/result', {
    'emailAddress': req.session.email
  });

});

module.exports = router;
