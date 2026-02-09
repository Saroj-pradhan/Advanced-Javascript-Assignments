// Problem Description – Asynchronous Worker Pool
//
// You are required to create a worker pool that manages the execution
// of asynchronous tasks.
// The pool should ensure that no more than N tasks are running concurrently,
// while any additional tasks are queued.
// As tasks complete, queued tasks should start automatically.
// Each task must invoke its callback with its result when finished.


class CallbackPool {
 newLimit = 0; 
 active = 0;
 tasks = [];
  constructor(limit) {
this.newLimit = limit;
  }

  run(task, onComplete) {
   
 if(this.active < this.newLimit){
      this.active++;
      task((result) => {
  
      onComplete(result)

      this.active--
       this._next()
})
    }else{
      this.tasks.push({task , onComplete})
    }
    
   

  }

  _next() {
    while(this.active < this.newLimit && this.tasks.length !=0){
      const{ task,onComplete} = this.tasks.shift();

      this.run(task,onComplete);
      
    }
  }
}

module.exports = CallbackPool;
