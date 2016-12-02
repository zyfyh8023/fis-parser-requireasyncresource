/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';
module.exports = function (content, file, conf) {
    var fs = require("fs");
    var fileName=conf.fileroot || 'requireAsync.txt';
    var filePath=fis.project.getProjectPath()+'/'+fileName;
    var requireAsyncStr='';
    fs.exists(filePath,function(exists){
        if(exists){
            if(!file.subpath.match('output-webapp')){
                var pageRequireAsync=content.match(/require.async\([\'|\"].*?\,/g);
                if(pageRequireAsync){
                    var tmpVal=pageRequireAsync.join(';');
                    tmpVal=tmpVal.replace(/,/g, ')');
                    tmpVal=tmpVal.match(/[\'|\"].+?[\'|\"]/g);
                    requireAsyncStr=','+tmpVal;
                }
            }
            if(requireAsyncStr){
               fs.writeFileSync(filePath, requireAsyncStr, {flag:'a'});
            }
        }
        if(!exists){
            console.log(filePath+"文件不存在");
        }
    });
    return content;
};

