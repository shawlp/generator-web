const path = require("path");
const fs = require("fs");

function getAllFiles(dir, callback, finish) {
  fs.readdir(dir, function(err, files) {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((filename, index) => {
      let pathname = path.join(dir, filename);
      fs.stat(pathname, (err, stats) => {
        // 读取文件信息
        if (err) {
          console.log("获取文件stats失败");
          return;
        }
        if (stats.isDirectory()) {
          getAllFiles(pathname, callback, finish);
        } else if (stats.isFile()) {
          console.log("created:");
          callback && callback(pathname);
        }
      });
      if (index === files.length - 1) {
        finish && finish();
      }
    });
  });
}

exports.getAllFiles = getAllFiles;
