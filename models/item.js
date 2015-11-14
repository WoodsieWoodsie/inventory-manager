'use strict';

var mongoose = require('mongoose');

var Item;

var itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  value: {type: Number},
  description: String,
  createdAt: {type: Date, default: new Date()}
});

itemSchema.statics.addItem = function(item, cb){
  var newItem = new Item(item);
  newItem.save(cb);
};

Item = mongoose.model('Item', itemSchema);

module.exports = Item;