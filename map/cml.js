/**
 * http://www.manman520.com
 * by lucky.
 */
$(function() {
	MM.love.you.init();
});

(function(a,b){"use strict";var c=function(){var a=[["requestFullscreen","exitFullscreen","fullscreenchange","fullscreen","fullscreenElement"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitfullscreenchange","webkitIsFullScreen","webkitCurrentFullScreenElement"],["mozRequestFullScreen","mozCancelFullScreen","mozfullscreenchange","mozFullScreen","mozFullScreenElement"]];for(var c=0,d=a.length;c<d;c++){var e=a[c];if(e[1]in b)return e}}();if(!c)return a.screenfull=!1;var d="ALLOW_KEYBOARD_INPUT"in Element,e={init:function(){return b.addEventListener(c[2],function(a){e.isFullscreen=b[c[3]],e.element=b[c[4]],e.onchange(a)}),this},isFullscreen:b[c[3]],element:b[c[4]],request:function(a){a=a||b.documentElement,a[c[0]](d&&Element.ALLOW_KEYBOARD_INPUT),b.isFullscreen||a[c[0]]()},exit:function(){b[c[1]]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(){}};a.screenfull=e.init()})(window,document)

$.namespace("MM.love.you");
MM.love.you = {
	// 背景音乐
	MUSIC:"",
	//全局变量 map
	map:"",
	init: function() {
		 var that = this;
		 that.initDom();
		 that.initData();
		 that.initEvent();
		 that.initSM();
	},
	initDom: function() {
	},
	initData:function() {
		var that = this;
	},
	initEvent: function() {
	},
	//初始化音频播放类
	initSM: function() {
		var that = this;
		soundManager.setup({
			url: MM.constants.SM_URL,
			onready: that.initMP3
		});
	},
	
	initMP3: function() {
		var that = this;
		MM.love.you.MUSIC = soundManager.createSound({
			id: 'mp3',
			url: MM.constants.MAIN_MP3_URL,
			onload: function() {
				MM.love.you.preLoadImages(MM.constants.imglist, function() {
					setTimeout(function() {
						var loading = document.getElementById('loading');
						loading.style.cursor = 'pointer';
						loading.innerHTML = '点我开始';
						loading.onclick = function() {
							screenfull && screenfull.request();
							MM.love.you.loadScript();
						}
					}, 3000);
				});
			}
		});
		MM.love.you.MUSIC.load();
	},
	
	preLoadImages: function(imagesList, callback) {
		var that = this;
		var len = imagesList.length;
		var i = 0;
		var images = {};
		var callback = callback || function() {};
		function loadImage() {
			if (i == len) {
				callback();
				return false;
			}
			images[i] = new Image();
			images[i].src = imagesList[i];
			i++;
			loadImage();
		}
		loadImage();
	},
	
	/**
	 * 加载百度地图api callback：initMap
	 */
	loadScript: function() {
		var script = document.createElement("script");
		script.src = "http://api.map.baidu.com/api?v=1.5&ak=MkGETaTWpxLKUV8sAGb1Ou3e&callback=MM.love.you.initMap";
		document.body.appendChild(script);
	},
	
	/**
	 * 初始化map
	 */
	initMap: function() {
		var that = this;
		that.map = new BMap.Map("map");
		var point = new BMap.Point(MM.constants.MP_CEN.lng, MM.constants.MP_CEN.lat);
		that.map.centerAndZoom(point, 4);
		that.map.disableDragging();
		that.map.disableDoubleClickZoom();
		that.initPage();
	},
	
	/**
	 * 初始化
	 */
	initPage: function() {
		var that = this;
		document.getElementById('loading').style.display = 'none';
		document.getElementById('theEnd').style.height = '0';
		document.getElementById('theEnd').innerHTML = '';
		that.map.setMapType(BMAP_NORMAL_MAP);
		var point = new BMap.Point(MM.constants.MP_CEN.lng, MM.constants.MP_CEN.lat);
		that.map.centerAndZoom(point, 4);
		that.map.clearOverlays();
		that.map.reset();
		MM.love.you.MUSIC.play();
		that.map.panTo(new BMap.Point(MM.constants.XJ_HM.lng, MM.constants.XJ_HM.lat));
		that.panZoom_LK();
	},
	
	/**
	 * 移动地图
	 */
	zoomTo: function(zoom, time, callback, point) {
		var that = this;
		var time = time || 1000;
		var callback = callback || function() {};
		var loop = '';
		function loopZoom() {
			var curZoom = that.map.getZoom();
			if (curZoom == zoom) {
				clearTimeout(loop);
				callback();
				return false;
			}
			var plus = curZoom > zoom ? -1 : 1;
			var toZoom = curZoom + plus;
			that.map.setZoom(toZoom);
			if (point) {
				that.map.setCenter(point);
			}
			var center = that.map.getCenter();
			loop = setTimeout(loopZoom, time);
		}
		loopZoom();
	},
	
	/**
	 * 循环显示信息窗口(存在信息窗口中img高度不是设置的height的bug)
	 */
	loopWin: function(loopList, time, callback) {
		var that = this;
		var i = 0;
		var len = loopList.length;
		var callback = callback || function() {};
		var timeout = '';
		function loopWinInner() {
			if (i == len) {
				clearTimeout(timeout);
				setTimeout(callback, 1000);
				return false;
			}
			var opts = {
				title : loopList[i].title,
				enableMessage : false,
				maxWidth : 600,
				height : 0
			}
			var infoWindow = new BMap.InfoWindow(loopList[i].content, opts);
			that.map.openInfoWindow(infoWindow, new BMap.Point(loopList[i].point.lng,loopList[i].point.lat));
			infoWindow.redraw();
			i++;
			if (loopList[i]) {
				var time = loopList[i].timeout || 2000;
			} else {
				var time = 2000;
			}
			timeout = setTimeout(loopWinInner, time);
		}
		loopWinInner();
	},
	
	/**
	 * 定位到lucky的坐标
	 */
	panZoom_LK: function() {
		var that = this;
		that.map.panTo(new BMap.Point(MM.constants.SH_PDX.lng, MM.constants.SH_PDX.lat));
		setTimeout(function() {
			MM.love.you.zoomTo(18, 800, function() {
				var marker = new BMap.Marker(MM.constants.SH_PDX);
				MM.love.you.map.addOverlay(marker);
				marker.setAnimation(BMAP_ANIMATION_BOUNCE);
				setTimeout(that.panZoom_MM, 1000);
			}, MM.constants.SH_PDX);
		}, 800);
	},
	
	/**
	 * 定位到manman的坐标
	 */
	panZoom_MM: function() {
		var that = this;
		MM.love.you.zoomTo(5, 1000, function() {
			MM.love.you.map.panTo(new BMap.Point(MM.constants.XJ_HM.lng, MM.constants.XJ_HM.lat));
			setTimeout(function() {
				MM.love.you.zoomTo(13, 800, function() {
					var marker = new BMap.Marker(MM.constants.XJ_HM);
					MM.love.you.map.addOverlay(marker);
					marker.setAnimation(BMAP_ANIMATION_BOUNCE);
					setTimeout(MM.love.you.panZoom_HEY, 1000);
				}, MM.constants.XJ_HM);
			}, 800);
		});
	},
	
	/**
	 * 显示lucky→manman的路线（位置越远越慢）
	 */
	panZoom_HEY: function() {
		var that = this;
		MM.love.you.zoomTo(5, 1000, function() {
			MM.love.you.map.panTo(new BMap.Point(MM.constants.SH_XHQ.lng, MM.constants.SH_XHQ.lat));
			setTimeout(function() {
				var start = new BMap.Point(MM.constants.SH_PDX.lng, MM.constants.SH_PDX.lat);
				var end = new BMap.Point(MM.constants.XJ_HM.lng, MM.constants.XJ_HM.lat);
				//计算坐标之间的驾车路线
				var driving2 = new BMap.DrivingRoute(MM.love.you.map, {
					renderOptions : {
						map : MM.love.you.map,
						autoViewport : false
					},
					policy : BMAP_DRIVING_POLICY_LEAST_TIME,
					onSearchComplete : MM.love.you.callBackFt
				});
				driving2.search(start, end);
			}, 1000);
		});
	},
	
	/**
	 * 驾车路线callback方法(显示信息窗口)
	 */
	callBackFt: function() {
		var between = [
			{
				title: '上海 → 哈密',
				content: '3500 km.',
				point: MM.constants.SH_PDX
			},
			{
				title: '上海 → 哈密',
				content: '38 hours by train.',
				point: MM.constants.XJ_HM
			},
			{
				title: '变的是距离，不变的是坚持；',
				content: '<img src="http://manman.qiniudn.com/images%2Ftickets.jpg" width="300" height="207" alt="train" />',
				point: MM.constants.SH_PDX
			}
		];
		MM.love.you.loopWin(between, 2000, MM.love.you.showPhotos);
	},
	
	/**
	 * 在地图上显示她的图片
	 */
	showPhotos: function() {
		MM.love.you.map.clearOverlays();
		MM.love.you.map.panTo(new BMap.Point(MM.constants.SH_GZS.lng, MM.constants.SH_GZS.lat));
		setTimeout(function() {
			MM.love.you.zoomTo(13, 1000, function() {
				MM.love.you.loopWin(MM.constants.photos, 2500, MM.love.you.wannaTo);
			});
		}, 1000);
	},
	
	
	/**
	 * 显示她想去的地方
	 */
	wannaTo: function() {
		MM.love.you.map.closeInfoWindow();
		MM.love.you.zoomTo(5, 1000, function() {
			MM.love.you.map.panTo(new BMap.Point(MM.constants.CN_CEN.lng, MM.constants.CN_CEN.lat));
			MM.love.you.map.setMapType(BMAP_HYBRID_MAP);
			setTimeout(function() {
				MM.love.you.loopWin(MM.constants.wanna, 1000, MM.love.you.showMarkerText);
			}, 1000);
		});
	},
	
	/**
	 * 显示地图上标注写的生日快乐
	 */
	showMarkerText: function() {
		MM.constants.markerText.shuffle();
		MM.love.you.map.closeInfoWindow();
		MM.love.you.map.panTo(new BMap.Point(82.699584, 39.8202));
		setTimeout(function() {
			MM.love.you.zoomTo(9, 1000, function() {
				MM.love.you.loopAddMarker(MM.constants.markerText, function() {
					setTimeout(function() {
						MM.love.you.slideDown('theEnd', 1000, function() {
							var theEndText = '<iframe   frameborder=0   border=0  width=100%   height=100%   src="0827/index.html" mce_src="0827/index.html"></iframe>  ';
							document.getElementById('theEnd').innerHTML = theEndText;
						});
					}, 5000);
				});
			})
		}, 1000);
	},
	
	/**
	 * 添加标注
	 */
	loopAddMarker: function(markers, callback) {
		var that = this;
		var i = 0;
		var len = markers.length;
		var callback = callback || function() {};
		var loop = '';
		function loopAddMarkerInner() {
			if (i == len) {
				clearTimeout(loop);
				callback();
				return false;
			}
			that.addMarker(markers[i].lng, markers[i].lat);
			i++;
			loop = setTimeout(loopAddMarkerInner, 300);
		}
		loopAddMarkerInner();
	},
	
	/**
	 * 闭幕
	 */
	slideDown: function(id, speed, callback) {
		var object  = document.getElementById(id);
		var timeout = speed*0.001;
		var callback= callback || function() {};
		var loop    = '';
		object.style.display = 'block';
		object.style.height = '0%';
		function slideDownInner() {
			var curHeight = parseFloat(object.style.height) || 0;
			if( curHeight >= 100 ) {
				clearTimeout(loop);
				callback();
				return false;
			}
			object.style.height = (curHeight + 0.1) + '%';
			loop = setTimeout(slideDownInner, timeout);
		}
		slideDownInner();
	},
	
	/**
	 * 添加标记
	 */
	addMarker: function(lng, lat) {
		var marker = new BMap.Marker( new BMap.Point(lng, lat) );
		marker.setAnimation(BMAP_ANIMATION_DROP);
		MM.love.you.map.addOverlay(marker)
	}
};


if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
		for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
		return this;
	};
}
