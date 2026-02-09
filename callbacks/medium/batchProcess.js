// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
     const results = new Array(items.length);
    let NoofActive  = 0;
    let completed = 0;
    let finished = false;
    let index =0;
    function RunNext(){
   if(finished) return;
   if (completed === items.length) {
            finished = true;
            return onComplete(null, results);
        }
  
   while(index < items.length && NoofActive<limit){
     let item = items[index];
     let currentIndex = index;
     NoofActive++;
    index++;
    worker(item,(err,result)=>{
        if(err){
            finished = true;
           return onComplete(err);
        }
         results[currentIndex] = result;
         NoofActive--;
         completed++;
         RunNext();
    })
   }
    }
    RunNext();
}

module.exports = batchProcess;
