/* https://www.toptal.com/javascript/interview-questions */

/* Prototype
	- Every JavaScript function has a prototype function
	- Used primarily for inheritance; you can add methods and properties
	- An object's prototype attribute points to the object's "parent" - the object it inherited its properties from
	- Prototype is important in JavaScript because JavaScript does not have classical inheritance based on Classes, and
		therefore, all inheritance in JavaScript is made possible through the prototype property.
*/
const Prototype = (function(){
	function execute(){
		function Plant(){
			this.country = "Mexico";
			this.isOrganic = true;
		}

		Plant.prototype.showNameAndColor = function(){
			console.log("I am a " + this.name + " and my color is " + this.color);
		}


		Plant.prototype.amIOrganic = function () {
			if (this.isOrganic) console.log("I am organic, Baby!");
		}

		function Fruit(fruitName, fruitColor){
			this.name = fruitName;
			this.color = fruitColor;
		}

		// inherits all of Plant.prototype methods and properties
		Fruit.prototype = new Plant();

		var aBanana = new Fruit("Banana", "Yellow");

		aBanana.showNameAndColor();
	}

	return{
		execute
	}
})();

// Prototype.execute();

/* Closure
	- A closure is an inner function that has access to the outer (enclosing) function's variables - scope chain
	- Closure has three scope chains: 
		1) it's own scope (variables defined between it's curly brackets)
		2) the outer function's variables
		3) global variables

*/
const Closure = (function(){
	return{
		execute: function(){
			function showName(firstName, lastName){
			var nameIntro = "Your name is ";

			function makeFullName(){
				return nameIntro + firstName + " " + lastName;
			}

			return makeFullName();
		}

		var name = showName("Michael", "JavaScript");
		console.log(name);
		console.log();


		function celebrityName(firstName){
			var nameIntro = "This celebrity is ";

			function lastName(theLastname){
				return nameIntro + firstName + " " + theLastname;
			}

			return lastName;
		};

		var mjName = celebrityName("Michael");
		var result = mjName("Jackson");

		console.log(result);
		console.log();

		function celebrityID(){
			var celebrityID = 999;

			return{
				getID: function(){
					return celebrityID;
				},
				setID: function(theNewID){
					celebrityID = theNewID;
				}
			}
		}

		var mjID = celebrityID();
		console.log(mjID.getID());
		mjID.setID(567);
		console.log(mjID.getID());
		console.log();

		// the closure has access to the outer function's variables by reference, not by value
		function celebrityIDCreator(theCelebrities){
			var i;
			var uniqueID = 100;

			for(i = 0; i < theCelebrities.length; i++){
				theCelebrities[i]["id"] = function(j){ // the j parametric variable is the i passed in on invocation
					return function(){
						return uniqueID + j;
					}();
				}(i); // immediately invoke the function passing the i variable as a paramter
			}

			return theCelebrities;
		}

		var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

		var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

		var stalloneID = createIdForActionCelebs[0];
		console.log(stalloneID.id); // 103
		}
	}
})();


// (function(){
// 	var a = b = 3;
// })();

// console.log("a defined? " + (typeof a !== 'undefined'));
// console.log("b defined? " + (typeof b !== 'undefined'));

// var myObject = {
//     foo: "bar",
//     func: function() {
//         var self = this;
//         console.log("outer func:  this.foo = " + this.foo);
//         console.log("outer func:  self.foo = " + self.foo);
//         (function() {
//             console.log("inner func:  this.foo = " + this.foo);
//             console.log("inner func:  self.foo = " + self.foo);
//         }());
//     }
// };
// myObject.func();
























