var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
var rawUrlList = '';

exports.readListOfUrls = function(){
  return fs.readFile(exports.paths.list, {encoding: 'utf8'}, function (err, data) {
    if (err) { throw err;}
    rawUrlList += data;
    // return urlList;
  });
  // console.log('inside functions urlList: ', urlList);
  // return urlList;
};

exports.isUrlInList = function(url){
  exports.readListOfUrls();
  var urlList = rawUrlList.split('\n');
  console.log(urlList);
  console.log(urlList);
  // var urlList = exports.readListOfUrls().split("\n");
  // var urlWithoutSlash = url.slice(1);
  // for (var i = 0; i < urlList.length; i++){
  //   console.log('urlWithoutSlash', urlWithoutSlash);
  //   console.log('urlList[i]', urlList[i]);
  //   if (urlWithoutSlash === urlList[i]){
  //     return true;
  //   }
  // }
  // return false;
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};
