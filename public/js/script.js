'use strict';

var socket = io.connect();
var $id = function(id) { return document.getElementById(id); };
var $valueById = function(id) { return $id(id).value; };


var Game = function() {

  this.$startChallenge = $id('startChallenge');
  this.$gameOn = $id('gameOn');
  this.id = '';

  this.init();
};

Game.prototype.init = function() {
  var gamePath = window.location.pathname.match('\/game\/[a-z0-9]+');
  if(gamePath){
    var id = gamePath[0].replace('/game/', '');
    this.gameOn(id);
  }
};

Game.prototype.gameOn = function(id) {
  this.id = id;
  this.$startChallenge.classList.toggle('hidden');
  this.$gameOn.classList.toggle('hidden');

  $id('gameId').value = window.location.href;
};

var theGame = new Game();


document.forms.startChallenge.onsubmit = function(e){

  e.preventDefault();

  var data = {
    challenger: $valueById('challenger'),
    opponent: $valueById('opponent')
  };

  socket.emit('new game', data);

  return false;
};


// Select all text when clicking
var gameId = $id('gameId');
gameId.parentNode.addEventListener('click', function(){ gameId.select(); }, false);



socket.on('game on', function(id){
  // window.location = '/game/'+ id;
  window.history.pushState({ do_I: 'matter' }, 'Start game on', '/game/'+ id);
  theGame.gameOn(id);
});
