module.exports = function (io) {
  'use strict';

  io.on('connection', function (socket) {



    socket.emit('news', { data: 'Yes' });

    socket.on('my other event', function (data) {
      console.log('Data: ', data);
    });



  });
};
