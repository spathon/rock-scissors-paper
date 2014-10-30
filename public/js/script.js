'use strict';

var socket = io.connect();
var id = function(id) { return document.getElementById(id); };
var valueById = function(_id) { return id(_id).value; };


var Game = function() {

  this.$startChallenge = id('startChallenge');
  this.$gameOn = id('gameOn');

  this.init();
};

Game.prototype.init = function() {
  if(window.location.pathname.match('\/game\/[a-z0-9]+\/?')){
    this.gameOn();
  }
}

Game.prototype.gameOn = function() {
  this.$startChallenge.classList.toggle('hidden');
  this.$gameOn.classList.toggle('hidden');
};



var theGame = new Game;





document.forms.startChallenge.onsubmit = function(e){

  e.preventDefault();

  var data = {
    challenger: valueById('challenger'),
    opponent: valueById('opponent')
  };

  socket.emit('new game', data);

  return false;
};


socket.on('game on', function(id){
  // window.location = '/game/'+ id;
  window.history.pushState({ do_I: 'matter' }, 'Start game on', '/game/'+ id);
  theGame.gameOn();
});
