'use strict';

var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Room;

var roomSchema = Schema({
  name: {type: String, required: true, unique: true},
  createdAt: {type: Date, default: new Date()},
  items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

roomSchema.statics.addRoom = function(room, cb){
  var newRoom = new Room(room);
  newRoom.save(cb);
};

Room = mongoose.model('Room', roomSchema);

module.exports = Room;




