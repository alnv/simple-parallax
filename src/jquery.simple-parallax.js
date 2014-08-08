/*!
 * jQuery each2 - v0.2 - 8/02/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Inspired by James Padolsey's quickEach
 * http://gist.github.com/500145
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function($) {
  
  // Create a placeholder jQuery object with a length of 1. The single item
  // is completely arbitrary and will be replaced.
  var jq = $([1]);
  
  $.fn.each2 = function( fn ) {
    var i = -1;
    
    while (
      // Set both the first element AND context property of the placeholder
      // jQuery object to the DOM element. When i has been incremented past the
      // end, this[++i] will return undefined and abort the while loop.
      ( jq.context = jq[0] = this[++i] )
      
      // Invoke the callback function in the context of the DOM element,
      // passing both the index and the placeholder jQuery object in. Like
      // .each, if the callback returns `false`, abort the while loop.
      && fn.call( jq[0], i, jq ) !== false
    ) {}
    
    // Return the initial jQuery object for chainability.
    return this;
  };
  
})(jQuery);


(function(){

	'use strict';
	
	$.fn.parallax = function(_opt){
		
		
		var agent = navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi);	
		var isMobile = false;
		if(agent !== null){
			isMobile = true;
		}
		
		var jWindow = $(window);
		var maxHeight = $(window).height();
		var scrollY = jWindow.scrollTop();
		var self = this;
		var options = {
			offset: 5,
			dir: 'down',
			mobile: isMobile
		};
		var off;
		var attr = {};
		for (var opt in _opt) {
			
			options[opt] = _opt[opt] || options[opt];

			if(opt === 'mobile' && _opt[opt] === false){
				options[opt] = false;
			}
			
		}
		
		//create rfa http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
		window.requestAnimFrame = (function(){
			
			return 	window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							function (callback){
								window.setTimeout(callback, 1000 / 60);
							}
			
		})();
		
		
		
		if(!options.mobile){
			
			loop();
			
		}
		
		
		
		function loop(){
			
			requestAnimFrame(loop);
			render();
			
		};
		
		
		
		function render(){
		
			scrollY = jWindow.scrollTop();
			if(scrollY < 0){
				scrollY = 0;
			}
			self.each2(function(index, el){
				
				
				animate(el, getAttr(el));
				
				
			});
			
			
		}
		
		
		
		function getAttr(el){
			
			attr.offset = $(el).attr('data-offset') || options.offset;
			attr.dir = $(el).attr('data-dir') || options.dir;
			
			return attr;
			
		}
		
		
		function animate(el, attr){
			
			if(attr.dir === 'up'){
				$(el).css({
					'transform': 'translate(0, -'+ scrollY/attr.offset +'px)'
				});
			}else{
				$(el).css({
					'transform': 'translate(0, '+ scrollY/attr.offset +'px)'
				});
			}
			
		}
		
		
	}
	

})();