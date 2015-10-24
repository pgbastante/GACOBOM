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

router.get('/games/:id/file/:artId', function (req, res) {
    var filePath = path.join(__dirname, '../dummy/walkthrough.txt');
    res.download(filePath);
});

router.post('/games/:id/media', function (req, res) {
    res.json({id: 14, name: 'filename', description: 'desc', type: 'image', group: 'media'});
});

router.get('/count', function (req, res, next) {
    res.status(200).json({games: 100, books: 200, comics: 10000});
});

router.get('/platforms', function (req, res) {
    var filePath = path.join(__dirname, '../dummy/platforms.json');
    res.sendFile(filePath);
});

router.get('/companies', function (req, res) {
    var filePath = path.join(__dirname, '../dummy/companies.json');
    res.sendFile(filePath);
});


module.exports = router;
