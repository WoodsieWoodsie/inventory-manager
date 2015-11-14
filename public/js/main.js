'use strict';

$(document).ready(init);

function init() {
  console.log('Hello jQuery!');
  printExisting();
  $('.roomNames').on('click', 'button', itemsView);
  $('.create-room').click(createRoom);
  $('.create-item').click(createItem);
}

function createItem() {
  var itemName = $('.nameItem').val();
  var itemValue = '$' + $('.valueItem').val();
  var itemDescription = $('.describeItem').val();
  $.post('/items', {name: itemName, value: itemValue, description: itemDescription})
  .done(function(data) {
    console.log("create item data: ", data);

    $('.nameItem').empty();
    $('.valueItem').empty();
    $('.describeItem').empty();

  })
  .fail(function(err) {
    console.error(err);
  });
}

function createRoom() {
  var roomInput = $('.nameRoom').val();
  console.log(roomInput);
  $.post('/rooms', {name: roomInput})
  .done(function(data) {
    console.log("create room data: ", data);
    var $roomNamesDiv = $('.roomNames');
    var id = data._id;
    var $roomName = $('<p>');
    $roomName.append($('<button>').addClass('btn btn-default').data('mongoid', id).text(data.name));
    $roomNamesDiv.append($roomName);
    $('.rooms-panel').append($roomNamesDiv);
    $('.nameRoom').val('');
  })
  .fail(function(err) {
    console.error(err);
  });
}

function printExisting() {
  $.get('/rooms')
  .done(function(data){
    var $roomNamesDiv = $('.roomNames');
    data.map(function(element, index) {
      var id = element._id;
      var $roomName = $('<p>');
      $roomName.append($('<button>').addClass('btn btn-default').data('mongoid', id).text(element.name));
      $roomNamesDiv.append($roomName);
    });
    $('.rooms-panel').append($roomNamesDiv);
  })
  .fail(function(err){
    console.error(err)
  });
}

function itemsView(e) {
  var $target = $(e.target);
  var mongoid = $target.data('mongoid');
  $.get(`/rooms/${mongoid}/findItems`)
  .done(function(data){

    var $itemsInRoomDiv = $('.itemsInRoom');
    $itemsInRoomDiv.empty();
    data.map(function(element) {
      var id = element._id;
      var $item = $('<p>').data('mongoid', id).text(element.name + ' ' + element.value + ' ' + element.description);

      $itemsInRoomDiv.append($item);
    });
    $('.items-panel').append($itemsInRoomDiv);
  })
  .fail(function(err){
    console.error(err)
  });
}