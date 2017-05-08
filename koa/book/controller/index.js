module.exports = {
    index: function*(){
        yield this.render('index',{
            "title":"koa demo",
            "styles":[
            ],
            "scripts":[
                "js/index.js"
            ]
        });
    },
    test: function*(){
        yield this.render('test',{
            "title":"test",
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
    }
}