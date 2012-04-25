/*
 * 
 * http://media.daum.net/netizen/newsbox 에서 뉴스목록만 가져옴 
 * 
 */ 
var jsdom = require("jsdom");

function get(callback){

	jsdom.env("http://media.daum.net/netizen/newsbox", [
	        'http://code.jquery.com/jquery-1.5.min.js'
	    ],
	    function(errors, window) {
		
			var $ = window.$,
				result = [];
			
		    //jsdom으로 불러와서 우리가 원하는 부분 스크랩핑
			$('.section_statsbox a').each(function(){ 
				var href = $(this).attr('href'),
					title = $(this).text(),
					newsid = '';
				
				//a링크에서 숫자 17자리 가져와서 newsid로 저장
				if(/[0-9]{17}/.test(href)){
					newsid = href.replace(/.+([0-9]{17}).*/, "$1");
				}
				
				//newsid 와 title이 있는 링크만 api에 추가 
				if(newsid && title) {
					title = encodeURIComponent(title);
					
			    	result.push({
			    		newsid : newsid,
			    		text : title
			    	});
				}
			}); 
			
			callback(result);
			
		}//end function
	);
}

exports.get = get;
