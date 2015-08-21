    var socket = io();
    var testNum = 200;

    var weightItem = document.getElementById('weight');

    socket.on('message', function(message) {

      weightItem.innerHTML = message.result;

      testNum = message.result;

    });