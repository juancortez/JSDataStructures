/*
	Given a number n, print all primes smaller than or equal to n.
*/
function Sieve(){}

Sieve.prototype.calculate = function(n) {
	this._values = this._values || {};
	if(this._values[n]) return this._printPrimes.call(this, n);
	else this._init.call(this, n);

	for(let num = 2; num * num <= n; num++){
		if(this._values[num]){
			for(let i = num * 2; i <= n; i += num){
				this._values[i] = false;
			}
		}
	}
	this._printPrimes(n);
};

Sieve.prototype._init = function(n){
	for(let i = 2; i < n; i++){
		this._values[i] = true;
	}
}

Sieve.prototype._printPrimes = function(n){
	this._primes = [];
	
	for(let potentialPrime in this._values){
		if(this._values[potentialPrime] && n >= potentialPrime) this._primes.push(potentialPrime);
	}
	console.log(`Primes smaller than ${n}:\n${this._primes.join(' ')}`);
}

let primes = new Sieve();
primes.calculate(120);
primes.calculate(7);
primes.calculate(24);