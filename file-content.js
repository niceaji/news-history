/*
 * 
 * 로컬파일내용을 return 
 * 
 * 
 */ 
var fs = require('fs');

function get(filename,callback){
	
	fs.readFile(filename, function (err, data) {
		if (err) {
			throw err;
		}
		
		callback(data);
	});
}

exports.get = get;