const quickSort = require('./QuickSort.js');

const BinarySearch = (() => {
	let arr = null;
	let key = null;

	function init(arr){
		this.arr = arr;
	}

	function search(key){
		if(this.arr === null || typeof this.arr === "undefined"){
			throw new Error(`Must initialize first.`);
			return -1;
		}
		this.key = key;
		return _binarySearch.call(this, 0, this.arr.length, key);
	}

	function _binarySearch(low, high){
		if(this.arr === null || this.arr.length === 0) return -1;

		let middle = Math.floor(low + (high - low)/2),
			middleElement = this.arr[middle];

		if(low < high){
			if(this.key < middleElement){
				return _binarySearch.call(this, low, middle);
			} else if(this.key > middleElement){
				return _binarySearch.call(this, middle + 1, high);
			} else{
				return {
					index: middle,
					value: middleElement
				}
			}		
		} else{
			return{
				index: -1,
				value: null
			}
		}
	}

	return {
		init,
		search
	}
})();

function test(){
	let arr = [];
	for(let i = 0; i < 20; i++){
		arr.push(Math.floor(Math.random(255) * 100));
	}

	quickSort.init(arr);
	arr = quickSort.sort();
	BinarySearch.init(arr);

	console.log(arr.join(', '));

	for(let i = 0; i < 10; i++){
		let key = Math.ceil(Math.random(255) * 100);
		let answer = BinarySearch.search(key);
		if(answer.index != -1) console.log(`${key} is located in index ${answer.index}.`);
		else console.log(`${key} was not found.`);
	}	
}

test();

module.exports = BinarySearch;