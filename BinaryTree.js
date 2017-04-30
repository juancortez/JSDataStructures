const BinaryTree = (function(){
	let root = null;

	const PRINT = {
		"PRE": 0,
		"POST": 1,
		"INORDER": 2
	};

	function insert(data){
		root = _insert(root, data);
		return root;
	};

	function find(element){
		return _find(root, element);
	}

	/** 
 		Returns the number of nodes in the tree. 

 		@output		returns an integer representing the number of nodes in the binary tree
	*/ 
	function size(){
		if(root === null){
 			console.info("Binary tree is empty.");
 			return 0;
 		}
		return _size(root);
	};

	/*
		@param {type}	The type of Binary Tree traversal to print by
							0: Pre-order Traversal - In this traversal method, the root node is visited first, then the left subtree and finally the right subtree.
							1: Post-order Traversal - In this traversal method, the root node is visited last, hence the name
							2: In-order Traversal - If a binary tree is traversed in-order, the output will produce sorted key values in an ascending order.
	*/
	function print(type, print = true){
		let acc = [];
		switch(type){
			case PRINT.PRE:
				_preOrder(root, acc);
				print && console.log("Printing in pre-order:", acc.join(" "));
				return acc;
				break;
			case PRINT.POST:
				_postOrder(root, acc);
				print && console.log("Printing in post-order:", acc.join(" "));
				return acc;
				break;
			case PRINT.INORDER:
				_inOrder(root, acc);
				print && console.log("Printing in in-order:", acc.join(" "));
				return acc;
				break;
			default:
				if(type !== undefined) console.error(`${type} not supported. Please select 0, 1, or 2`);
				else console.error("Must provide a number between 0-2");
		}
	};	

	/** 
	 	Returns the max root-to-leaf depth of the tree. 
	*/ 
	function maxDepth(){
		if(root === null){
 			console.info("Binary tree is empty.");
 			return -1;
 		}
		return _maxDepth(root);
	}

	/** 
 		Returns the min value in a non-empty binary search tree. 

 		@output		the minimum value of the binary tree
 	*/
 	function minValue(){
 		if(root === null){
 			console.info("Binary tree is empty.");
 			return -1;
 		}
 		let current = root;
 		while(current.left !== null){
 			current = current.left;
 		}
 		return current.data;
 	}

 	/**
		Finds the distance between node n1, and n2

		Dist(n1, n2) = Dist(root, n1) + Dist(root, n2) - 2*Dist(root, lca) 
			'n1' and 'n2' are the two given keys
			'root' is root of given Binary Tree.
			'lca' is lowest common ancestor of n1 and n2
			Dist(n1, n2) is the distance between n1 and n2.

		@param {n1}					the starting node for the path
		@param {n2}					the ending node
		@output {output.exists} 	a boolean value representing whether or not a path exists
		@output {output.distance}   an integer representing the path between the 2 nodes. Returns -1 if not found
 	*/
 	function distanceBetween(n1, n2, cb){
 		_lowestCommonAncestor(n1, n2).then((lowestCommonAncestor) => {

 			let nodeOneDistance = _nodeHeight(root, n1, 1),
 				nodeTwoDistance = _nodeHeight(root, n2, 1),
 				ancestorDistance = _nodeHeight(root, {'data': lowestCommonAncestor}, 1);

 			let result = nodeOneDistance + nodeTwoDistance - (2 * ancestorDistance);

 			cb({
 				'exists': true,
 				'distance': result
 			});
 		}).catch((err) => {
 			return cb({
	 			'exists': false,
	 			'distance': -1
			});
 		});
 	}

	_nodeHeight = (root, node, height) => {
		if(root === null) return 0;
		if(root.data === node.data) return height;
		
		let level = _nodeHeight(root.left, node, height+1); //check if the node is present in the left sub tree

		if(level !== 0) return level;
	
		return _nodeHeight(root.right, node, height+1); //check if the node is present in the right sub tree
	}

	_find = (node, element) => {
		if(node.data === element) return node;
		if(element <= node.data){
			return _find(node.left, element);
		} else if(element > node.data){
			return _find(node.right, element);
		}
	}


	/*
		Pseudo-Algorithm
			1. Perform inorder traversal
			2. Perform postorder traversal
			3. Let A be the list of all elements between n1 and n2 in inorder traversal
			4. In the postorder traversal find which element in A comes last. That element is the lowest common ancestor

	*/
 	_lowestCommonAncestor = (n1, n2) => {
 		return new Promise((resolve, reject) => {
 			try{
		 		let inOrderAccumulator = [];
		 		let postOrderAccumulator = [];

		 		_inOrder(root, inOrderAccumulator);
		 		_postOrder(root, postOrderAccumulator);

		 		const inOrderIndexOne = inOrderAccumulator.indexOf(n1.data);
		 		const inOrderIndexTwo = inOrderAccumulator.indexOf(n2.data);

		 		if(inOrderIndexOne === -1 || inOrderIndexTwo === -1) return reject(true);

		 		const minIndex = Math.min(inOrderIndexOne, inOrderIndexTwo);
		 		const maxIndex = Math.max(inOrderIndexOne, inOrderIndexTwo + 1);

		 		let middleElements = inOrderAccumulator.slice(minIndex, maxIndex);

		 		let similarElements = postOrderAccumulator.filter((x) => {
		 			return middleElements.find((y) => {
		 				return x === y;
		 			});
		 		});

		 		let commonAncestor = similarElements.slice(-1);
		 		return resolve(commonAncestor[0]);
 			} catch(e){
 				return reject(true);
 			}
 		});	
 	};

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

	if (!Array.prototype.filter){
		/* Implementing Filter */
		Array.prototype.filter = function(fn){
			let results = [];

			this.forEach((item) => {
				if(fn(item)) results.push(item);
			});
			return results;
		};
	}

	return{
		insert,
		size,
		find,
		maxDepth,
		minValue,
		distanceBetween,
		print
	};
})();


const DEBUG = false;
if(DEBUG){
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

	const minValue = BinaryTree.minValue();
	console.log(`Min value is ${minValue}`);

	const n1 = {
		'data': 3
	};
	const n2 = {
		'data': 20
	};

	BinaryTree.distanceBetween(n1, n2, (result) => {
		if(result.exists) console.log(`The distance between ${n1.data} and ${n2.data} is ${result.distance}`);
		else console.info(`The path between ${n1.data} and ${n2.data} does not exist`);
	});
}


module.exports = BinaryTree;