"use strict";
exports.__esModule = true;
require("zone.js/dist/zone-node");
var functions = require("firebase-functions");
var express = require("express");
var platform_server_1 = require("@angular/platform-server");
var fs = require("fs");
var document = fs.readFileSync(__dirname + '/dist-server/index.html', 'utf8');
var AppServerModuleNgFactory = require(__dirname + '/dist-server/main.bundle').AppServerModuleNgFactory;
// WARN - workaround to compile using angular material
var window = global;
global['window'] = window;
var app = express();
app.get('**', function (req, res) {
    var url = req.path;
    platform_server_1.renderModuleFactory(AppServerModuleNgFactory, { document: document, url: url })
        .then(function (html) {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(html);
    });
});
exports.ssrapp = functions.https.onRequest(app);
