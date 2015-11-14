'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res) {
  Item.find({}, function(err, items){
    if (err) return res.status(400).send('ya done screwed up, son.');
    res.render("index", {items: items});
  });
});

// router.post('/', function(req, res) {
//   console.log(req.query);
//   res.send(req.query);
// });

module.exports = router;
