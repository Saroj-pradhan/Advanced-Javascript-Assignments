// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.
class Scheduler {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  schedule(task, priority = 0) {
    this.queue.push({ task, priority });
  }

  run(onAllFinished) {
    // sort: higher priority first
    this.queue.sort((a, b) => b.priority - a.priority);

    this.running = true;

    const runNext = () => {
      if(this.queue.length > 0){
        let run = this.queue.shift();
        run.task((err)=>{
          if(err){
          run.onAllFinished(err);
          }
          runNext();
        });
      }else{
          this.running = false;
        onAllFinished(null);
        return;
      }
    }
    runNext();
  }
}

module.exports = Scheduler;


