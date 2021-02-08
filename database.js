module.exports = (function() {
    'use strict';
    var databaseroute = require('express').Router();

    databaseroute.get('/database', function (req, res) {
        res.render('database', {title: 'Gimpact - Guides, Database', condition: false});
    });
    return databaseroute;
})();