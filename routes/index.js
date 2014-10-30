var express = require('express');
var router = express.Router();
// var Game = require('mongoose').model('Game');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.get('/game/:id', function(req, res){

  res.render('index', { id: req.params.id });

  // Game.findyId(req.params.id, function(err, game){
  //   res.render('index', { })
  // });

});


module.exports = router;
