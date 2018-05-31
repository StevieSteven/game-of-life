'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var PORT = 8080;

app.use('/', _express2.default.static(__dirname + '/../../client/build/'));

app.listen(PORT, function () {
    console.log("server started on port " + PORT);
});
