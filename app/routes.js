var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var shortid = require('shortid');
var humanize = require('humanize');
var NotifyClient = require('notifications-node-client').NotifyClient,
    notify = new NotifyClient(process.env.NOTIFYAPIKEY),
    notifyDart = new NotifyClient(process.env.NOTIFYAPIKEYDART || 'abc123');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-@');

var db = function(callback) {

  mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    var userJourneys = db.collection('journeys');
    callback(userJourneys);
  });

};


router.get('/', function (req, res) {
  res.render('index');
});

// Notify prototype specific

router.get('/journey/:type', function (req, res) {

  res.render(req.params.type + '/index');

});

router.post('/journey/:type', function (req, res) {

  var id = shortid.generate().toUpperCase();

  db(function(userJourneys) {
    userJourneys.insert(
      {
        'type': req.params.type,
        'id': id,
        'started': Date.now(),
      },
      function(err, result) {

        if(err) throw err;

      }
    );
  });

  res.redirect('/journey/' + req.params.type + '/' + id + '/ln');

});

router.get('/journey/:type/:id/:page', function(req, res){

  res.render(req.params.type + '/' + req.params.page, {
    'id': req.params.id
  });

});


router.post('/journey/:type/:id/:page', function(req, res){

  db(function(userJourneys) {
    userJourneys.update(
      {id: req.params.id},
      {$set: req.body},
      function (err, result) {

        if(err) throw err;
      }
    );
  });

  res.redirect('/journey/' + req.params.type + '/' + req.params.id + '/' + req.body.nextPage);

});


router.post('/journey/dvla-change-address/:id/phone-email', function (req, res) {

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

  db(function(userJourneys) {
    userJourneys.update(
      {id: req.params.id},
      {$set: req.body},
      function (err, result) {

        if(err) throw err;
      }
    );
  });

  res.redirect('/journey/dvla-change-address/result');

});

router.get('/admin/:id/send/:type', function (req, res) {

  db(function(userJourneys) {
    userJourneys.find({id: req.params.id}).toArray(function (err, docs) {

      res.render('dvla-change-address/update', {
        to: docs[0][req.params.type],
      });

    });
  });

});

router.post('/admin/:id/send/:type', function (req, res) {

  db(function(userJourneys) {

    if ('phone' == req.params.type) {

      notify.sendSms(
        req.body.template,
        req.body.to
      );

    } else if ('email' == req.params.type) {

      notify.sendEmail(
        req.body.template,
        req.body.to
      );

    }

    userJourneys.update(
      {id: req.params.id},
      {$set: {'updateSent': Date.now()}},
      function (err, result) {

        if(err) throw err;

        res.redirect('/admin');

      }
    );

  });

});


router.get('/admin/:id/edit/:field', function (req, res) {

  db(function(userJourneys) {
    userJourneys.find({id: req.params.id}).toArray(function (err, docs) {

      res.render('dvla-change-address/edit', {
        field: req.params.field,
        value: docs[0][req.params.field],
      });

    });
  });

});


router.post('/admin/:id/edit/:field', function (req, res) {

  db(function(userJourneys) {

    userJourneys.update(
      {id: req.params.id},
      {$set: req.body},
      function (err, result) {

        if(err) throw err;

        res.redirect('/admin');

      }
    );

  });

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

router.get('/admin', function(req, res) {

  db(function(userJourneys) {
    userJourneys.find().sort({started: -1}).toArray(function (err, docs) {

      if(err) throw err;

      res.render('admin', {
        userJourneys: docs.map(function(element) {
          element.started = humanize.relativeTime(element.started / 1000);
          if (element.updateSent) {
            element.updateSent = humanize.relativeTime(element.updateSent / 1000);
          }
          return element;
        }),
      });

    });

  });

});


module.exports = router;
