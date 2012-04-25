var request = require('request');

function call(url, callback){
	//https://github.com/mikeal/request
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(body); //인자로 받은 callback() 호출 
		}
	});
}

//함수 export 
exports.call = call;
