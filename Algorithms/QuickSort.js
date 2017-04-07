const QuickSort = (() => {
	let arr = null;
	function init(arr){
		this.arr = arr;
	}

	function sort(){
		if(this.arr === null || typeof this.arr === "undefined"){
			throw new Error(`Must initialize first.`);
			return -1;
		}
		_sort.call(this, 0, this.arr.length - 1);
		return this.arr;
	}

	function _sort(low, high){
		let pivot = this.arr[Math.floor(low + (high - low) / 2)];

		let i = low;
		let j = high;
		
		while( i <= j){
			while(this.arr[i] < pivot){
				i++;
			}
			while(this.arr[j] > pivot){
				j--;
			}

			if(i <= j){
				_swap.call(this, i, j);
				i++;
				j--;
			}

			if(low < j){
				_sort.call(this, low, j);
			}

			if(i < high){
				_sort.call(this, i, high);
			}
		}
	}

	function _swap(i, j){
		let tmp = this.arr[i];
		this.arr[i] = this.arr[j];
		this.arr[j] = tmp; 
	}

	return{
		init,
		sort
	}
})();


const TEST = false;

function test(){
	let arr = [];

	for(let i = 0; i < 20; i++){
		arr.push(Math.floor(Math.random(255) * 100));
	}

	QuickSort.init(arr);
	console.log("Before: ", arr.join(', '));
	arr = QuickSort.sort();
	console.log("After: ", arr.join(', '));
}


TEST && test();

module.exports = QuickSort;