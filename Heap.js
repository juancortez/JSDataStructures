const Heap = (function(){
	/*
		@param {type}  Type of heap.
							0: Min Heap
							1: Max Heap
	*/
	function init(type){
		this.items = [];
		this.maxHeap = type === 1 ? true : false;
	}

	function insert(item){
		this.items.push(item);
		_siftUp.call(this);
	}

	/*
		If the Heap is a maximum heap, it will retrieve the greatest element
		If the Heap is a minimum heap, it will retrieve the smallest eleemnt
		If empty, returns nulls
	*/
	function remove(){
		if(this.items.length === 0) return null;
		if(this.items.length === 1) return this.items.shift();
		let element = this.items[0];
		this.items[0] = this.items.pop();
		_siftDown.call(this);
		return element;
	}

	function _siftUp(){
		let position = this.items.length - 1;
		while(position > 0){
			let parentPosition = _getParentIndex(position);
			let item = this.items[position];
			let parent = this.items[parentPosition];

			function _swap(){
				this.items[position] = parent;
				this.items[parentPosition] = item;		
			}

			if(this.maxHeap && item.compareTo(parent) > 0){
				_swap.call(this);
				position = parentPosition;
			} else if(!this.maxHeap && item.compareTo(parent) < 0){
				_swap.call(this);
				position = parentPosition;
			} else{
				break;
			}
		}
	}

	function _siftDown(){
		let k = 0;
		let l = _getLeftChild(k);

		let heapSize = this.items.length;

		while(l < heapSize){
			let max = l;
			let r = l + 1;

			function _swap(tmp){
				this.items[k] = this.items[max];
				this.items[max] = tmp;		
			}

			if(r < heapSize){
				let rightChild = this.items[r],
					leftChild = this.items[max];

				if(this.maxHeap && rightChild.compareTo(leftChild) > 0 ){
					max++;
				} else if(!this.maxHeap && rightChild.compareTo(leftChild) < 0){
					max++;
				}
			}

			let maxChild = this.items[max];
			let currentValue = this.items[k];
			if(this.maxHeap && currentValue.compareTo(maxChild) < 0 ){
				_swap.call(this, this.items[k]);
				k = max;
				l = _getLeftChild(k);
			} else if(!this.maxHeap && currentValue.compareTo(maxChild) > 0){
				_swap.call(this, this.items[k]);
				k = max;
				l = _getLeftChild(k);
			} else{
				break;
			}
		}
	}

	function _getParentIndex(childIndex){
		return Math.floor((childIndex - 1) / 2);
	}

	function _getLeftChild(parentIndex){
		return (2 * parentIndex) + 1;
	}

	function print(){
		console.log(this.items);
	}

	/*
		Compares this number with number passed in.

			@output{Number} 1  - this value is greater than passed in value
							0  - both values are the same
							-1 - this value is less than passed in value
	*/
	Number.prototype.compareTo = function(a){
		if(this.constructor !== Number || a.constructor !== Number) return null;
		return this - a;
	}
	
	return{
		init,
		insert,
		print,
		remove
	};
})();


console.log("Testing minimum heap:");
let values = [35, 33, 42, 10, 14, 19, 27, 44, 26, 31];
Heap.init(0);
for(let value of values) Heap.insert(value);
Heap.print();
console.log("Removing element " + Heap.remove());
Heap.print();
console.log("Removing element " + Heap.remove());
Heap.print();
console.log("Removing element " + Heap.remove());
Heap.print();
console.log('\n');

console.log("Testing maximum heap:");
Heap.init(1);
for(let value of values) Heap.insert(value);
Heap.print();
console.log("Removing element " + Heap.remove());
Heap.print();
console.log("Removing element " + Heap.remove());
Heap.print();
console.log("Removing element " + Heap.remove());
Heap.print();
