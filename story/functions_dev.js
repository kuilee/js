/**
 * http://www.manman520.com
 */
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}

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
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse() {
	var today = new Date();
	var minPerDay = 0;
	var secsLeft = 0;
	var secsRound = 0;
	var secsRemain = 0;
	var minLeft = 0;
	var minRound = 0;
	var minRemain = 0;
	
	var startday = new Date();
	startday.setFullYear(2014, 2, 12);
	startday.setHours(24);
	startday.setMinutes(0);
	startday.setSeconds(0);
	startday.setMilliseconds(0);
	
	secsPerDay = 1000 ;
	minPerDay = 60 * 1000 ;
	hoursPerDay = 60 * 60 * 1000;
	PerDay = 24 * 60 * 60 * 1000;
	secsLeft = (today.getTime() - startday.getTime()) / minPerDay;
	secsRound = Math.round(secsLeft);
	secsRemain = secsLeft - secsRound;
	secsRemain = (secsRemain < 0) ? secsRemain = 60 - ((secsRound - secsLeft) * 60) : secsRemain = (secsLeft - secsRound) * 60;
	
	secsRemain = Math.round(secsRemain);
	
	minLeft = ((today.getTime() - startday.getTime()) / hoursPerDay);
	minRound = Math.round(minLeft);
	minRemain = minLeft - minRound;
	minRemain = (minRemain < 0) ? minRemain = 60 - ((minRound - minLeft) * 60) : minRemain = ((minLeft - minRound) * 60);
	
	minRemain = Math.round(minRemain - 0.495);
	
	hoursLeft = ((today.getTime() - startday.getTime()) / PerDay);
	hoursRound = Math.round(hoursLeft);
	hoursRemain = hoursLeft - hoursRound;
	hoursRemain = (hoursRemain < 0) ? hoursRemain = 24 - ((hoursRound - hoursLeft) * 24)  : hoursRemain = ((hoursLeft - hoursRound) * 24);
	
	hoursRemain = Math.round(hoursRemain - 0.5);
	
	daysLeft = ((today.getTime() - startday.getTime()) / PerDay);
	daysLeft = (daysLeft - 0.5);
	daysRound = Math.round(daysLeft);
	
	daysRemain = daysRound;
	
	if (hoursRemain < 10) {
		hoursRemain = "0" + hoursRemain;
	}
	if (minRemain < 10) {
		minRemain = "0" + minRemain;
	}
	if (secsRemain < 10) {
		secsRemain = "0" + secsRemain;
	}
	var result = "<span class=\"digit\">" + daysRemain + "</span> day ";
	result += "<span class=\"digit\">" + hoursRemain + "</span> hr "
	result += "<span class=\"digit\">" + minRemain + "</span> min "
	result += "<span class=\"digit\">" + secsRemain + "</span> sec";
	
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}


function showLoveU() {
	$('#loveu').fadeIn(3000);
}
