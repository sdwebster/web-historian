var path = require('path');
var fs = require('fs');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

// var headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10,
//   'Content-Type': 'text/html'
// };

var sendResponse = function(res, data, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, httpHelpers.headers);
  res.end(data);
};

var actions = {
  'GET': function(req, res) {
    var thisUrl = req.url;

    if (thisUrl === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', sendResponse);
    }

    if (archive.isURLArchived(thisUrl)){
    // if (archive.isUrlArchived(thisUrl.slice(1))){
      console.log('full path: ', archive.paths.archivedSites + thisUrl);
      httpHelpers.serveAssets(res, archive.paths.archivedSites + thisUrl, sendResponse);
    }

    // if req.url is in sites.txt
      // then serve content as a static asset
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

  },
  'OPTIONS': function(req, res) {
    sendResponse(res, archive.paths.list);
  }
};

// collectData function

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  console.log('handling a ' + req.method);

  if (action) {
    action(req, res);
  } else {
    sendResponse(res, 'Not Found', 404);
  }

  // res.end(archive.paths.list);
};
