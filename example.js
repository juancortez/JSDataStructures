/*
	Problem: Print any given integer vertically. For example, 5893 would be
		5
		8
		9
		3
*/
function printVertically(i){
	if(i === undefined || i === null){
		throw new Error("Must provide an input for the function");
		return;
	}

	if(typeof i !== "number"){
		throw new Error(`Expected, number, received ${typeof i}`);
		return;
	}

	let integerMax = Math.pow(2, 31);
	if(i > (integerMax - 1) || i < (-integerMax)) throw new Error(`${i} is out of bounds for an Int32.`);

	let solution = [];
	while(i > 0){
		solution.push(i % 10);
		i = parseInt(i / 10);
	}
	while(solution.length > 0){
		console.log(solution.pop());
	}

	/* Solution done with Regular Expression below */
	/* const matcher = (function(){
			return {
				execute(regex, input) {
				  return () => {
				    const match = regex.exec(input)
				    const lastIndex = regex.lastIndex
				    return { 
				    	lastIndex, 
				    	match 
				    };
				  }
				}
			}
		})();
		const regularExpression = new RegExp(/-?\d/, 'g'); // create a regular expression to match for each integer
		let matchExpression = matcher.execute(regularExpression, i); // execute the regular expression with the input parameter
		let number;

		while((number = matchExpression().match) !== null){
			// keep checking for matches in the regular expression
			let integerMatch = number && number.length && number.length > 0 ? number[0] : "";
			if(!!integerMatch) console.log(integerMatch);
		}
	*/
}

let num = 89209212;
console.log(`Printing ${num} vertically:`);
printVertically(num);