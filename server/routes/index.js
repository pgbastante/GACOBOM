'use strict';

var express = require('express'),
    http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

var router = express.Router();

router.get('/games', function (req, res, next) {
    var filePath = path.join(__dirname, '../dummy/games.json');
    res.sendFile(filePath);
});

router.get('/games/:id', function (req, res) {
    var filePath = path.join(__dirname, '../dummy/game.json');
    res.sendFile(filePath);
});

router.get('/games/:id/cover', function (req, res) {
    var filePath = path.join(__dirname, '../dummy/doom_2.jpg');
    res.sendFile(filePath);
});

router.get('/games/:id/media/:mediaId', function (req, res) {
    var filePath = path.join(__dirname, '../dummy/test_thumbnail.gif');
    res.sendFile(filePath);
});

router.get('/games/:id/art/:artId', function (req, res) {
    var filePath = path.join(__dirname, '../dummy/artwork_example.jpg');
    res.sendFile(filePath);
});

router.get('/count', function (req, res, next) {
    res.status(200).json({"games": 100, "books": 200, "comics": 10000});
});

module.exports = router;
