module.exports = (function() {
    'use strict';
    var loginroute = require('express').Router();

    loginroute.get('/login', function (req, res) {
        res.render('login', {title: 'Gimpact - Guides, Database', condition: false});
    });


    return loginroute;
})();
