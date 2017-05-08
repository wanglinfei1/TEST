var router = require('koa-router')();

router.get('/', function *(next) {
  yield this.render('index', {
      title: 'index',
      styles:[
      ],
      scripts:[
        "js/index.js"
      ]
  });
});
router.get('/index', function *(next) {
    yield this.render('index', {
        title: 'index',
        styles:[
        ],
        scripts:[
            "js/index.js"
        ]
    });
});
router.get('/users', function *(next) {
  yield this.render('users', {
      title: 'users',
      data:1111,
      styles:[],
      scripts:[]
  });
});
router.get('/test', function *(next) {
  yield this.render('test', {
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
