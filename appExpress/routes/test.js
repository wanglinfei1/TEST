/**
 * Created by wanglinfei on 2017/4/26.
 */
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('test', {
        "title": "test",
        "styles": [
            "../css/jquery-ui-1.10.1.css",
            "../css/lugo.datepicker.css",
            "../css/test.css"
        ],
        "scripts": [
            "../js/common/jquery-ui-1.10.1.min.js",
            "../js/common/datepicker.js",
            "../js/common/ejs.min.js",
            "../js/common/page.js",
            "../js/test.js"
        ]
    });
});
module.exports = router;
