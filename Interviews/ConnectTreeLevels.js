/*
	Question: Connect all nodes on the same level. Make a new connection from left to right, called cousin.

	Example: Tree Built, with 10 being the root. Arrows denote cousin connections.

		Tree:
						10
				7				12	
			6		8				14
		5						13
	
		Solution:
						10 ->	null
				7		->		12	->	null
			6	->	8		->		14	->	null
		5			->			13	->	 null	

*/

const ConnectCousins = (function(){
	function connect(root){
		let queue = [];
		queue.push(root);
		queue.push(null);
		while(queue.length > 0){
			let node = queue.shift();
			if(node !== null){
				let element = queue.length > 0 ? queue[0] : null;
				_connectCousin.call(this, node, element);
				let lc = node.left;
				let rc = node.right;
				if(lc !== null) queue.push(lc);
				if(rc !== null) queue.push(rc);
			} else{
				let nextEle = queue.length > 0 ? queue[0] : null;
				if(nextEle !== null) queue.push(null);
			}
		}
	}

	function _connectCousin(node, nodeTwo){
		node.cousin = null;
		node.cousin = nodeTwo;
	}

	function printCousins(BinaryTree, root){
		let values = BinaryTree.print(2, false); 
		for(let value of values){
			let element = BinaryTree.find(value);
			let cousinsName = element.cousin && element.cousin.data ? element.cousin.data : null;
			console.log(`${element.data}'s cousin is ${cousinsName}`);
		}
		
	}

	return{
		connect,
		printCousins
	};
})();



const BinaryTree = require('./../BinaryTree.js');

const root = BinaryTree.insert(10);
BinaryTree.insert(7);
BinaryTree.insert(8);
BinaryTree.insert(6);
BinaryTree.insert(5);
BinaryTree.insert(12);
BinaryTree.insert(14);
BinaryTree.insert(13);

ConnectCousins.connect(root);
ConnectCousins.printCousins(BinaryTree, root);



