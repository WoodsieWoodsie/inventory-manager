'use strict';

var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Item = require('../models/item');

// GET ALL ROOMS
router.get('/', function(req, res) {
  Room.find({}, function(err, roomsArr) {
    res.status(err ? 400 : 200).send(err ? err : roomsArr);
  })
  .populate('items');
});

// PUT AN ITEM IN A ROOM
router.put('/:roomId/addItem/:itemId', function(req, res){
  Room.findById(req.params.roomId, function(err, room){
    if (err) return res.status(400).send(err.message);
    Item.findById(req.params.itemId, function(err, item){
      if (err) return res.status(400).send(err.message); 
      if (room.items.indexOf(item._id) !== -1) {
        res.status(400).send('item already in room');
      } else {
        // item.hasParent = true;
        // console.log('item.hasParent?', item.hasParent);
        room.items.push(item._id);
        room.save(function(err, data){
          res.status(err ? 400 : 200).send(err ? 'item add failed' : data);
        });
      }
    });
  });
});

// FIND ALL ITEMS IN A ROOM
router.get(`/:id/findItems/`, function(req, res) {
  Room.findById(req.params.id, function(err, room) {
    if (err) return res.status(400).send(err.message);
    console.log('room', room);
    res.send(room.items);
  }).populate('items');
});


// GET A ROOM
router.get(`/:id`, function(req, res) {
  Room.findById(req.params.id, function(err, item) {
    res.status(err ? 400 : 200).send(err ? err : item);
  });
});

// UPDATE A ROOM
router.put(`/:id`, function(req, res) {
  Room.findByIdAndUpdate(req.params.id, req.body, function(err, room) {
    res.status(err ? 400 : 200).send(err ? err : `${req.body.name} saved`);
  });
});

// DELETE A ROOM
router.delete(`/:id`, function(req, res) {
  Room.findByIdAndRemove(req.params.id, function(err, room) {
    res.status(err ? 400 : 200).send(err ? err : 'room deleted');
  });
});

// ADD A ROOM
router.post('/', function(req, res) {
  Room.addRoom(req.body, function(err, room){
    res.status(err ? 400 : 200).send(err || room);
  });
});

module.exports = router;