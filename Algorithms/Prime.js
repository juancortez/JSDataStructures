/*
	Determines whether or not a provided number is a prime or not
*/
function isPrime(num){
	if(num < 2) return false;
	for(let i = 2; i < num; i++){
		if(num % i == 0){
			return false;
		}
	}
	return true;
}


/*
	Storing a cache of values in property values. We check
	to see if we've already created it, and do so if not.
*/
Function.prototype.memoized = function(key){
	this._values = this._values || {};
	/*
		When we get called with a key, we check to see if we have a cached
		value for it. If so, we return it. If not, we call the function
		and store its value for next time.
	*/
	return this._values[key] !== undefined ?
		this._values[key] :
		this._values[key] = this.apply(this, arguments);
}


let a = 65531;
isPrime.memoized(a); // computes isPrime the first time
isPrime.memoized(a); // returns from cache the second time