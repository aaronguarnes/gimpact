module.exports = (function() {
    'use strict';
    var forumroute = require('express').Router();

    forumroute.get('/forum', function (req, res) {
        res.render('forum', {title: 'Gimpact - Guides, Database', condition: false});
    });
    return forumroute;
})();