// LEVEL 1
//
// The exercise here is to write a simple Promise library. This requires strong
// front-end data structure knowledge. Promises are one of the core data structures
// used on the web. Level 1 is simple and does not handle .then returning a new promise.
//
// Requirement:
//    const promise = new JuansPromise(resolve => setTimeout(() => resolve(5), 1000));
//    promise.then(val => console.log(val));
//
// The code should log the number 5 after one second.
//
// console.log('start');
// promise
//   .then(val => console.log(val))
// console.log('stop');
// Should output: start, stop, 5
//
// Follow Up Question:
//  Chain .then() calls and log the return of the previous then's

function JuansPromise(fn){
  this.functions = []; // queues
  this.functionResults = [];
  
  
   fn((resolved, rejected) => {
     
      try{
        
       while(this.functions.length > 0){
         let previousResult = this.functionResults.shift(); // if there was a previous .then()
         if(previousResult){
           resolved = previousResult;
         }
         
         let currentFunction = this.functions.shift();
         let result = currentFunction(resolved); // call the function with parameter
         this.functionResults.push(result);
       }
      } catch(e){
        console.error(e);
      }
   });
}

JuansPromise.prototype.then = function(fn) {
  this.functions.push(fn);
  return this;
};

const promise = new JuansPromise(function(resolve) {
  setTimeout(() => resolve(5), 1000)
});


console.log('start');
promise
  .then(val => {
    console.log(val);
    return 10;
  })
  .then(val => console.log(val));
console.log('stop');

