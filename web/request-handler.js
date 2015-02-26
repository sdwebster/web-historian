var path = require('path');
var fs = require('fs');
var url = require('url');
var archive = require('../helpers/archive-helpers');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'text/html'
};

var sendResponse = function(res, data, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(data);
};

var serveStaticAssets = function(res, filename) {
  console.log('looking for static asset at', filename);
  fs.readFile(filename, function (err, data) {
    if (err) { throw err;}
    sendResponse(res, data);
  });
};

var actions = {
  'GET': function(req, res) {
    var thisURL = req.url;

    if (thisURL === '/') {
      serveStaticAssets(res, archive.paths.siteAssets + '/index.html');
    }

    // download sites.txt
    if (archive.isUrlInList(thisURL)){
      console.log('full path: ', archive.paths.archivedSites + thisURL);
      serveStaticAssets(res, (archive.paths.archivedSites + thisURL));
    }
    // fs.readFile(archive.paths.archivedSites + '/sites.txt')
    // if (thisURL) {
    //   console.log('outside: ', archive.readListOfUrls());
    //   res.end('finished');
    // }

    // if req.url is in sites.txt
      // then serve content as a static asset
    // else if it looks like a website
      // then return loading page
      // send workers to find page
    // else 404
  },
  'POST': function(req, res) {
    // serveStaticAssets(res, archive.paths.archivedSites);

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
