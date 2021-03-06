var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('../web/http-helpers');
var httpRequest = require('http-request');
var URI = require('URIjs');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, {encoding: 'utf8'}, function (err, data) {
    console.log('data inside readLOU:', data);

    if (err) { throw err; }
    cb.call(null, data.split('\n'));
  });
};

exports.isUrlInList = function(url){
  // exports.readListOfUrls(function(data){
  //   console.log('data:', data);
  //   var urlList = data.split('\n');
  //   console.log(urlList);
  //   for (var i = 0; i < urlList.length; i++){
  //     console.log('url', url);
  //     console.log('urlList[i]', urlList[i]);
  //     if (url === urlList[i]){
  //       return true;
  //     }
  //   }
  // });
  return false;
};

exports.addUrlToList = function(url, res){
  console.log('url:', url)
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    if (err) {
      throw err;
    }

    // redirect to loading.html
    httpHelpers.serveAssets(res, exports.paths.siteAssets + '/loading.html', httpHelpers.sendResponse, 302);

    // httpHelpers.sendResponse(res, 'POSTed', 302);
  });
};

// does all the work to handle the logic on a GET request
exports.isURLArchived = function(url, res){
  var archivedUrl = exports.paths.archivedSites + url;
  fs.open(archivedUrl, 'r', function(err, fd) {
    if (err) {
      // 404
      httpHelpers.sendResponse(res, 'we got nothing', 404);
    } else {
      // serve the archived site
      httpHelpers.serveAssets(res, archivedUrl, httpHelpers.sendResponse);
    }
  });
};

// go look for that url and archive it
exports.downloadUrl = function(url){
  var archivedUrl = exports.paths.archivedSites + '/' + url;
  console.log('downloading from URL ' + url);
  fs.open(archivedUrl, 'r', function(err, fd) {
    // if we don't already have a file in archivedSites
    if (err) {
      // download the html for the requested site
      httpRequest.get(url, function(err, res) {
        fs.appendFile(archivedUrl, res.buffer.toString(), function() {
          console.log('downloaded file');
        });
      });
    }
  });
};
