'use strict';

var express = require('express'),
    http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

var router = express.Router();

router.get('/games', function (req, res, next) {
    var filePath = path.join(__dirname, 'games.json');
    var stat = fileSystem.statSync(filePath);
    res.writeHead(200, {
        'content-type': 'application/json',
        'content-length': stat.size
    });
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
});

router.get('/count', function (req, res, next) {
    res.status(200).json({"games": 100, "books": 200, "comics": 10000});
});

module.exports = router;
