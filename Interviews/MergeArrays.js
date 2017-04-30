/*
	Given 2 sorted arrays, one of size an and one of size 2n, merge both arrays so all elements are sorted, from lowest to highest.
		Example:
			n  [0,3,7,9]
			2n [1,4,5,10,null,null,null,null]
		Solution: 
			[0,1,3,4,5,7,9,10]
*/	

function merge(arr = [], arrTwo = []){
	let size = arr.length - 1;
	let ptrOne = size,
		ptrTwo = size;
	let index = arrTwo.length - 1;
	while(index > -1){
		let valOne = ptrOne > -1 ? arr[ptrOne] : null;
		let valTwo = ptrTwo > -1 ? arrTwo[ptrTwo] : null;

		if(valOne === null) break;
		if(valOne >= valTwo){
			arrTwo[index--] = valOne;
			ptrOne--;
		} else if(valOne < valTwo){
			arrTwo[index--] = valTwo;
			ptrTwo--;
		}
	}
	return arrTwo;
}

let arr = [0,3,7,9];
let arrTwo = [1,4,5,10,null,null,null,null];

let result = merge(arr, arrTwo);
console.log("Merged arrays:", result);