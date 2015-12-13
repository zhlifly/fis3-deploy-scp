/**
 * fis.baidu.com
 */
var _ = fis.util;
var path = require("path");
var fs = require("fs");
var child_process = require("child_process");

module.exports = function(options, modified, total, callback) {
  if (!options.to) {
    throw new Error('options.to is required!');
  } else if (!options.source) {
    throw new Error('options.source is required!');
  }

  var to = options.to;
  var source = options.source;
  var server = options.server;

  var outputpath = path.join(process.cwd(),source);

  //for cygwin environment
  var pathsplit = outputpath.split(':');

  if (pathsplit.length > 1) {

    for(var i=0;i<pathsplit.length;i++) {
      
      if (i == 0) {

        outputpath = "/cygdrive/" + pathsplit[i].toLowerCase();

      } else {

        outputpath = outputpath + pathsplit[i];

      }

    }

  } 

  var cmd = 'cd ' + outputpath + ';zip -r dist.zip ./*';
  var scp_cmd = "scp " + path.join(source,"./dist.zip") + " " + server + ":" + to +" ";
  var unzip_cmd = "ssh " + server + " \"cd " + to + ";unzip -o dist.zip;rm -rf dist.zip;exit;\""
  child_process.exec(cmd,function(e,p){
    if(e){
      console.log(e);
    }else{
      console.log("|||-> 本地打包完成")
    }
    child_process.exec(scp_cmd,function(e1,p1){
      if(e1){
        console.log(e1);
      }else{
        console.log("|||-> 上传完成")
      }
      child_process.exec(unzip_cmd,function(e2,p2){
        if(e2){
          console.log(e2);
        }else{
          console.log("|||-> 远程部署完成")
        }
        fs.unlink(path.join(source,"./dist.zip"),function(e3){
          if(e3){
            console.log(e3);
          }else{
            console.log("|||-> 本地清理完成")
          }
        })
      })
    })
  })
};

