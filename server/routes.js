var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('index.html');
});

router.get('/query', function(req, res, next){
    console.log('query');
    res.send("Poo");
});

module.exports = router;
