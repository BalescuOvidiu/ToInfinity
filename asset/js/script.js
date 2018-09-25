//Output
function print_menu_home(){
	$("title").text("To Infinity");
	$("#main").html("");
	$("#main").hide();
	$("header").hide();
	$(".menu").show();
}
function reload_menu(q){
	$("header").show();
	$("#main").show();
	for(var i=0;i<5;i++)
		if($("#menu"+i).attr("class")=="selected"){
			$("#menu"+i).attr("class","");
			break;
		}
	$("#menu"+q).attr("class","selected");
}
//Selection position
function get_caret_position(element){
    var caretOffset=0;
    if(typeof window.getSelection!="undefined"){
        var range=window.getSelection().getRangeAt(0);
        var preCaretRange=range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer,range.endOffset);
        caretOffset=preCaretRange.toString().length;
    }else if(typeof document.selection!="undefined"&&document.selection.type!="Control"){
        var textRange=document.selection.createRange();
        var preCaretTextRange=document.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd",textRange);
        caretOffset=preCaretTextRange.text.length;
    }
    return caretOffset;
}
function paste_html(html){
    var sel,range;
	//IE9 and non-IE
	sel = window.getSelection();
	if (sel.getRangeAt && sel.rangeCount){
		range = sel.getRangeAt(0);
		range.deleteContents();
		//Range.createContextualFragment() would be useful here but is
		//non-standard and not supported in all browsers (IE9, for one)
		var el=document.createElement("li");
		el.innerHTML=html;
		var frag = document.createDocumentFragment(),node,lastNode;
		while((node=el.firstChild))
			lastNode=frag.appendChild(node);
		range.insertNode(frag);
		//Preserve the selection
		if(lastNode){
			range = range.cloneRange();
			range.setStartAfter(lastNode);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}
}
//Validation
function validation_email(id){
	var filter=/^([a-z\A-Z\0-9_\.\-])+\@(([a-z\A-Z\0-9\-])+\.)+([a-z\A-Z\0-9]{2,4})+$/;
	$(id+"_").text("("+$(id).val().length+")");
	if(filter.test($(id).val())){
		$(id).css("background-color","#D9D9D9");
		return true;
	}
	$(id).css("background-color","#FFB39B");
	return false;
}
function validation_name(id){
	var filter=/^([a-z\A-Z\0-9\-\_\ ]{3,30})+$/;
	$(id+"_").text("("+$(id).val().length+")");
	if(filter.test($(id).val())){
		$(id).css("background-color","#D9D9D9");
		return true;
	}
	$(id).css("background-color","#FFB39B");
	return false;
}
function validation_text(id){
	$(id+"_").text("("+$(id).val().length+")");
	if($(id).val().length>4){
		$(id).css("background-color","#D9D9D9");
		return true;
	}
	$(id).css("background-color","#FFB39B");
	return false;
}
//Text
function get_size(selector){
	switch(Number($(selector).text())){
		case 2: return 2; break;
		case 3: return 3; break;
		case 4: return 4; break;
	}
	$(selector).text("");
	return 1;
}
//Draw
function hex_to_rgba(hex,opacity){
	hex=hex.replace('#','');
	return "rgba("
		+(parseInt(hex.substring(0,hex.length/3),16))+","
		+(parseInt(hex.substring(hex.length/3,2*hex.length/3),16))+","
		+(parseInt(hex.substring(2*hex.length/3,3*hex.length/3),16))+","+opacity+")";
}
//Queries
$(document).ready(function(){
	//On load
	//Header menu
	$("#menu0").click(function(){
		print_menu_home();
	});
	$("#menu1").click(function(){
		print_posts();
	});
	$("#menu2").click(function(){
		calculator.print();
	});
	$("#menu3").click(function(){
		calculator.print_functions();
	});
	$("#menu4").click(function(){
		print_graf();
	});
	//Main buttons
	$("main").on("click",".home_button",function(){
		$("header").show();
	});
	$("main").on("click","#m1",function(){
		print_posts();
	});
	$("main").on("click","#m2",function(){
		calculator.print();
	});
	$("main").on("click","#m3",function(){
		calculator.print_functions();
	});
	$("main").on("click","#m4",function(){
		print_graf();
	});
	//Footer buttons
	$("#contact").click(function(){
		if(validation_email("#email1")&&validation_text("#message1"))
			$.post("asset/php/contact.php",{
					context:$("#email1").val()+"\n\n"+$("#message1").val()
				},function(data){
				$("#contact").parent().html("<h1>Contact</h1><p>"+data+"</p>");
			});
	});
	$("#newsletter").click(function(){
		if(validation_email("#email0")){
			$.post("asset/php/newsletter.php",{
					newsletter:$("#email0").val()
				},function(data){
					if(data.search("Există deja un abonament pentru această adresă de mail")!=-1)
						$("#warning").text(data);
					else
						$("#newsletter").parent().html("<h1>Noutăți</h1>"+data+".");
			});
		}
	});
	//Footer textboxes
	$("#email0").keyup(function(){
		validation_email("#email0");
	});
	$("#email1").keyup(function(){
		validation_email("#email1");
	});
	$("#message1").keyup(function(){
		validation_text("#message1");
	});
	$("label").click(function(){
		$("#"+$(this).attr("for")).toggle();
	});
});