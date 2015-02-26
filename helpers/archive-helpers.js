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

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, {encoding: 'utf8'}, function (err, data) {
    console.log('data inside readLOU:', data);

    if (err) { throw err;}
    cb.call(null, data);
  });
  // console.log('inside functions urlList: ', urlList);
  // return urlList;
};

exports.isUrlInList = function(url){
  exports.readListOfUrls(function(data){
    console.log('data:', data);
    var urlList = data.split('\n');
    console.log(urlList);
    for (var i = 0; i < urlList.length; i++){
      console.log('url', url);
      console.log('urlList[i]', urlList[i]);
      if (url === urlList[i]){
        return true;
      }
    }
  });
  return false;
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(url){
  var archivedUrl = exports.paths.archivedSites + url;

  console.log('archivedUrl: ', archivedUrl);

  fs.open(archivedUrl, 'r', function(err, fd) {
    if (err) {
      console.log('cant open something that aint there');
      return false;
    }
    console.log('i can open that up')
    // fs.close(fd);
    return true;

  });

};

exports.downloadUrls = function(){
};
