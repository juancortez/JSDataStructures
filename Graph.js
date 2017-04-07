const fs = require('fs'),
	filePath = 'metadata/graphConnections.txt';

const Queue = require('./Queue'),
	Stack = require("./Stack");

const Graph = (function(){
	const graph = {};

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

	function breadthFirstSearch(){
		Queue.init();
	}

	/*
		Determines whether or not a path exists from n1 to n2
	*/
	function pathExists(n1, n2){
		if(!graph[n1] || !graph[n2]) return false;
		else return graph[n1].connectedTo.has(graph[n2]);
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
		graph[n] = node;
	};

	return{
		addNode,
		printGraph,
		pathExists,
		breadthFirstSearch,
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
	Graph.breadthFirstSearch();
}).catch((err) => {
	console.error(err);
});
