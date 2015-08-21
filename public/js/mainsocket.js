    var socket = io();

    var weightItem = document.getElementById('weight');

    socket.on('message', function(message) {

      var item = JSON.parse(message);

      weightItem.innerHTML = item.result;

    });