const fs = require('fs'),
	filePath = 'metadata/graphConnections.txt';

const Queue = require('./Queue'),
	Stack = require("./Stack");

const Graph = (function(){
	const graph = {};
	const state = {};

	/*
		Creates a node to the graph only if it doesn't already exist
	*/
	function addNode(n){
		if(!graph[n]) return _createNode(n);
	}

	/*
		Creates a directed edge from n1 to n2
	*/
	function createConnection(n1, n2){
		if(!graph[n1]) _createNode(n1);
		if(!graph[n2]) _createNode(n2);
		_connect(n1, n2);
	}

	/*
		Pseudo Algorithm:
			create a queue Q
			mark v as visited and put v into Q
			while Q is non-empty
			remove the head u of Q
			mark and enqueue a
	*/
	function breadthFirstSearch(startingNode){
		_clearState();
		const path = [];
		Queue.init();
		Queue.add(startingNode);
		_setVisited(startingNode);

		while(Queue.size() !== 0){
			let element = Queue.remove();
			path.push(element);

			let connectedPaths = graph[element].connectedTo;

			for(let node of connectedPaths){
				let nodeName = node.name;
				if(_isVisited(nodeName)) continue;
				else _setVisited(nodeName);
				Queue.add(nodeName);
			}
		}
		console.log("Breadth First Search Path:");
		console.log(path.join(' -> '));
	}

	/*
		create a stack S
		mark v as visited and push v onto S
		while S is non-empty
		peek at the top u of S
		if u has an (unvisited)neighbour w,
		mark w and push it onto S
		else pop S
	*/
	function depthFirstSearch(startingNode){
		_clearState();
		const path = [];
		Stack.init();
		Stack.push(startingNode);
		_setVisited(startingNode);

		while(!Stack.empty()){
			let element = Stack.pop();
			path.push(element);

			let connectedPaths = graph[element].connectedTo;

			for(let node of connectedPaths){
				let nodeName = node.name;
				if(_isVisited(nodeName)) continue;
				else _setVisited(nodeName);
				Stack.push(nodeName);
			}
		}

		console.log("Depth First Search Path:");
		console.log(path.join(' -> '));
	}

	/*
		Determines whether or not a path exists from n1 to n2
	*/
	function pathExists(n1, n2){
		if(!contains(n1) || !contains(n1)) return false;
		else return graph[n1].connectedTo.has(graph[n2]);
	}

	/*
		Determines whether or not the graph contains the particular node
	*/
	function contains(node){
		if(!graph[node]) return false;
		else return true;
	}

	function _clearState(){
		for(let element in state){
			state[element].visited = false;
		}
	}

	/*
		Determines whether or not a node has been visited. Helper for BFS and DFS
	*/
	function _isVisited(m){
		return state[m].visited;
	}

	function _setVisited(m){
		state[m].visited = true;
	}

	/*
		Prints the graph in the following manner:
			- A is connected to B C
	*/
	function printGraph(){
		console.log("Graph: ");
		for(let element in graph){
			let house = graph[element];
			let houseName = house.name; 
			let connectedTo = house.connectedTo
			
			let arr = [];
			let keys = connectedTo.keys();
			for(let key of keys){
				arr.push(key.name)
			}
			console.log(`${houseName} is connected to ${arr.join(' ')}`);
		}
	}

	_connect = (n1, n2) => {
		graph[n1].connectedTo.add(graph[n2]);
	}

	_createNode = (n) => {
		let node = {
			'name': n,
			'connectedTo': new Set()
		};

		state[n] = {
			'name': n,
			'visited': false
		}

		graph[n] = node;
	};

	return{
		addNode,
		printGraph,
		pathExists,
		breadthFirstSearch,
		depthFirstSearch,
		contains,
		createConnection
	};
})();

/*
	Creating a graph based on the inputs.
		House A: House B, House C  	- 	means that House A is connected to House B and House C
*/
const GraphCreator = (function(){
	return{
		create: function(data){
			let lines = data.split('\n');
			lines.forEach((line) => {
				let houses = line.match(/House\s+(\w{1})/g);
				let firstHouse;
				houses.forEach((house, index) => {
					house = house.match(/House\s+(\w{1})/)[1];
					if(index === 0){
						firstHouse = house;
						return Graph.addNode(house);
					}
					Graph.createConnection(firstHouse, house);
				});
			});
			Graph.printGraph();
		}
	}

})();

const p1 = new Promise((resolve, reject) => {
	fs.readFile(filePath, 'utf-8', (err, data) => {
	    if (err) {
	    	reject(data);
	    } else {
	    	resolve(data);
	    }
	});
});

p1.then((data) => {
	GraphCreator.create(data);
	Graph.breadthFirstSearch("A"); // starting breadth first search from A
	Graph.depthFirstSearch("A"); // starting depth first search from A
}).catch((err) => {
	console.error(err);
});
