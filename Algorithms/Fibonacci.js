/*
	Memoized Fibonnaci for Performance Upgrades

*/
function fibonacci(num, memo = {}) {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}

let result,
	num = 999;

console.log(`Finding the fibonacci of ${num}`);

console.time('Call 1');
result = fibonacci(num);
console.timeEnd('Call 1')

console.time('Memoized call');
result = fibonacci(num);
console.timeEnd('Memoized call')