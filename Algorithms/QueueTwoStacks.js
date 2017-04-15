/*
    Question: Build a Queue using 2 stacks
*/

const Queue = (function(){
    
    function init(){
        this.stackOne = [];
        this.stackTwo = [];
    }
    
    // we add to the "back" of the line
    // @param {number} adds to the queue
    function enqueue(item){
        if(this.stackOne.length === 0){
            this.stackOne.push(item);
            return this.stackOne;
        } else{
            _swap.call(this, item);
        }
    }
    
    function _swap(item){
        this.stackTwo = []; // empty out stack 2, since it is our "temp" holder to swap        
        
        let sizeStackOne = this.stackOne.length;
        for(let i = 0; i < sizeStackOne; i++){
            this.stackTwo.push(this.stackOne.pop());
        }

        this.stackTwo.push(item);
        
        this.stackOne = []; // empty out stack 1
        
        let sizeStackTwo = this.stackTwo.length;
        for(let i = 0; i < sizeStackTwo; i++){
            this.stackOne.push(this.stackTwo.pop());
        }
    }

    /* we remove the "head" of the line
     @output {number}   returns the head if and only if it exists
                        return null if stack is empty
    */                        
        
    function dequeue(){
        if(this.stackOne.length <= 0){
            console.error("Sorry, there are no elements to return");
            return null;
        }
        
        return this.stackOne.pop();
    }
    
    function size(){
        return this.stackOne.length;
    }
    
    return{
        init,
        enqueue,
        dequeue,
        size
    }
})();


Queue.init();
Queue.enqueue(0);
Queue.enqueue(1);
Queue.enqueue(2);
Queue.enqueue(3);
Queue.enqueue(9);
Queue.enqueue(912);

let queueSize = Queue.size();
for(let i = 0; i < queueSize; i++){
    let returnedElement = Queue.dequeue();
    console.log(returnedElement);
}


