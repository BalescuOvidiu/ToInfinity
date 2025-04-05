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