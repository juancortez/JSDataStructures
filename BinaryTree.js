const BinaryTree = (function(){
	let root = null;
	const PRINT = {
		"PRE": 0,
		"POST": 1,
		"INORDER": 2
	};

	function insert(data){
		root = _insert(root, data);
	};

	function size(){
		return _size(root);
	};

	/*
		@param {type}	The type of Binary Tree traversal to print by
							0: Pre-order Traversal - In this traversal method, the root node is visited first, then the left subtree and finally the right subtree.
							1: Post-order Traversal - In this traversal method, the root node is visited last, hence the name
							2: In-order Traversal - If a binary tree is traversed in-order, the output will produce sorted key values in an ascending order.
	*/
	function print(type){
		let acc = [];
		switch(type){
			case PRINT.PRE:
				_preOrder(root, acc);
				console.log("Printing in pre-order:", acc.join(" "));
				break;
			case PRINT.POST:
				_postOrder(root, acc);
				console.log("Printing in post-order:", acc.join(" "));
				break;
			case PRINT.INORDER:
				_inOrder(root, acc);
				console.log("Printing in in-order:", acc.join(" "));
				break;
			default:
				if(type !== undefined) console.error(`${type} not supported. Please select 0, 1, or 2`);
				else console.error("Must provide a number between 0-2");
		}
	};	

	function maxDepth(){
		return _maxDepth(root);
	}

	_maxDepth = (node) => {
		if(node === null) return 0;
		let leftDepth = _maxDepth(node.left);
		let rightDepth = _maxDepth(node.right);
		return(Math.max(leftDepth, rightDepth) + 1); 
	};

	_size = (node) => {
		if(node === null) return 0;
		else return (_size(node.left) + 1 + _size(node.right));
	};

	_insert = (node, data) => {
		if(node === null){
			node = _createNode(data);
		} else{
			if(data <= node.data){
				node.left = _insert(node.left, data);
			} else {
				node.right  = _insert(node.right, data);
			}
		}
		return node;
	};

	_createNode = (data) => {
		return{
			data,
			left: null,
			right: null
		};
	};

	_preOrder = (node, acc) => {
		if(node === null) return;
		acc.push(node.data);
		_preOrder(node.left, acc);
		_preOrder(node.right, acc);
	};

	_inOrder = (node, acc) => {
		if(node === null) return;
		_inOrder(node.left, acc);
		acc.push(node.data);
		_inOrder(node.right, acc);
	};

	_postOrder = (node, acc) => {
		if(node === null) return;
		_postOrder(node.left, acc);
		_postOrder(node.right, acc);
		acc.push(node.data);
	};

	return{
		insert,
		size,
		maxDepth,
		print
	};
})();

BinaryTree.insert(10);
BinaryTree.insert(5);
BinaryTree.insert(3);
BinaryTree.insert(7);
BinaryTree.insert(11);
BinaryTree.insert(20);

BinaryTree.print(0);
BinaryTree.print(1);
BinaryTree.print(2);

const size = BinaryTree.size();
console.log(`Size of BinaryTree is ${size}`);

const maxDepth = BinaryTree.maxDepth();
console.log(`Max depth of BinaryTree is ${maxDepth}`);
