'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');

router.get('/', function(req, res) {
  Item.find({}, function(err, itemsArr) {
    res.status(err ? 400 : 200).send(err ? err : itemsArr);
  });
});

router.get(`/:id`, function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    res.status(err ? 400 : 200).send(err ? err : item);
  });
});

router.put(`/:id`, function(req, res) {
  Item.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item) {
    res.status(err ? 400 : 200).send(err ? err : `${req.body.name} saved`);
  });
});

router.delete(`/:id`, function(req, res) {
  Item.findByIdAndRemove(req.params.id, function(err, item) {
    res.status(err ? 400 : 200).send(err ? err : 'item deleted');
  });
});

router.post('/', function(req, res) {
  Item.addItem(req.body, function(err, item){
    res.status(err ? 400 : 200).send(err || item);
  });
});

module.exports = router;