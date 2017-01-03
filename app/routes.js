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

  res.redirect('/journey/' + req.params.type + '/' + id + '/' + req.body.nextPage);

});

router.get('/journey/:type/:id/:page', function(req, res){

  res.render(req.params.type + '/' + req.params.page, {
    'id': req.params.id
  });

});


router.post('/journey/dvla-change-address/:id/phone-email', function (req, res) {

  db(function(userJourneys) {
    userJourneys.find({id: req.params.id}).toArray(function (err, docs) {

      if (req.body.email) {
        notify.sendEmail(
          "a65e12cb-030c-4944-8948-fc445d0e2936",
          req.body.email,
          {
            'name': docs[0].name || 'customer',
            'reference number': docs[0].id
          }
        );
      }

      if (req.body.phone) {
        notify.sendSms(
          "5e5c1075-fcae-432c-b344-1a00ef18ee84",
          req.body.phone
        );
      }

    });

  });

  db(function(userJourneys) {
    userJourneys.update(
      {id: req.params.id},
      {$set: req.body},
      function (err, result) {
        if(err) throw err;
      }
    );
  });

  res.redirect('/journey/dvla-change-address/' + req.params.id + '/result');

});


router.post('/journey/pay-dartford-crossing-charge/:id/pay', function (req, res) {

  db(function(userJourneys) {
    userJourneys.find({id: req.params.id}).toArray(function (err, docs) {

      if (docs[0].email) {
        notifyDart.sendEmail(
          "8d1cd00f-6a5e-4e76-98d8-7e6d2a45e7fe",
          docs[0].email
        );
      }

      if (docs[0].phone) {
        notifyDart.sendSms(
          "3a692856-cbef-4e98-949a-135f335f51ae",
          docs[0].phone,
          {
            'id': docs[0].id
          }
        );
      }

    });

    userJourneys.update(
      {id: req.params.id},
      {$set: req.body},
      function (err, result) {

        if(err) throw err;
      }
    );

  });

  res.redirect('/journey/pay-dartford-crossing-charge/' + req.params.id + '/result');

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



// Admin interface

router.get('/admin/:id/send/:type', function (req, res) {

  templates = {
    'email': [
      {
        name: 'Track licence',
        id: '1d905346-b1ca-49c3-99e1-258a33fcb63b',
      },
      {
        name: 'Licence delivered',
        id: 'fad4fb97-5630-482f-8e8e-cb85608352ef',
      }
    ],
    'phone': [
      {
        name: 'Track licence',
        id: '8b5eb752-be41-4766-ab80-e3f171eb3745',
      },
      {
        name: 'Licence delivered',
        id: 'ffa370ad-4129-4ceb-86b6-6a4c64db9250',
      },
    ],
  };

  db(function(userJourneys) {
    userJourneys.find({id: req.params.id}).toArray(function (err, docs) {

      res.render('dvla-change-address/update', {
        to: docs[0][req.params.type],
        options: templates[req.params.type],
        type: req.params.type,
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

      userJourneys.find({id: req.params.id}).toArray(function (err, docs) {

        notify.sendEmail(
          req.body.template,
          req.body.to, {
            name: docs[0].name || 'customer'
          }
        );

      });

    }

    userJourneys.update(
      {id: req.params.id},
      {$set: {'update-sent': Date.now()}},
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


router.get('/admin/:id/delete', function (req, res) {

  db(function(userJourneys) {

    userJourneys.deleteOne(
      {id: req.params.id},
      function (err, result) {

        if(err) throw err;

        res.redirect('/admin');

      }
    );

  });

});


router.get('/admin', function(req, res) {

  db(function(userJourneys) {
    userJourneys.find().sort({started: -1}).toArray(function (err, docs) {

      if(err) throw err;

      res.render('admin', {
        userJourneys: docs.map(function(element) {
          element.started = humanize.relativeTime(element.started / 1000);
          if (element['update-sent']) {
            element['update-sent'] = humanize.relativeTime(element['update-sent'] / 1000);
          }
          return element;
        }),
      });

    });

  });

});


module.exports = router;
