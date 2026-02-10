// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

// function runWithDependencies(tasks, finalCallback) {
//     let err = false;
//     tasks.forEach((e)=>{
//  if(e.deps.length>0){

//  }else{
//     e.id((err,result)=>{
// if(err){
//     err=true;
// }
//     });
//  }
//     })
// }

// module.exports = runWithDependencies;
function runWithDependencies(tasks, finalCallback) {
  const completed = new Set();
  const running = new Set();
  const results = {};
  let finished = false;

  function tryRun() {
    if (finished) return;

    // all tasks completed
    if (completed.size === tasks.length) {
      finished = true;
      return finalCallback(null, results);
    }

    for (const task of tasks) {
      if (completed.has(task.id) || running.has(task.id)) continue;

      const canRun = task.deps.every(dep => completed.has(dep));
      if (!canRun) continue;

      running.add(task.id);

      task.run((err, result) => {
        if (finished) return;

        if (err) {
          finished = true;
          return finalCallback(err);
        }

        results[task.id] = result;
        running.delete(task.id);
        completed.add(task.id);

        tryRun();
      });
    }
  }

  tryRun();
}

module.exports = runWithDependencies;
