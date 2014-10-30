'use strict';

var Game = require('mongoose').model('Game');

module.exports = function (io) {

  io.on('connection', function (socket) {

    // Start a new game
    socket.on('new game', function(data){

      // Create the game
      var game = new Game( data );
      game.save(function (err, game) {
        if (err) {
          console.log(err);
          return socket.emit('error', { message: 'Could not create the game' });
        }

        // return the game id
        socket.emit('game on', game._id );

      });

    });


  });
};
