var path = require('path');
var fs = require('fs');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

var actions = {
  'GET': function(req, res) {
    var thisUrl = req.url;

    if (thisUrl === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', httpHelpers.sendResponse);
    }
    else {
      archive.isURLArchived(thisUrl, res);
    }


    // else if it looks like a website
      // then return loading page
      // send workers to find page
    // else 404
  },
  'POST': function(req, res) {
    // serveStaticAssets(res, archive.paths.archivedSites);
    // if req.url is in sites.txt
      // save a new copy?
    // else
      // call helper function to add req.url to sites.txt
      // send workers to find page
    var thisUrl = req._postData.url;
    // console.log('post: ', req.);
    console.log('thisUrl: ', thisUrl);
    archive.addUrlToList(thisUrl, res);
  },
  'OPTIONS': function(req, res) {
    httpHelpers.sendResponse(res, archive.paths.list);
  }
};

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  console.log('handling a ' + req.method);
  if (action) {
    action(req, res);
  } else {
    httpHelpers.sendResponse(res, 'Not Found', 404);
  }
};
