function print_posts(){
	reload_menu(1);
	$("title").text("To Infinity - Postări");
	$(".menu").hide();
	$("#main .menu").show();
	$.post("asset/php/posts.php",function(data){
		$("#main").html(data);
		$("#main").html("<div id='search'>"
			+"<section>"
				+"<label for='search_author'>Caută după numele autorului</label><input id='search_author' maxlength='30' type='name'/>"
				+"<strong>Între 3 şi 30 de caractere.<b id='search_author_'>(0)</b></strong>"
			+"</section>"
			+"<section>"
				+"<label for='search_title'>Caută după titlu</label><input id='search_title' maxlength='30' type='name'/>"
				+"<strong>Între 3 şi 30 de caractere.<b id='search_title_'>(0)</b></strong>"
			+"</section>"
			+"<section>"
				+"<label for='search_content'>Caută după conţinut</label><input id='search_content' maxlength=30 type='text'/>"
				+"<strong>Între 5 şi 30 de caractere.<b id='search_content_'>(0)</b></strong>"
			+"</section>"
		+"</div>"+data);
	});
}
function print_post(id){
	$.post("asset/php/post.php",{id:id},function(data){
		$("#main").html(data);
	});
}
//Search
function post_search(element){
	if(validation_name("#search_"+element)){
		var post=0;
		while($("#post"+post+" #"+element).html()){
			if($("#post"+post+" #"+element).text().search($("#search_"+element).val())==-1)
				$("#post"+post).css("display","none");
			else
				$("#post"+post).css("display","block");
			post++;
		}
	}
}
$(document).ready(function(){
	//Search
	$("main").on("keyup","#search_author",function(){
		post_search("author");
	});
	$("main").on("keyup","#search_title",function(){
		post_search("title");
	});
	$("main").on("keyup","#search_content",function(){
		post_search("content");
	});
});