/*
	Question: In a given, unsorted array, determine whether or not there exists
	2 numbers that equal a given "sum" number. Assume there will not be negative numbers.

	Example: [4,1,6,8,3,20], Sum = 11
		True, because 8 + 3 = 11
*/

function sumExists(arr, sum){
	arr.sort((a,b) => {
		return a - b;
	});

	let startingPointer = 0,
		endingPointer = arr.length - 1;

	while(startingPointer < endingPointer){
		let firstValue = arr[startingPointer],
			secondValue = arr[endingPointer];
		let total = firstValue + secondValue;

		if(total === sum) return true;
		if(total > sum) endingPointer--;
		if(total < sum) startingPointer++;
	}
	return false;
}


let arr = [4,1,6,8,3,20],
	firstTest = 11,
	secondTest = 13;

let firstExists = sumExists(arr, firstTest);
let secondExists = sumExists(arr, secondTest);

console.log(`${firstTest} exists? ${firstExists}`);
console.log(`${secondTest} exists? ${secondExists}`);