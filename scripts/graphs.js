/**
 *  script.h
 *
 *  Created 01 February 2021
 *  By Balescu Ovidiu-Gheorghe <balescuovidiu@gmail.com>
 *  Modified 01 February 2021
 *  By Balescu Ovidiu-Gheorghe <balescuovidiu@gmail.com>
 */

var intVariable = 0;

/**
 * @desc description
 * @param int - number
 * @return int - result
 */
function displayInt(integerVariable){
	console.write(integerVariable);
	return integerVariable;
}

/**
 * @desc main function used by jQuery library
 * @param function - 
 */
$(document).ready(function(){

	$("#button").click(function(){
		displayInt(intVariable);
	});
});



/*

unsigned isLinked(Graph graph,unsigned i,unsigned j){
	if(isOriented(graph))
		if(graph.tie[i].a==graph.tie[j].a||graph.tie[i].b==graph.tie[j].b)
			return 1;
	return (graph.tie[i].b==graph.tie[j].a||graph.tie[i].a==graph.tie[j].b);
}
unsigned isOriented(Graph graph){
	return (graph.oriented);
}
unsigned getTie(Graph graph,unsigned a,unsigned b){
	if(a==b)
		return 0;
	unsigned i;
	//Oriented graph
	if(isOriented(graph)){
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return 1;
		}
	}else{
	//Non-oriented graph
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return 1;
			else if(graph.tie[i].a==b&&graph.tie[i].b==a)
				return 1;
		}
	}
	return 0;
}
unsigned getCost(Graph graph,unsigned a,unsigned b){
	if(a==b)
		return 0;
	unsigned i;
	//Oriented graph
	if(isOriented(graph)){
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return graph.tie[i].cost;
		}
	}else{
	//Non-oriented graph
		for(i=0;i<graph.m;i++){
			if(graph.tie[i].a==a&&graph.tie[i].b==b)
				return graph.tie[i].cost;
			else if(graph.tie[i].a==b&&graph.tie[i].b==a)
				return graph.tie[i].cost;
		}
	}
	return INF;
}
unsigned **getMatrix(Graph graph){
	unsigned **a,i,j;
	a=(unsigned**)malloc(sizeof(unsigned)*graph.n);
	for(i=0;i<graph.n;i++){
		a[i]=(unsigned*)malloc(sizeof(unsigned)*graph.n);
		for(j=0;j<graph.n;j++){
			a[i][j]=getCost(graph,i,j);
		}
	}
	for(i=0;i<graph.n;i++){
		printf("  \n");
		for(j=0;j<graph.n;j++)
			printf("%u ",a[i][j]);
	}
	return a;
}

*/