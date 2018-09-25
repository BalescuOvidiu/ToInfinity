function print_graf(){
	reload_menu(4);
	$("title").text("To Infinity - Grafuri");
	$(".menu").hide();
	$("#main").html("<iframe src='graph/index.html'></iframe>");
	/*
	$("#main .menu").show();
	$("#main").html("<span class='menu'>"
			+"<button id='g0'>Havel-Hakimi</button>"
			+"<img src='img/menu/0.png'/>"
			+"<img src='img/menu/1.png'/>"
			+"<button id='g1'>Parcurgeri grafuri</button>"
		+"</span>"
		+"<span class='menu'>"
			+"<button id='g2'>Roy-Floyd</button>"
			+"<img src='img/menu/2.png'/>"
			+"<img src='img/menu/3.png'/>"
			+"<button id='g3'>Dijkstra</button>"
		+"</span>"
		+"<span class='menu'>"
			+"<button id='g4'>Kruskal</button>"
			+"<img src='img/menu/0.png'/>"
			+"<img src='img/menu/1.png'/>"
			+"<button id='g5'>Prim</button>"
		+"</span>"
		+"<span class='menu'>"
			+"<button id='g6'>Arbori binari</button>"
			+"<img src='img/menu/2.png'/>"
			+"<img src='img/menu/3.png'/>"
			+"<button id='g7'>Grafuri izomorfe</button>"
		+"</span>");
	*/
}
//Queries
$(document).ready(function(){
	$("main").on("click","#g0",function(){

	});
	$("main").on("click","#g1",function(){
		$("#main").html("<iframe src='graph/index.html'></iframe>");
	});
	$("main").on("click","#g2",function(){

	});
	$("main").on("click","#g3",function(){

	});
	$("main").on("click","#g4",function(){

	});
	$("main").on("click","#g5",function(){

	});
	$("main").on("click","#g6",function(){

	});
	$("main").on("click","#g7",function(){

	});
});