/* 
	Driven by Cracking the Code Problems
*/

function ChapterOne(){}

/*
1.1 Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?
*/
ChapterOne.prototype.one = function(args){
	args.forEach((string) => {
		let chars = {},
			allUnique = true;
		string = string.replace(/\s/g, '');

		for(let i of string){
			if(chars[i]){
				allUnique = false;
				break;
			} else{
				chars[i] = true;	
			} 
		}
		if(allUnique) console.log(`${string} has all unique characters.`);
		else console.log(`${string} does not have all unique characters.`);
	});
};

/*
1.2 Write code to reverse a C-Style String. (C-String means that “abcd” is represented as  ve characters, including the null character.)
*/
ChapterOne.prototype.two = function(str){
	if(str === "") return "";
	else return this.two(str.substr(1)) + str.charAt(0);
};

let chapterOne = new ChapterOne;

chapterOne.one([
	'unique',
	'together',
	'uncopyrightable'
]);

let reversedString = chapterOne.two("together");
console.log(`together reversed is ${reversedString}`);