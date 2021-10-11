var app = {
	//initial variables
	canvas  : null,
	context : null,

	//resizing
	width   : 800,
	height  : 400,

	//nodes
	nodes   : [],

	//texts
	renderTexts: [],

	//timing
	timestamp  : 0,
	now        : 0,
	lastUpdate : 0,
	pauseBool  : true,

	resizeChange : function(){
		var XRatio = window.innerWidth/this.width;
		var YRatio = window.innerHeight/this.height;
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		for(var index in this.nodes){
			var node = this.nodes[index];
			node.x *= XRatio;
			node.width*=XRatio;
			node.y *= YRatio;
			node.height*=YRatio;
		}
	},
	init : function(){
		this.canvas  = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');


		this.render();
		this.onInit();
	},
	render : function(){
		this.clear();
		this.update();

		window.requestAnimationFrame(this.render.bind(this));
	},
	clear  : function(){
		this.context.clearRect(0, 0, this.width, this.height);
	},
	update : function(){
	    var dt = Date.now() - this.lastUpdate;

		if(this.pauseBool)dt = 0;

		this.onUpdate(dt);

		for(var index in this.nodes){
			var node = this.nodes[index];

			if (node.id == 'ball') {
				this.context.beginPath();
				this.context.fillStyle = node.color;
				this.context.arc(node.x+node.width/2,node.y+node.height/2,node.width/2,0,Math.PI*2,false);
				this.context.fill();
			}
			else {
				this.context.fillStyle = node.color;
				this.context.fillRect(node.x, node.y, node.width, node.height);
			}
		}
		for(var index in this.renderTexts){
			var renderText = this.renderTexts[index];
			this.context.font = renderText.font;
			this.context.fillStyle = renderText.color;
			this.context.fillText(renderText.textString,renderText.x,renderText.y);
		}

		this.lastUpdate = Date.now();
		this.timestamp+=dt;
	},
	getNode : function(id){
		for(var index in this.nodes){
			var node = this.nodes[index];

			if(node.id == id){
				return node;
			}
		}

		return { x : null, y : null, width : null, height : null };
	},
	getRenderText : function(id){
		for(var index in this.renderTexts){
			var renderText = this.renderTexts[index];

			if(renderText.id == id){
				return renderText;
			}
		}

		return { x : null, y : null, width : null, height : null };
	},

	//events
	onInit   : function(){},
	onUpdate : function(){},
	reset    : function(){},
	pause    : function(){
		this.pauseBool = !this.pauseBool;
	},
};
window.onresize = function(){
	app.resizeChange();
}
window.onload = function(){
	app.init();
};