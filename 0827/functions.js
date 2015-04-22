/*
 * http://www.manman520.com
 */
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 90);
		});
		return this;
	};
})(jQuery);

function timeElapse() {
	var today = new Date();
	var result = "第 <span class=\"digit\">" + daysRemain + "</span> 天 <span class=\"digit\">" + hoursRemain + "</span> 小时 <span class=\"digit\">" + minRemain + "</span> 分钟 <span class=\"digit\">" + secsRemain + "</span> 秒"; 
	$("#clock").html(result);
}