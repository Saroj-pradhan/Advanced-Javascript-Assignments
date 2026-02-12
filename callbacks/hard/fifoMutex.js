// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.
class Mutex {
  constructor() {
    this.queue = [];
    this.active = false;
  }

  lock(task, onComplete) {
   
this.queue.push({task,onComplete});
if(!this.active){
this.RunTask();
}
  }
RunTask(){
 if(this.queue.length>0 && !this.active){

this.active = true;
let run = this.queue.shift();
run.task((err,result)=>{
run.onComplete(err,result);
this._release();
})
    }
}
  _release() {
    this.active = false;
   this.RunTask();
  }
}

module.exports = Mutex;
