const Queue = (function(){
	let head = null,
		tail = null,
		cachedSize = null; // cache size so we don't have to iterate through whole queue each time

	function init(){
		this.head = null;
		this.tail = null;
		this.cachedSize = null;
	}

	function add(n){
		if(this.head === null){
			this.head = _createNode.call(this, n);
			this.tail = this.head;
		} else{
			let node = _createNode.call(this, n);
			this.tail.next = node;
			this.tail = node;
		}
		if(this.cachedSize !== null) this.cachedSize++;
	}

	function remove(){
		if(this.head === null) return null;
		let tmp = this.head;
		this.head = this.head.next;
		this.cachedSize--;
		return tmp.data;
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

	function peek(){
		return element.call(this);
	}

	function poll(){
		return remove.call(this);
	}


	function element(){
		if(size() === 0) return null;
		else return this.head.data;
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

	function _createNode(n) {
		return{
			'data': n,
			'next': null
		}
	};

	return{
		init,
		add,
		remove,
		size,
		element,
		peek,
		poll,
		print
	}
})();

const TEST = false;
function test(){
	Queue.init();
	console.log("Adding 1, 3, and 7");
	Queue.add(1);
	Queue.add(3);
	Queue.add(7);
	Queue.print();
	console.log("Queue size: " + Queue.size());
	console.log("Removing: " + Queue.remove());
	console.log("Removing: " + Queue.remove());
	console.log("Removing: " + Queue.remove());
	console.log("Queue size: " + Queue.size());
	console.log("Removing: " + Queue.remove());
}

TEST && test();

module.exports = Queue;