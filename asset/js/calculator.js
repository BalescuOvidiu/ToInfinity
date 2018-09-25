//Calculator object
var calculator=new Object();
calculator.selected=0;
calculator.mousePosition=-1;
calculator.print=function(){
	calculator.mousePosition=-1;
	calculator.selected=0;
	reload_menu(2);
	$("title").text("To Infinity - Calculator");
	$(".menu").hide();
	$("#main").html("<table id='content'>"
			+"<tbody><tr><th id='line0' contenteditable='true'></th></tr></tbody>"
		+"</table>"
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
			+"<button id='25'>&deg;</button><button id='26'>!x</button><button id='27'>A</button><button id='28'>C</button></br>"
			+"<button id='29'>[x]</button><button id='30'>|x|</button><button id='31'>(</button><button id='32'>)</button></br>"
			+"<button id='33'><sup>k</sup>&radic;x</button><button id='34'>x<sup>k</sup></button><button id='35'>log<sub>x</sub>k</button><button id='36'>ln x</button></br>"
			+"<button id='37'>&gamma;</button><button id='38'>i</button><button id='39'>&pi;</button><button id='40'>e</button></br>"
		+"</div>"
		//Third menu
		+"<div class='interface'>"
			+"<button id='41'>CE</button><button id='42'><</button><button id='43'>MOD</button><button id='44'>&divide;</button></br>"
			+"<button id='45'>7</button><button id='46'>8</button><button id='47'>9</button><button id='48'>&bull;</button></br>"
			+"<button id='49'>4</button><button id='50'>5</button><button id='51'>6</button><button id='52'>-</button></br>"
			+"<button id='53'>1</button><button id='54'>2</button><button id='55'>3</button><button id='56'>+</button></br>"
			+"<button id='57'>0</button><button id='58'>00</button><button id='59'>.</button><button id='60'>=</button></br>"
		+"</div>"
		//Main menu
		+"<div class='interface'>"
			+"<button>Algebră liniară</button><button>Analiză reală</button><button>Expresi logice</button><button>Funcții elementare</button><button>Mulțimi</button>"
		+"</div>"
	);
}
calculator.insert=function(value){
	if(calculator.mousePosition>-1)
		paste_html(value);
	else
		$("#line"+calculator.selected).html($("#line"+calculator.selected).html()+value);
}
calculator.slice=function(){
	if(calculator.mousePosition>-1){
		$("#line"+calculator.selected).html($("#line"+calculator.selected).html().slice(0,calculator.mousePosition-1)
		+$("#line"+calculator.selected).html().slice(calculator.mousePosition,$("#line"+calculator.selected).html().length));
		calculator.mousePosition--;
	}else
		$("#line"+calculator.selected).html($("#line"+calculator.selected).html().slice(0,-1));
}
calculator.convert=function(string){
	//Other
	string=string.replace(/<br>/gi,"");
	string=string.replace(/<br type="_moz">/gi,"");
	string=string.replace(/<span><\/span>/gi,"");
	//Symbol
	string=string.replace(/<\/span>/gi,")");
	string=string.replace(/•/g,"*");
	string=string.replace(/π/g,"Pi");
	string=string.replace(/γ/g,"Y");
	string=string.replace(/MOD/g,"%");
	string=string.replace(/∞/g,"Infinity");
	//Floor
	string=string.replace(/[[]/g,"floor(");
	string=string.replace(/]/g,")");
	//Pow
	string=string.replace(/<sup>/gi,"^(");
	string=string.replace(/<\/sup>/gi,")");
	//Log
	string=string.replace(/log<sub>/g,"Log(");
	string=string.replace(/<\/sub>\(/gi,",");
	//Fact
	string=string.replace(/!/g,"fact");
	//Abs
	string=string.replace(/<span class="abs">/gi,"abs(");
	//Sqrt
	string=string.replace(/\)√\<span class="root">/gi,",");
	string=string.replace(/<sup class="sqrt">/gi,"radical(");
	//Combinatorics
	string=string.replace(/<table class="A"><tbody><tr><th rowspan="2">A<\/th><td class="k">/gi,"A(");
	string=string.replace(/<table class="C"><tbody><tr><th rowspan="2">C<\/th><td class="k">/gi,"C(");
	string=string.replace(/<\/td><\/tr><tr><td class="n">/gi,",");
	string=string.replace(/<mark class="combinatorics"><\/mark><\/td><\/tr><\/tbody><\/table>/gi,")");
	//Trigonometry
	string=string.replace(/°/g," deg");
	//Fractions
	string=string.replace(/<table class="fractions"><tbody><tr><td>/gi,"(");
	string=string.replace(/<\/td><\/tr><tr class="fract"><td>/gi,")/(");
	string=string.replace(/<mark class="fractions"><\/mark><\/td><\/tr><\/tbody><\/table>/gi,")");
	//Matrix
	string=string.replace(/<\/table><table class="matrix">/gi,"</table>*<table class="+'"'+"matrix"+'"'+">");
	string=string.replace(/<table class="matrix"><tbody><tr><td>/gi,"([[");
	string=string.replace(/<\/tr><tr>/gi,"],[");
	string=string.replace(/<\/td><td>/gi,",");
	string=string.replace(/[[]<td>/gi,"[");
	string=string.replace(/<\/td>]/gi,"]");
	string=string.replace(/<mark class="mat"><\/mark><\/td><\/tr><\/tbody><\/table>/gi,"]])");
	//Determinant
	string=string.replace(/<table class="determinant"><tbody><tr><td>/gi,"det([[");
	string=string.replace(/<mark class="det"><\/mark><\/td><\/tr><\/tbody><\/table>/gi,"]])");
	//Matrix functions
	string=string.replace(/T/g,"transpose");
	string=string.replace(/tr/g,"trace");
	//Factor
	string=string.replace(/0\(/gi,"0*(");
	string=string.replace(/1\(/gi,"1*(");
	string=string.replace(/2\(/gi,"2*(");
	string=string.replace(/3\(/gi,"3*(");
	string=string.replace(/4\(/gi,"4*(");
	string=string.replace(/5\(/gi,"5*(");
	string=string.replace(/6\(/gi,"6*(");
	string=string.replace(/7\(/gi,"7*(");
	string=string.replace(/8\(/gi,"8*(");
	string=string.replace(/9\(/gi,"9*(");
	//Function plot
	string=string.replace(/xx/g,"x*x");
	string=string.replace(/0x/g,"0*x");
	string=string.replace(/1x/g,"1*x");
	string=string.replace(/2x/g,"2*x");
	string=string.replace(/3x/g,"3*x");
	string=string.replace(/4x/g,"4*x");
	string=string.replace(/5x/g,"5*x");
	string=string.replace(/6x/g,"6*x");
	string=string.replace(/7x/g,"7*x");
	string=string.replace(/8x/g,"8*x");
	string=string.replace(/9x/g,"9*x");
	//Garbage
	string=string.replace(/<span>\)/gi,"");
	string=string.replace(/<span>/gi,"");
	return string;
}
calculator.convert_result=function(result){
	result=String(result);
	if(result=="Infinity")
		result="&infin;";
	else if(result=="-Infinity")
		result="-&infin;";
	else{
		//Matrix
		result=result.replace(/[[]/g,"{");
		result=result.replace(/]/g,"}");
		result=result.replace(/{{/gi,"<table class='matrix'><tbody><tr><td>");
		result=result.replace(/}}/gi,"<mark class='mat'><\/mark><\/td><\/tr><\/tbody><\/table>");
		result=result.replace(/}, {/g,"</td></tr><tr><td>");
		result=result.replace(/,/gi,"</td><td>");
		result=result.replace(/{/gi,"<td>");
		result=result.replace(/}/gi,"</td>");
	}
	return result;
}
calculator.clear=function(){
	$("#line"+calculator.selected).html("");
	calculator.mousePosition=-1;
}
calculator.eval=function(string){
	var result=math.eval(string);
	result=calculator.convert_result(result);
	if(result!="undefined"){
		$("#line"+calculator.selected).attr("contenteditable","false");
		$("#line"+calculator.selected).css("border-bottom","1px solid #016684");
		$("#line"+calculator.selected).html($("#line"+calculator.selected).html()+"="+result);
		calculator.selected++;
		$("#content tbody").html($("#content tbody").html()+"<tr><th id='line"+calculator.selected+"' contenteditable></th></tr>");
		calculator.mousePosition=-1;
		$("#line"+calculator.selected).focus();
	}
}
//Functions
function radical(n,k){
	return math.pow(k,1/n);
}
function fact(n){
	var res=1;
	for(var i=2;i<=n;i++)
		res*=i;
	return res;
}
function A(k,n){
	var res=1;
	for(var i=n-k+1;i<=n;i++)
		res*=i;
	return res;
}
function C(k,n){
	var res=1;
	for(var i=n-k+1;i<=n;i++)
		res*=i;
	for(var i=2;i<=k;i++)
		res/=i;
	return res;
}
function ln(n){
	return math.log(n,math.e);
}
function Log(a,b){
	return math.log(b,a);
}
//Math
radical.transform=function(n,k){
	return radical(n,k);
};
fact.transform=function(n,k){
    return fact(n,k);
};
A.transform=function(k,n){
    return A(k,n);
};
C.transform=function(k,n){
    return C(k,n);
};
ln.transform=function(n){
    return ln(n);
};
Log.transform=function(a,b){
	return math.log(b,a);
};
//Import
math.import({
	radical:radical,
	fact:fact,
	A:A,
	C:C,
	ln:ln,
	Log:Log,
	Pi:3.14159265359,
	Y:0.577215664901532860606
});
//GUI
$(document).ready(function(){
	//Main table
	$("main").on("click keyup keydown","#line"+calculator.selected,function(){
		calculator.mousePosition=get_caret_position(this);
	});
	$("main").on("blur","#line"+calculator.selected,function(e){
		e.preventDefault();
		e.stopPropagation();
	});
	//First table
	$("main").on("click",".interface #1",function(){
		calculator.insert($(".interface #1").text()+'(');
	});
	$("main").on("click",".interface #2",function(){
		calculator.insert($(".interface #2").text()+'(');
	});
	$("main").on("click",".interface #3",function(){
		calculator.insert($(".interface #3").text()+'(');
	});
	$("main").on("click",".interface #4",function(){
		calculator.insert($(".interface #4").text()+'(');
	});
	$("main").on("click",".interface #5",function(){
		calculator.insert($(".interface #5").text()+'(');
	});
	$("main").on("click",".interface #6",function(){
		calculator.insert($(".interface #6").text()+'(');
	});
	$("main").on("click",".interface #7",function(){
		calculator.insert($(".interface #7").text()+'(');
	});
	$("main").on("click",".interface #8",function(){
		calculator.insert($(".interface #8").text()+'(');
	});
	$("main").on("click",".interface #9",function(){
		calculator.insert($(".interface #9").text()+'(');
	});
	$("main").on("click",".interface #10",function(){
		calculator.insert($(".interface #10").text()+'(');
	});
	$("main").on("click",".interface #11",function(){
		calculator.insert($(".interface #11").text()+'(');
	});
	$("main").on("click",".interface #12",function(){
		calculator.insert($(".interface #12").text()+'(');
	});
	$("main").on("click",".interface #13",function(){
		calculator.insert($(".interface #13").text()+'(');
	});
	$("main").on("click",".interface #14",function(){
		calculator.insert($(".interface #14").text()+'(');
	});
	$("main").on("click",".interface #15",function(){
		calculator.insert($(".interface #15").text()+'(');
	});
	$("main").on("click",".interface #16",function(){
		calculator.insert($(".interface #16").text()+'(');
	});
	$("main").on("click",".interface #17",function(){
		calculator.insert($(".interface #17").text()+'(');
	});
	$("main").on("click",".interface #18",function(){
		calculator.insert($(".interface #18").text()+'(');
	});
	$("main").on("click",".interface #19",function(){
		calculator.insert($(".interface #19").text()+'(');
	});
	$("main").on("click",".interface #20",function(){
		calculator.insert($(".interface #20").text()+'(');
	});
	//Second table
	$("main").on("click",".interface #21",function(){
		calculator.insert($(".interface #21").text()+'(');
	});
	$("main").on("click",".interface #22",function(){
		calculator.insert($(".interface #22").text()+'(');
	});
	$("main").on("click",".interface #23",function(){
		calculator.insert($(".interface #23").text()+'(');
	});
	$("main").on("click",".interface #24",function(){
		calculator.insert($(".interface #24").text()+'(');
	});
	$("main").on("click",".interface #25",function(){
		calculator.insert($(".interface #25").text()+')');
	});
	$("main").on("click",".interface #26",function(){
		calculator.insert("!(");
	});
	$("main").on("click",".interface #27",function(){
		calculator.insert("<span></span><table class='A'><tbody><tr><th rowspan='2'>A</th><td class='k'>1</td></tr><tr><td class='n'>1<mark class='combinatorics'></mark></td></tr></tbody></table><span></span>");
	});
	$("main").on("click",".interface #28",function(){
		calculator.insert("<span></span><table class='C'><tbody><tr><th rowspan='2'>C</th><td class='k'>1</td></tr><tr><td class='n'>1<mark class='combinatorics'></mark></td></tr></tbody></table><span></span>");
	});
	$("main").on("click",".interface #29",function(){
		calculator.insert("[]");
	});
	$("main").on("click",".interface #30",function(){
		calculator.insert("<span></span><span class='abs'>-1</span><span></span>");
	});
	$("main").on("click",".interface #31",function(){
		calculator.insert($(".interface #31").text());
	});
	$("main").on("click",".interface #32",function(){
		calculator.insert($(".interface #32").text());
	});	
	$("main").on("click",".interface #33",function(){
		calculator.insert("<span></span><sup class='sqrt'>2</sup>&radic;<span class='root'>4</span><span></span>");
	});
	$("main").on("click",".interface #34",function(){
		calculator.insert("<sup>2</sup><span></span>");
	});
	$("main").on("click",".interface #35",function(){
		calculator.insert("log<sub>2</sub>()");
	});
	$("main").on("click",".interface #36",function(){
		calculator.insert("ln(");
	});
	$("main").on("click",".interface #37",function(){
		calculator.insert($(".interface #37").text());
	});
	$("main").on("click",".interface #38",function(){
		calculator.insert($(".interface #38").text());
	});
	$("main").on("click",".interface #39",function(){
		calculator.insert($(".interface #39").text());
	});
	$("main").on("click",".interface #40",function(){
		calculator.insert($(".interface #40").text());
	});
	//Third table
	$("main").on("click",".interface #41",function(){
		calculator.clear();
	});
	$("main").on("click",".interface #42",function(){
		calculator.slice();
	});
	$("main").on("click",".interface #43",function(){
		calculator.insert($(".interface #43").text());
	});
	$("main").on("click",".interface #44",function(){
		calculator.insert("<span></span><table class='fractions'><tbody><tr><td>1</td></tr><tr class='fract'><td>2<mark class='fractions'></mark></td></tr></tbody></table><span></span>");
	});
	$("main").on("click",".interface #45",function(){
		calculator.insert($(".interface #45").text());
	});
	$("main").on("click",".interface #46",function(){
		calculator.insert($(".interface #46").text());
	});
	$("main").on("click",".interface #47",function(){
		calculator.insert($(".interface #47").text());
	});
	$("main").on("click",".interface #48",function(){
		calculator.insert($(".interface #48").text());
	});
	$("main").on("click",".interface #49",function(){
		calculator.insert($(".interface #49").text());
	});
	$("main").on("click",".interface #50",function(){
		calculator.insert($(".interface #50").text());
	});
	$("main").on("click",".interface #51",function(){
		calculator.insert($(".interface #51").text());
	});
	$("main").on("click",".interface #52",function(){
		calculator.insert($(".interface #52").text());
	});
	$("main").on("click",".interface #53",function(){
		calculator.insert($(".interface #53").text());
	});
	$("main").on("click",".interface #54",function(){
		calculator.insert($(".interface #54").text());
	});
	$("main").on("click",".interface #55",function(){
		calculator.insert($(".interface #55").text());
	});
	$("main").on("click",".interface #56",function(){
		calculator.insert($(".interface #56").text());
	});
	$("main").on("click",".interface #57",function(){
		calculator.insert($(".interface #57").text());
	});
	$("main").on("click",".interface #58",function(){
		calculator.insert($(".interface #58").text());
	});
	$("main").on("click",".interface #59",function(){
		calculator.insert($(".interface #59").text());
	});
	$("main").on("click",".interface #60",function(){
		calculator.eval(calculator.convert($("#line"+calculator.selected).html()));
	});
	$("main").on("click",".interface #61",function(){
		var row=$("#row input").val();
		var col=$("#col input").val();
		var string="<table class='matrix'><tbody>";
		for(var i=0;i<row;i++){
			string+="<tr>";
			for(j=0;j<col;j++){
				if(i==row-1&&j==col-1)					
					string+="<td>0<mark class='mat'></mark></td>";
				else
					string+="<td>0</td>";
			}
			string+="</tr>";
		}
		string+="</tbody></table>";
		calculator.insert(string);
	});
	$("main").on("click",".interface #62",function(){
		var size=$("#size input").val();
		var string="<table class='determinant'><tbody>";
		for(var i=0;i<size;i++){
			string+="<tr>";
			for(j=0;j<size;j++){
				if(i==size-1&&j==size-1)					
					string+="<td>0<mark class='det'></mark></td>";
				else
					string+="<td>0</td>";
			}
			string+="</tr>";
		}
		string+="</tbody></table>";
		calculator.insert(string);
	});
	$("main").on("click",".interface #63",function(){
		calculator.insert($(".interface #63").text());
	});
	$("main").on("click",".interface #64",function(){
		calculator.insert($(".interface #64").text());
	});
	$("main").on("click",".interface #65",function(){
		calculator.insert($(".interface #65").text());
	});
	$("main").on("click",".interface #66",function(){
		calculator.insert("T");
	});
	$("main").on("click",".interface #67",function(){
		calculator.insert("tr");
	});
	$("main").on("click",".interface #68",function(){
		calculator.insert($(".interface #68").text());
	});
	$("main").on("click",".interface #69",function(){
		calculator.insert("<span></span><span class='abs'>x</span><span></span>");
	});
});