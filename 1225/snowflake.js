var Snowflake = function(){
	this.initialize.apply(this,arguments);
}
// 初始化静态属性
Snowflake.staticPropertySet = function(){
	//唯一ID
	Snowflake.sid = 0; 
	// 飘动的范围
	Snowflake.maxWidth = document.documentElement.clientWidth;
	Snowflake.maxHeight = Math.max( document.documentElement.offsetHeight,document.documentElement.clientHeight);
	Snowflake.minWidth = 0;
	Snowflake.minHeight = 0;
	//雪花最大和最小的font-size
	Snowflake.maxSize = 35; 
	Snowflake.minSize = 6; 
	// 雪花颜色
	Snowflake.color = '#fff';
	// 雪花飘落速度
	Snowflake.maxSpeed = 1; // 像素
	Snowflake.minSpeed = 4; 
	
	//雪花旋转的ClassName 
	Snowflake.rotateClass = 'rotate';
	
	//随机数
	Snowflake.rand = function(min,max){
		return Math.round((max - min) * Math.random()) + min;
	}
	
	//设置样式
	Snowflake.setStyle = function(obj,style){
		for(var i in style){
			obj.style[i] = style[i];	
		}
	}
};
//初始化
Snowflake.staticPropertySet();


Snowflake.prototype = {
	
	initialize : function(){
		// 唯一表示
		this.sid = Snowflake.sid++;
		// 大小
		this.size = Snowflake.rand(Snowflake.minSize,Snowflake.maxSize);
		// 透明度
		this.opacity = this.setOpacity();
		// 初始位置
		this.left = Snowflake.rand(Snowflake.minWidth,Snowflake.maxWidth-this.size-20);
		this.top = 0;
		
		// 雪花是否已旋转
		this.isRotate = false;
		
		//左右飘的方向
		this.dir = Snowflake.rand(-1,1);

		// 速度
		this.speed = Snowflake.rand(Snowflake.minSpeed,Snowflake.maxSpeed);
		
		// 雪花DOM元素
		this.snow = this.createSnow();  
		
		// 雪花飘落
		this.wave();
		
		//雪花旋转
		this.rotate();
		
		
	},
	
	setOpacity : function(){
		//雪花远近关系和透明的比
		// 雪花越近，越明显
		// size 35 => opacity 1;
		// size 12 = > opacity 0.3
		var pecent = (this.size - Snowflake.minSize) /(Snowflake.maxSize - Snowflake.minSize);
		var opc = ((0.9 - 0.1)*pecent + 0.1).toFixed(2);
		return opc;
	},
	
	// 制造雪花
	createSnow : function(){
		var sn = document.createElement('i');
		sn.innerHTML = '❅';
		sn.className = 'snow';
		var style = {
			display : 'block',
			position : 'fixed',
			left : this.left + 'px',
			top : this.top + 'px',
			fontSize : this.size + 'px',
			opacity : this.opacity,
			color : Snowflake.color,
			filter : 'alpha(opacity='+this.opacity*100+')',
			zIndex : 9999
		}
		Snowflake.setStyle(sn,style);
		
		document.body.appendChild(sn);
		return sn;
	},
	
	// 雪花飘动
	wave : function(){
		var _this = this;
		// 从上往下飘
		var timer = window.setInterval(function(){
			_this.top += _this.speed;
			_this.opacity -= 0.01 * Math.random();
			if(_this.left < Snowflake.maxWidth - _this.size -60 && _this.left > 0){
				_this.left += _this.dir;
			}
			
			var style = {
				left : 	_this.left + 'px',
				top :  _this.top + 'px',
				opacity : _this.opacity,
				filter : 'alpha(opacity='+_this.opacity*100+')'
			}
			Snowflake.setStyle(_this.snow,style);
			
			// 雪飘落到地面上 或者融化不见
			if(_this.top > Snowflake.maxHeight - _this.size-50 || _this.opacity <=0){
				//clearInterval(timer);
				// 出了画面 销毁
				//_this.destroy();	
				// 重新开始
				_this.top = 0;
				_this.left = Snowflake.rand(Snowflake.minWidth,Snowflake.maxWidth-this.size-20);

				//左右飘的方向
				_this.dir = Snowflake.rand(-1,1);				
				// 大小
				_this.size = Snowflake.rand(Snowflake.minSize,Snowflake.maxSize);
				_this.opacity = 1;
				
				// 速度
				_this.speed = Snowflake.rand(Snowflake.minSpeed,Snowflake.maxSpeed);
			}
		},24);
		//左右飘落
	},
	// 雪花旋转
	rotate : function(){
		//Snowflake.rotateClass
		var _this = this;
		
		var rTimer = setInterval(function(){
			if(!_this.snow){
				clearInterval(rTimer);	
			}else{
				if(!_this.isRotate)	{
					_this.snow.className = _this.snow.className + ' ' + Snowflake.rotateClass;
				}else{
					_this.snow.className = _this.snow.className.replace(Snowflake.rotateClass,'');		
				}
				_this.isRotate = !_this.isRotate;
			}
		},Snowflake.rand(100,1300));
	},
	
	// 销毁雪花
	destroy : function(){
		this.snow.parentNode.removeChild(this.snow);
		this.snow = null;
	}
		
}
// 雪花生成 
/*
	@duration	雪花持续时间
	@number		每次生成的数量
*/
var snowflake = function(duration,number,count){
	var t = window.setInterval(function(){
		if(--count){
			for(var i=0; i<number; i++){
				new Snowflake();
			}
		}else{
			clearInterval(t);
		}
		
	},duration);
}



