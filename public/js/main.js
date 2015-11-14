'use strict';

$(document).ready(init);

function init() {
  printExisting();
  $('.roomNames').on('click', 'button', itemsView);
  $('.create-room').click(createRoom);
  $('.create-item').click(createItem);
  $('.items-floating').on('click', '.btn', goToChoiceBox);
}


function goToChoiceBox(event) {
  var $targetItemId = $(event.target).data('mongoid');
  location.href = '#choicePanel';
  $('.choice-panel').on('click', 'button', addItemToRoom);
  function addItemToRoom(e) {
    var $targetRoom = $(e.target);
    var roomId = $targetRoom.data('mongoid');
    $.ajax({
      method: 'PUT',
      url: `/rooms/${roomId}/addItem/${$targetItemId}`,
    });
  }
}

function createItem() {
  var itemName = $('.nameItem').val();
  var itemValue = $('.valueItem').val();
  var itemDescription = $('.describeItem').val();
  $.post('/items', {name: itemName, value: itemValue, description: itemDescription})
  .done(function(data) {
    var $itemsDiv = $('.items');
    var id = data._id;
    var $itemData = $('<a>').data({'mongoid': id, href: '#choicePanel'}).addClass('btn btn-default').append($('<p>').text(`Item: ${data.name} Value: $ ${data.value} Description: ${data.description}`).data({'mongoid': id, href: '#choicePanel'}));
    $itemsDiv.append($itemData);
    $('.items-floating').append($itemsDiv);
    $('.nameItem').val('');
    $('.valueItem').val('');
    $('.describeItem').val('');

  })
  .fail(function(err) {
    console.error(err);
  });
}

function createRoom() {
  var roomInput = $('.nameRoom').val();
  $.post('/rooms', {name: roomInput})
  .done(function(data) {
    var $roomNamesDiv = $('.roomNames');
    var name = data.name;
    var id = data._id;
    var $roomName = $('<button>');
    $roomName.data('mongoid', id);
    $roomName.addClass('btn btn-default');
    $roomName.text(data.name);

    $roomNamesDiv.append($roomName);
    $('.rooms-panel').append($roomNamesDiv);
    
    var $roomName2 = $roomName.clone();
    $roomName2.data('mongoid', id);
    $('.choice-panel').append($roomName2);
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
      var $roomName = $('<button>');
      $roomName.data('mongoid', id);
      $roomName.addClass('btn btn-default');
      $roomName.text(element.name);
      
      var $roomName2 = $roomName.clone();
      $roomName2.data('mongoid', id);
      $roomNamesDiv.append($roomName);
      $('.choice-panel').append($roomName2);
    });
    $('.rooms-panel').append($roomNamesDiv);
  })
  .fail(function(err){
    console.error(err)
  });

  $.get('/items')
  .done(function(data){
    var $itemsDiv = $('.items');
    data.map(function(element) {
      var id = element._id;
      var $itemData = $('<a>').data({'mongoid': id, href: '#choicePanel'}).addClass('btn btn-default item-floating').append($('<p>').text(`Item: ${element.name}... Value: $ ${element.value}... Description: ${element.description}`).data({'mongoid': id, href: '#choicePanel'}));
      $itemsDiv.append($itemData);
    });
    $('.items-floating').append($itemsDiv);
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
      var $item = $('<p>').data('mongoid', id).text(element.name + ' $' + element.value + ' ' + element.description);
      $itemsInRoomDiv.append($item);
    });
    $('.items-panel').append($itemsInRoomDiv);
  })
  .fail(function(err){
    console.error(err)
  });
}