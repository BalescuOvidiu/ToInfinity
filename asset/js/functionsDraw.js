//Display variables
calculator.width=screen.availWidth;
calculator.height=screen.height;
calculator.scale=50;
calculator.unit=calculator.width/22;
calculator.size=1;
calculator.i=calculator.width;
calculator.view=calculator.unit*Math.floor(screen.height/calculator.unit-1);
//Plots variable
var plotsSize=0;
calculator.x=0;
calculator.y=0;
//Functions variable
calculator.selected=0;
calculator.max=2;
calculator.q=1;
calculator.parameters="xyztabcd";
var functions=new Array;
//GUI functions
calculator.begin=function(){
	calculator.x=calculator.y=0;
	calculator.scale=50;
	calculator.size=1;
}
calculator.print_functions=function(){
	reload_menu(3);
	calculator.selected=0;
	calculator.q=1;
	calculator.begin();
	$("title").text("To Infinity - Funcții");
	$(".menu").hide();
	$("#main").html("<table style='display:none;' class='interface'><tbody><tr><td id='left-up'><img src='img/functionsDraw/left-up.png'/></td>"
		+"<td id='up' colspan='10'><img src='img/functionsDraw/up.png'/></td><td id='right-up'><img src='img/functionsDraw/right-up.png'/></td></tr>"
		//Middle
		+"<tr><td id='left'><img src='img/functionsDraw/left.png'/></td><th colspan='10'><div id='coord'>x=0, y=0</div>"
		+"</th><td id='right'><img src='img/functionsDraw/right.png'/></td></tr>"
		//Down
		+"<tr><td id='left-down'><img src='img/functionsDraw/left-down.png'/></td><td id='down' colspan='10'>"
		+"<img src='img/functionsDraw/down.png'/></td>"
		+"<td id='right-down'><img src='img/functionsDraw/right-down.png'/></td></tr></tbody></table>"
		+"</ul></div></th></tr>"
		+"</tbody></table>"
		//First menu
		+"<div class='interface'>"
			+"<button id='1'>sin</button><button id='2'>cos</button><button id='3'>tan</button><button id='4'>cot</button></br>"
			+"<button id='5'>asin</button><button id='6'>acos</button><button id='7'>atan</button><button id='8'>acot</button></br>"
			+"<button id='9'>sinh</button><button id='10'>cosh</button><button id='11'>tanh</button><button id='12'>coth</button></br>"
			+"<button id='13'>asinh</button><button id='14'>cosh</button><button id='15'>atanh</button><button id='16'>acoth</button></br>"
			+"<button id='17'>sec</button><button id='18'>csc</button><button id='19'>asec</button><button id='20'>acsc</button></br>"
		+"</div>"
		//Second menu
		+"<div class='interface'>"
			+"<button id='21'>sech</button><button id='22'>csch</button><button id='23'>asech</button><button id='24'>acsch</button></br>"
			+"<button id='25'>&deg;</button><button id='69'>|x|</button><button id='31'>(</button><button id='32'>)</button></br>"
			+"<button id='29'>[x]</button><button id='26'>!x</button><button id='27'>A</button><button id='28'>C</button></br>"
			+"<button id='33'><sup>k</sup>&radic;x</button><button id='34'>x<sup>k</sup></button><button id='35'>log<sub>x</sub>k</button><button id='36'>ln x</button></br>"
			+"<button id='37'>&gamma;</button><button id='38'>i</button><button id='39'>&pi;</button><button id='40'>e</button></br>"
		+"</div>"
		//Third menu
		+"<div class='interface'>"
			+"<button id='41'>CE</button><button id='42'><</button><button id='43'>MOD</button><button id='44'>&divide;</button></br>"
			+"<button id='45'>7</button><button id='46'>8</button><button id='47'>9</button><button id='48'>&bull;</button></br>"
			+"<button id='49'>4</button><button id='50'>5</button><button id='51'>6</button><button id='52'>-</button></br>"
			+"<button id='53'>1</button><button id='54'>2</button><button id='55'>3</button><button id='56'>+</button></br>"
			+"<button id='57'>0</button><button id='58'>00</button><button id='59'>.</button><button id='68'>x</button></br>"
		+"</div>"
		//Main menu
		+"<div class='interface'>"
			+"<button id='zoom_out'>(-)</button>"
			+"<button id='zoom_in'>(+)</button>"
			+"<button id='initial' colspan='3'>Poziţia iniţială</button>"
			+"<button id='add'>Adăugă funcţie</button>"
			+"<button id='draw'>Trasare grafic</button>"
		+"</div>"
		//Functions
		+"<section id='functions'>"
				+"<section id='function0'>"
					+"<div><button class='remove'>X</button></div><div><input class='color' value='#016684' type='color'/></div>"
					+"<div>f<sub>1</sub>:<mark>R<sup id='domain' contenteditable='true'></sup></mark>-> "
					+"<mark>R<sup id='codomain' contenteditable='true'></sup></mark>, f<sub>1</sub>(<mark id='parameters'>x</mark>)=</div>"
					+"<div id='line0' contenteditable='true'>x</div>"
				+"</section>"
		+"</section>"
		//Plot
		+"<section id='plots'>"
		+"</section>");
}
//Plots functions
calculator.add_plot=function(id){
	$("#plots").html($("#plots").html()+"<section class='plot' width='"+calculator.width+"px' height='"+calculator.height+"px'>"
		+"<canvas id='"+id+"' width='"+calculator.width+"px' height='"+calculator.height+"px'></canvas>"
		//Up
		+"<img id='up-left' style='height:"+calculator.unit+"px;' src='img/functionsDraw/up-left.png'/>"
		+"<img id='up' style='height:"+calculator.unit+"px;' src='img/functionsDraw/up.png'/>"
		+"<img id='up-right' style='height:"+calculator.unit+"px;' src='img/functionsDraw/up-right.png'/>"
		//Sides
		+"<img id='left' style='height:"+(calculator.height-2*calculator.unit)+"px; margin-top:"+calculator.unit+"px;' src='img/functionsDraw/left.png'/>"
		+"<img id='right' style='height:"+(calculator.height-2*calculator.unit)+"px; margin-top:"+calculator.unit+"px;' src='img/functionsDraw/right.png'/>"
		//Down
		+"<img id='down-left' style='height:"+calculator.unit+"px; margin-top:"+(calculator.height-calculator.unit)+"px;' src='img/functionsDraw/down-left.png'/>"
		+"<img id='down' style='height:"+calculator.unit+"px; margin-top:"+(calculator.height-calculator.unit)+"px;' src='img/functionsDraw/down.png'/>"
		+"<img id='down-right' style='height:"+calculator.unit+"px; margin-top:"+(calculator.height-calculator.unit)+"px;' src='img/functionsDraw/down-right.png'/>"
	+"</section>");
}
//Axis functions
calculator.gride2d=function(x,y){
	var id="#"+x+y;
	//The axis
	$(id).drawLine({
		fromCenter:false,
		strokeStyle:"#000",
		strokeWidth:1,
		arrowRadius:12,
		startArrow:true,
		endArrow:true,
		x1:0,y1:calculator.height/2,
		x2:calculator.width,y2:calculator.height/2
	});
	$(id).drawLine({
		fromCenter:false,
		strokeStyle:"#000",
		strokeWidth:1,
		arrowRadius:12,
		startArrow:true,
		endArrow:true,
		x1:calculator.width/2,y1:0,
		x2:calculator.width/2,y2:calculator.height
	});
	//Text
	$(id).drawText({
		fromCenter:false,
		fillStyle:"#000",
		x:calculator.width/2-20,y:15,
		fontSize:16,
		fontFamily:"Verdana",
		fontStyle:"bold",
		text:y
	});
	$(id).drawText({
		fromCenter:false,
		fillStyle:"#000",
		x:calculator.width-25,y:calculator.height/2-25,
		fontSize:16,
		fontFamily:"Verdana",
		fontStyle:"bold",
	  	text:x
	});
	//Horizontal
	for(var i=1;i*calculator.unit<calculator.height/2;i++){
		//Positive
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:0,y1:calculator.height/2-i*calculator.unit,
			x2:calculator.width,y2:calculator.height/2-i*calculator.unit
		});
		//Positive text
		$(id).drawText({
			fromCenter:false,
			fillStyle:"#000",
			x:calculator.width/2+8,y:calculator.height/2-i*calculator.unit+5,
			fontSize:10,
			fontFamily:"Verdana",
			text:Math.round(Math.round(i-calculator.y/calculator.unit)/calculator.scale*50*calculator.size)/calculator.size
		});
		//Negative
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:0,y1:i*calculator.unit+calculator.height/2,
			x2:calculator.width,y2:i*calculator.unit+calculator.height/2
		});
		//Negative text
		$(id).drawText({
			fromCenter:false,
			fillStyle:"#000",
			x:calculator.width/2+8,y:calculator.height/2+i*calculator.unit+5,
			fontSize:10,
			fontFamily:"Verdana",
			text:Math.round(Math.round(i+calculator.y/calculator.unit)/calculator.scale*50*calculator.size)/(-calculator.size)
		});
	}
	//Vertical
	for(var i=1;i<=21;i++){
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:i*calculator.unit,y1:0,
			x2:i*calculator.unit,y2:calculator.height
		});
		//Text
		if((i+1)%calculator.precision==0)
			$(id).drawText({
				fromCenter:false,
				fillStyle:"#000",
				x:i*calculator.unit+8,y:calculator.height/2+5,
				fontSize:10,
				fontFamily:"Verdana",
				text:Math.round((i-calculator.width/2/calculator.unit+calculator.x/calculator.unit)/calculator.scale*50*calculator.size)/calculator.size
			});
	}
}
calculator.gride3d=function(x,y,z){
	var id="#"+x+y+z;
	//The axis
	$(id).drawLine({
		fromCenter:false,
		strokeStyle:"#000",
		strokeWidth:1,
		arrowRadius:12,
		startArrow:true,
		endArrow:true,
		x1:0,y1:calculator.height/2+calculator.width/4,
		x2:calculator.width,y2:calculator.height/2-calculator.width/4
	});
	$(id).drawLine({
		fromCenter:false,
		strokeStyle:"#000",
		strokeWidth:1,
		arrowRadius:12,
		startArrow:true,
		endArrow:true,
		x1:calculator.width/2,y1:0,
		x2:calculator.width/2,y2:calculator.height
	});
	$(id).drawLine({
		fromCenter:false,
		strokeStyle:"#000",
		strokeWidth:1,
		arrowRadius:12,
		startArrow:true,
		endArrow:true,
		x1:0,y1:calculator.height/2-calculator.width/4,
		x2:calculator.width,y2:calculator.height/2+calculator.width/4
	});
	//Text
	$(id).drawText({
		fromCenter:false,
		fillStyle:"#000",
		x:calculator.width-16,y:calculator.height/2-calculator.width/4-32,
		fontSize:16,
		fontFamily:"Verdana",
		fontStyle:"bold",
	  	text:x
	});
	$(id).drawText({
		fromCenter:false,
		fillStyle:"#000",
		x:calculator.width/2-20,y:15,
		fontSize:16,
		fontFamily:"Verdana",
		fontStyle:"bold",
		text:y
	});
	$(id).drawText({
		fromCenter:false,
		fillStyle:"#000",
		x:calculator.width-16,y:calculator.height/2+calculator.width/4-32,
		fontSize:16,
		fontFamily:"Verdana",
		fontStyle:"bold",
		text:z
	});
	//Horizontal
	for(var i=1;i*calculator.unit<calculator.height;i++){
		//Positive x
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:0,y1:calculator.height/2+calculator.width/4-i*calculator.unit,
			x2:calculator.width,y2:calculator.height/2-calculator.width/4-i*calculator.unit
		});
		//Negative x
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:0,y1:calculator.height/2+calculator.width/4+i*calculator.unit,
			x2:calculator.width,y2:calculator.height/2-calculator.width/4+i*calculator.unit
		});
		//Positive z
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:0,y1:calculator.height/2-calculator.width/4-i*calculator.unit,
			x2:calculator.width,y2:calculator.height/2+calculator.width/4-i*calculator.unit
		});
		//Negative z
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:0,y1:calculator.height/2-calculator.width/4+i*calculator.unit,
			x2:calculator.width,y2:calculator.height/2+calculator.width/4+i*calculator.unit
		});
		//Positive text
		$(id).drawText({
			fromCenter:false,
			fillStyle:"#000",
			x:calculator.width/2+8,y:calculator.height/2-i*calculator.unit-18,
			fontSize:10,
			fontFamily:"Verdana",
			text:Math.round(Math.round(i-calculator.y/calculator.unit)/calculator.scale*50*calculator.size)/calculator.size
		});
		//Negative text
		$(id).drawText({
			fromCenter:false,
			fillStyle:"#000",
			x:calculator.width/2+8,y:calculator.height/2+i*calculator.unit+12,
			fontSize:10,
			fontFamily:"Verdana",
			text:Math.round(Math.round(i+calculator.y/calculator.unit)/calculator.scale*50*calculator.size)/(-calculator.size)
		});
	}
	//y
	for(var i=1;i<=21;i++){
		$(id).drawLine({
			fromCenter:false,
			strokeStyle:"#AAA",
			strokeWidth:1,
			x1:i*calculator.unit,y1:0,
			x2:i*calculator.unit,y2:calculator.height
		});
		//Text
		if((i+1)%calculator.precision==0){
			//x
			$(id).drawText({
				fromCenter:false,
				fillStyle:"#000",
				x:i*calculator.unit+8,y:calculator.unit+i*calculator.unit/2+8,
				fontSize:10,
				fontFamily:"Verdana",
				text:Math.round((i-calculator.width/2/calculator.unit+calculator.x/calculator.unit)/calculator.scale*50*calculator.size)/calculator.size
			});
			//z
			$(id).drawText({
				fromCenter:false,
				fillStyle:"#000",
				x:i*calculator.unit+8,y:calculator.height-2*calculator.unit-i*calculator.unit/2+8,
				fontSize:10,
				fontFamily:"Verdana",
				text:Math.round((i-calculator.width/2/calculator.unit+calculator.x/calculator.unit)/calculator.scale*50*calculator.size)/calculator.size
			});
		}
	}
}
//Draw functions
calculator.draw=function(){
	//Plots
	$("#plots").html("");
	//Axis precision by zoom
	if(Math.abs(Math.log10(calculator.size))<7&&calculator.scale>7.450580596923828e-7)
		calculator.precision=1;
	else if(Math.abs(Math.log10(calculator.size))<12&&calculator.scale>7.450580596923828e-12)
		calculator.precision=2;
	else
		calculator.precision=3;
	//Get functions
	calculator.max=2;
	var bidimensional=0;
	functions=[];
	for(var i=0;i<calculator.q;i++){
		functions.push({
			value:calculator.convert($("#line"+i).html()),
			domain:get_size("#function"+i+" #domain"),
			codomain:get_size("#function"+i+" #codomain")
		});
		if(calculator.max<functions[i].domain+functions[i].codomain)
			calculator.max=functions[i].domain+functions[i].codomain;
		else if(2==functions[i].domain+functions[i].codomain)
			bidimensional=1;
	}
	//Get plots
	if(bidimensional){
		calculator.add_plot("xy");
	}
	if(calculator.max>2){
		for(var i=0;i<calculator.max;i++)
			for(var j=i+1;j<calculator.max;j++)
				for(var k=j+1;k<calculator.max;k++){
					calculator.add_plot(calculator.parameters[i]+calculator.parameters[j]+calculator.parameters[k]);
				}
	}
	//Axis and grides
	if(bidimensional){
		calculator.gride2d("x","y");
	}
	if(calculator.max>2){
		for(var i=0;i<calculator.max;i++)
			for(var j=i+1;j<calculator.max;j++)
				for(var k=j+1;k<calculator.max;k++){
					calculator.gride3d(calculator.parameters[i],calculator.parameters[j],calculator.parameters[k]);
				}
	}
	//Begin queue
	calculator.i=0;
	//Draw functions
	calculator.queue=setInterval(function(){
		if(calculator.i<=calculator.width/2){
			//Each function
			for(var j=0;j<functions.length;j++){
				//2D
				if(functions[j].domain+functions[j].codomain==2){
					//To right
					$("#xy").drawLine({
						fromCenter:false,
						strokeStyle:$("#function"+j+" .color").val(),
						strokeWidth:2,
						rounded:true,
						//f(x)
						x1:calculator.width/2+calculator.i,
						y1:calculator.get_height(functions[j].value,calculator.x+calculator.i),
						//f(x+1)
						x2:calculator.width/2+calculator.i+1,
						y2:calculator.get_height(functions[j].value,calculator.x+calculator.i+1)
					});
					//To left
					$("#xy").drawLine({
						fromCenter:false,
						strokeStyle:$("#function"+j+" .color").val(),
						strokeWidth:2,
						rounded:true,
						//f(-x)
						x1:calculator.width/2-calculator.i,
						y1:calculator.get_height(functions[j].value,calculator.x-calculator.i),
						//f(-x-1)
						x2:calculator.width/2-calculator.i-1,
						y2:calculator.get_height(functions[j].value,calculator.x-calculator.i-1)
					});
				//3D plane
				}else if(functions[j].domain>1){
					for(var first=0;first<functions[j].domain;first++){
						for(var second=first+1;second<functions[j].domain;second++){
							//Parameters
							var value=functions[j].value;
							for(var i=0;i<functions[j].domain;i++){
								if(i!=first&&i!=second){
									value=value.split(calculator.parameters[i]).join("(0)");
								}
							}
							value=value.split(",");
							//Get plots
							for(var f=0;f<functions[j].codomain;f++){
								var id="#"+calculator.parameters[first]+calculator.parameters[second]+calculator.parameters[f+functions[j].domain];
								var x1,x2,x3,x4;
								var y1,y2,y3,y4;
								for(var y=0;y<=calculator.height/2;y+=calculator.unit){
									//To right
									z1=calculator.get_third(value[f],calculator.x+calculator.i,-y,calculator.parameters[first],calculator.parameters[second]);
									z2=calculator.get_third(value[f],calculator.x+calculator.i+1,-y,calculator.parameters[first],calculator.parameters[second]);
									$(id).drawLine({
										fromCenter:false,
										strokeStyle:hex_to_rgba($("#function"+j+" .color").val(),1-3*calculator.i/calculator.width),
										strokeWidth:2,
										rounded:true,
										//f(x)
										x1:calculator.width/2+calculator.i+z1-calculator.x,
										y1:y+calculator.height/2-calculator.i/2+z1/2,
										//f(x+1)
										x2:calculator.width/2+calculator.i+1+z2-calculator.x,
										y2:y+calculator.height/2-calculator.i/2-0.5+z2/2
									});
									if(calculator.i%10==0&&y){
										$(id).drawLine({
											fromCenter:false,
											strokeStyle:hex_to_rgba($("#function"+j+" .color").val(),1-3*calculator.i/calculator.width),
											strokeWidth:2,
											rounded:true,
											//f(x)
											x1:calculator.width/2+calculator.i-calculator.x+z1,
											y1:y+calculator.height/2-calculator.i/2+z1/2,
											//f(x+1)
											x2:x2,
											y2:y2
										});
									}else{
										x1=calculator.width/2+calculator.i-calculator.x+z1;
										y1=-y+calculator.height/2-calculator.i/2+z1/2;										
									}
									z1=calculator.get_third(value[f],calculator.x+calculator.i,y,calculator.parameters[first],calculator.parameters[second]);
									z2=calculator.get_third(value[f],calculator.x+calculator.i+1,y,calculator.parameters[first],calculator.parameters[second]);
									$(id).drawLine({
										fromCenter:false,
										strokeStyle:hex_to_rgba($("#function"+j+" .color").val(),1-3*calculator.i/calculator.width),
										strokeWidth:2,
										rounded:true,
										//f(x)
										x1:calculator.width/2+calculator.i+z1-calculator.x,
										y1:-y+calculator.height/2-calculator.i/2+z1/2,
										//f(x+1)
										x2:calculator.width/2+calculator.i+1+z2-calculator.x,
										y2:-y+calculator.height/2-calculator.i/2-0.5+z2/2
									});
									//Vertical
									if(calculator.i%10==0&&y){
										$(id).drawLine({
											fromCenter:false,
											strokeStyle:hex_to_rgba($("#function"+j+" .color").val(),1-3*calculator.i/calculator.width),
											strokeWidth:2,
											rounded:true,
											//f(x)
											x1:calculator.width/2+calculator.i-calculator.x+z1,
											y1:-y+calculator.height/2-calculator.i/2+z1/2,
											//f(x+1)
											x2:x1,
											y2:y1
										});
									}else{
										x2=calculator.width/2+calculator.i-calculator.x+z1;
										y2=y+calculator.height/2-calculator.i/2+z1/2;
									}
									//To left
									var z1=calculator.get_third(value[f],calculator.x-calculator.i,-y,calculator.parameters[first],calculator.parameters[second]);
									var z2=calculator.get_third(value[f],calculator.x-calculator.i-1,-y,calculator.parameters[first],calculator.parameters[second]);
									$(id).drawLine({
										fromCenter:false,
										strokeStyle:$("#function"+j+" .color").val(),
										strokeWidth:2,
										rounded:true,
										//f(x)
										x1:calculator.width/2-calculator.i-calculator.x+z1,
										y1:y+calculator.height/2+calculator.i/2+z1/2,
										//f(x+1)
										x2:calculator.width/2-calculator.i-calculator.x+1+z2,
										y2:y+calculator.height/2+calculator.i/2+0.5+z2/2
									});
									if(calculator.i%10==0&&y){
										$(id).drawLine({
											fromCenter:false,
											strokeStyle:$("#function"+j+" .color").val(),
											strokeWidth:2,
											rounded:true,
											//f(x)
											x1:calculator.width/2-calculator.i-calculator.x+z1,
											y1:y+calculator.height/2+calculator.i/2+z1/2,
											//f(x+1)
											x2:x3,
											y2:y3
										});
									}else{
										x3=calculator.width/2-calculator.i-calculator.x+z1;
										y3=-y+calculator.height/2+calculator.i/2+z1/2;										
									}
									var z1=calculator.get_third(value[f],calculator.x-calculator.i,y,calculator.parameters[first],calculator.parameters[second]);
									var z2=calculator.get_third(value[f],calculator.x-calculator.i-1,y,calculator.parameters[first],calculator.parameters[second]);
									$(id).drawLine({
										fromCenter:false,
										strokeStyle:$("#function"+j+" .color").val(),
										strokeWidth:2,
										rounded:true,
										//f(x)
										x1:calculator.width/2-calculator.i-calculator.x+z1,
										y1:-y+calculator.height/2+calculator.i/2+z1/2,
										//f(x+1)
										x2:calculator.width/2-calculator.i-calculator.x+1+z2,
										y2:-y+calculator.height/2+calculator.i/2+0.5+z2/2
									});
									//Vertical
									if(calculator.i%10==0&&y){
										$(id).drawLine({
											fromCenter:false,
											strokeStyle:$("#function"+j+" .color").val(),
											strokeWidth:2,
											rounded:true,
											//f(x)
											x1:calculator.width/2-calculator.i-calculator.x+z1,
											y1:-y+calculator.height/2+calculator.i/2+z1/2,
											//f(x+1)
											x2:x4,
											y2:y4
										});
									}else{
										x4=calculator.width/2-calculator.i-calculator.x+z1;
										y4=y+calculator.height/2+calculator.i/2+z1/2;
									}
								}
							}
						}
					}
				//3D line
				}else{
					var value=functions[j].value.split(",");
					for(var first=0;first<functions[j].codomain;first++){
						for(var second=first+1;second<functions[j].codomain;second++){
							var id="#x"+calculator.parameters[first+1]+calculator.parameters[second+1];
							//To right
							var y1=calculator.get_height(value[first],calculator.x+calculator.i);
							var y2=calculator.get_height(value[first],calculator.x+calculator.i+1);
							var z1=calculator.get_vector(value[second],calculator.x+calculator.i);
							var z2=calculator.get_vector(value[second],calculator.x+calculator.i+1);
							$(id).drawLine({
								fromCenter:false,
								strokeStyle:hex_to_rgba($("#function"+j+" .color").val(),1-calculator.i/calculator.width),
								strokeWidth:2,
								rounded:true,
								//f(x)
								x1:calculator.width/2+calculator.i+z1,
								y1:-calculator.i/2+y1+2*calculator.y+z1/2,
								//f(x+1)
								x2:calculator.width/2+calculator.i+1+z2,
								y2:-calculator.i/2-0.5+y2+2*calculator.y+z2/2
							});
							//To left
							var y1=calculator.get_height(value[first],calculator.x-calculator.i);
							var y2=calculator.get_height(value[first],calculator.x-calculator.i+1);
							var z1=calculator.get_vector(value[second],calculator.x-calculator.i);
							var z2=calculator.get_vector(value[second],calculator.x-calculator.i+1);
							$(id).drawLine({
								fromCenter:false,
								strokeStyle:hex_to_rgba($("#function"+j+" .color").val(),1-calculator.i/calculator.width),
								strokeWidth:2,
								rounded:true,
								//f(x)
								x1:calculator.width/2-calculator.i+z1,
								y1:calculator.i/2+y1+2*calculator.y+z1/2,
								//f(x+1)
								x2:calculator.width/2-calculator.i+1+z2,
								y2:calculator.i/2-0.5+y2+2*calculator.y+z2/2
							});
						}
					}
				}
			}
			calculator.i++;
		}
		else
			clearInterval(calculator.queue);
	},0.1);	
}
calculator.get_height=function(value,x){
	return calculator.height/2-math.eval(value.replace(/x/g,"("+(x/calculator.unit*50/calculator.scale)+")"))*calculator.unit/50*calculator.scale-calculator.y;
}
calculator.get_vector=function(value,x){
	return math.eval(value.replace(/x/g,"("+(x/calculator.unit*50/calculator.scale)+")"))*calculator.unit/50*calculator.scale;
}
calculator.get_third=function(value,x,y,name_x,name_y){
	value=value.split(name_x).join("("+(x/calculator.unit*50/calculator.scale)+")");
	value=value.split(name_y).join("("+(y/calculator.unit*50/calculator.scale)+")");
	return math.eval(value)*calculator.unit/50*calculator.scale;
}
//Queries
$(document).ready(function(){
	//Screen resize
	setInterval(calculator.scale,100);
	//Add function
	$("main").on("click",".interface #add",function(){
		//Save colors
		var color=[calculator.q];
		for(var i=0;i<calculator.q;i++)
			color[i]=$("#function"+i+" .color").val();
		//HTML
		$("#functions").html($("#functions").html()+"<section id='function"+calculator.q+"'>"
				+"<div><button class='remove'>X</button></div><div><input class='color' value='#016684' type='color'/></div>"
				+"<div>f<sub>"+(calculator.q+1)+"</sub>:<mark>R<sup id='domain' contenteditable='true'></sup></mark>->"
				+"<mark>R<sup id='codomain' contenteditable='true'></sup></mark>, f<sub>"+(calculator.q+1)+"</sub>(x)=</div>"
				+"<div id='line"+(calculator.q++)+"' contenteditable='true'>x</div>"
			+"</section>");
		//Load colors
		for(var i=0;i<calculator.q-1;i++)
			$("#function"+i+" .color").val(color[i]);
	});
	//Remove function
	$("main").on("click","#functions .remove",function(){
		if(calculator.q>1){
			//Id
			var id=Number($(this).parent().parent().attr("id").replace("function",""));
			$(this).parent().parent().remove();
			//Next functions
			for(var i=id+1;i<calculator.q;i++){
				//Data
				$("#function"+i+" #line"+i).attr("id","line"+(i-1));
				$("#function"+i).attr("id","function"+(i-1));
				//Marks
				$("#function"+(i-1)).html($("#function"+(i-1)).html().replace("<sub>"+(i+1),"<sub>"+i));
				$("#function"+(i-1)).html($("#function"+(i-1)).html().replace("<sub>"+(i+1),"<sub>"+i));
			}
			calculator.q--;
		}
	});
	//Select function
	$("main").on("click","#functions div",function(){
		calculator.selected=$(this).parent().attr("id").replace("function","");
	});
	//Initial
	$("main").on("click",".interface #initial",function(){
		calculator.begin();
		calculator.draw();
	});
	//Zoom
	$("main").on("click",".interface #zoom_in",function(){
		if(calculator.scale>25)
			calculator.size*=10;
		calculator.scale*=2;
		calculator.draw();
	});
	$("main").on("click",".interface #zoom_out",function(){
		if(calculator.scale>1.0842021724855044e-17){
			calculator.scale/=2;
			if(calculator.size>1)
				calculator.size/=10;
			calculator.draw();
		}
	});
	//Draw
	$("main").on("click",".interface #draw",function(){
		calculator.draw();
	});
	//Move up
	$("main").on("click","#up-left",function(){
		calculator.x-=calculator.width/2;
		calculator.y-=calculator.view/4;
		calculator.draw();
	});
	$("main").on("click","#up",function(){
		calculator.y-=calculator.view/4;
		calculator.draw();
	});
	$("main").on("click","#up-right",function(){
		calculator.x+=calculator.width/2;
		calculator.y-=calculator.view/4;
		calculator.draw();
	});
	//Move sides
	$("main").on("click","#left",function(){
		calculator.x-=calculator.width/2;
		calculator.draw();
	});
	$("main").on("click","#right",function(){
		calculator.x+=calculator.width/2;
		calculator.draw();
	});
	//Move down
	$("main").on("click","#down-left",function(){
		calculator.x-=calculator.width/2;
		calculator.y+=calculator.view/4;
		calculator.draw();
	});
	$("main").on("click","#down",function(){
		calculator.y+=calculator.view/4;
		calculator.draw();
	});
	$("main").on("click","#down-right",function(){
		calculator.x+=calculator.width/2;
		calculator.y+=calculator.view/4;
		calculator.draw();
	});
	//Math functions domain
	$("main").on("keyup","#domain",function(){
		var id="#"+$(this).parent().parent().parent().attr("id")+" #parameters";
		var dimension=get_size(this);
		//Get parameters
		$(id).text("");
		for(i=1;i<=dimension;i++){
			$(id).text($(id).text()+calculator.parameters[i-1]);
			if(i<dimension)
				$(id).text($(id).text()+", ");
		}
	});
	//Math functions codomain
	$("main").on("keyup","#codomain",function(){
		var id=$(this).parent().parent().parent().attr("id");
		var line="#"+id+" #line"+Number(id.replace("function",""));
		var dimension=get_size(this);
		//Get functions
		$(line).text("");
		if(dimension>1){
			$(line).css("border-left","1px solid #000");
			$(line).css("border-right","1px solid #000");
			$(line).css("border-radius","20px");
			$(line).css("padding-left","5px");
			$(line).css("padding-right","5px");
		}else{
			$(line).css("border-left","none");
			$(line).css("border-right","none");
			$(line).css("border-radius","0");
			$(line).css("padding-left","0px");
			$(line).css("padding-right","0px");
		}
		for(i=1;i<=dimension;i++){
			if(i<dimension)
				$(line).text($(line).text()+"x, ");
			else
				$(line).text($(line).text()+"x");
		}
	});
});