const Stack = (function(){
	function init(){
		this.head = null
		this.cachedSize = null;
	}

	function isEmpty(){
		if(this.head === null) return true;
		else return size.call(this) === 0;
	}

	function size(){
		if(this.cachedSize !== null) return this.cachedSize;
		let size = 0,
			tmp = this.head;
		while(tmp !== null){
			size++;
			tmp = tmp.next;
		}
		return this.cachedSize = size;
	}

	function push(item){
		if(this.head === null){
			this.head = _createNode.call(this, item);
		} else{
			let node = _createNode.call(this, item);
			node.next = this.head;
			this.head = node;
		}
		if(this.cachedSize !== null) this.cachedSize++;
	}

	function pop(){
		if(isEmpty.call(this)) return null;
		let temp = this.head;
		this.head = this.head.next;
		this.cachedSize = this.cachedSize - 1;
		return temp.data;
	}

	function print(){
		let tmp = this.head;
		let result = [];
		while(tmp !== null){
			result.push(tmp.data);
			tmp = tmp.next;
		}
		if(result.length > 0) console.log(result.join(' '));
	}

	function empty(){
		while(size.call(this) > 0){
			pop.call(this);
		}
	}

	function _createNode(n) {
		return{
			'data': n,
			'next': null
		}
	};

	return{
		init,
		push,
		print,
		isEmpty,
		empty,
		size,
		pop
	};
})();

const TEST = false;
function test(){
	console.log("Adding 1, 2, and 3");
	Stack.init();
	Stack.push(1);
	Stack.push(2);
	Stack.push(3);
	Stack.print();
	console.log("Popping " + Stack.pop());
	console.log("Popping " + Stack.pop());
	console.log("Popping " + Stack.pop());
	console.log("Is empty? " + Stack.isEmpty());
	console.log(Stack.pop());
	console.log(Stack.size());
}

TEST && test();

module.exports = Stack;

