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
	var today = new Date();	var minPerDay = 0;	var secsLeft = 0;	var secsRound = 0;	var secsRemain = 0;	var minLeft = 0;	var minRound = 0;	var minRemain = 0;		var startday = new Date();	startday.setFullYear(2014, 2, 12);	startday.setHours(24);	startday.setMinutes(0);	startday.setSeconds(0);	startday.setMilliseconds(0);		secsPerDay = 1000 ;	minPerDay = 60 * 1000 ;	hoursPerDay = 60 * 60 * 1000;	PerDay = 24 * 60 * 60 * 1000;	secsLeft = (today.getTime() - startday.getTime()) / minPerDay;	secsRound = Math.round(secsLeft);	secsRemain = secsLeft - secsRound;	secsRemain = (secsRemain < 0) ? secsRemain = 60 - ((secsRound - secsLeft) * 60) : secsRemain = (secsLeft - secsRound) * 60;		secsRemain = Math.round(secsRemain);		minLeft = ((today.getTime() - startday.getTime()) / hoursPerDay);	minRound = Math.round(minLeft);	minRemain = minLeft - minRound;	minRemain = (minRemain < 0) ? minRemain = 60 - ((minRound - minLeft) * 60) : minRemain = ((minLeft - minRound) * 60);		minRemain = Math.round(minRemain - 0.495);		hoursLeft = ((today.getTime() - startday.getTime()) / PerDay);	hoursRound = Math.round(hoursLeft);	hoursRemain = hoursLeft - hoursRound;	hoursRemain = (hoursRemain < 0) ? hoursRemain = 24 - ((hoursRound - hoursLeft) * 24)  : hoursRemain = ((hoursLeft - hoursRound) * 24);		hoursRemain = Math.round(hoursRemain - 0.5);		daysLeft = ((today.getTime() - startday.getTime()) / PerDay);	daysLeft = (daysLeft - 0.5);	daysRound = Math.round(daysLeft);		daysRemain = daysRound;		if (hoursRemain < 10) {		hoursRemain = "0" + hoursRemain;	}	if (minRemain < 10) {		minRemain = "0" + minRemain;	}	if (secsRemain < 10) {		secsRemain = "0" + secsRemain;	}
	var result = "第 <span class=\"digit\">" + daysRemain + "</span> 天 <span class=\"digit\">" + hoursRemain + "</span> 小时 <span class=\"digit\">" + minRemain + "</span> 分钟 <span class=\"digit\">" + secsRemain + "</span> 秒"; 
	$("#clock").html(result);
}
