var http = require('http'),
	url = require('url'),
	newsList = require('./news-list'),
	newsView = require('./news-view'),
	loadUrl = require('./loadurl'),
	fileContent = require('./file-content');
    

//http 서버 띄움 (8889포트)
http.createServer(function (req, res) {
	
	var urlObj = url.parse(req.url, true),
		output = '';
	
	//들어오는 주소에 따라 분기처리 
	if(urlObj.pathname == "/") {
		//fileContent 모듈사용 
		fileContent.get("index.html", function(data){
			res.writeHead(200, {'Content-Type': 'text/html;'});
			res.end(data);
		});
	}
	else if(urlObj.pathname == "/view") {
		
		fileContent.get("view.html", function(data){

			var newsid = urlObj.query.newsid;
			
			//newsView.get() 로 바로 호출해도 되지만 
			loadUrl.call("http://127.0.0.1:8889/api/view?newsid="+newsid, function(api){
				api = JSON.parse(api);
				data = data.toString();
				data = data.replace("#{title}", api.title).replace("#{content}", api.content);
				res.writeHead(200, {'Content-Type': 'text/html;'});
				res.end(data);
			});
			
		});
	}
	// /api/list 
	else if(urlObj.pathname == "/api/list") {
		
		//newsList 모듈사용 
		newsList.get(function(data){
			var callback = urlObj.query.callback ;
			//callback 파라미터가 있을경우 jsonp 만들어주기 
			if(callback) {
				output = callback+ "(" + JSON.stringify( data ) + ")";
			}
			else {
				output = JSON.stringify( data );
			}
			
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			res.end( output );
		});
	}
	// /api/view?newsid=1234....
	else if(urlObj.pathname == "/api/view"){
		var newsid = urlObj.query.newsid;
		
		newsView.get(newsid, function(data){
			
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			res.end( JSON.stringify( data ) ); 
		});
	}
	else {
		output = JSON.stringify( {message:'404 Not Found!'} );
		
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.end( output );   		
	}
	
}).listen(8889, "127.0.0.1"); 

console.log('News History Server!!');