/*
 * 
 * newsid로 제목,내용 뽑아오기 
 * 
 */ 
var jsdom = require("jsdom");

var url = "http://m.media.daum.net/media/sisa/newsview/#{newsid}";

function get(newsid, callback){

	jsdom.env(url.replace("#{newsid}",newsid), [
	        'http://code.jquery.com/jquery-1.5.min.js'
	    ],
	    function(errors, window) {
		
			var $ = window.$,
				result = {};
			
			result = {
				//뉴스제목 
				title : $('h3').html(),
				//뉴스내용 
				content : $('#news_content').html()
			};
			
			callback(result);
			
		}//end function
	);
}

exports.get = get;
