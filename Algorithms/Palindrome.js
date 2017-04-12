function isPalindrome(str){
	str = str.replace(/\W/g, '').toLowerCase();
	let reverseString =  str.split('').reverse().join('');
	return (str == reverseString);
}

console.log(isPalindrome("level"));                   // logs 'true'
console.log(isPalindrome("levels"));                  // logs 'false'
console.log(isPalindrome("A car, a man, a maraca"));  // logs 'true'