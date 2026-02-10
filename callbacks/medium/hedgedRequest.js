// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
    let primaryRun = true;
    let answer = false;
    const timer = setTimeout(()=>{
  if(primaryRun){
    secondary((err,result)=>{
if(!answer ){
    answer = true;
    onComplete(err,result);
}
    })
  }
    },timeoutMs)


    primary((err,result)=>{
       
if(!answer && !err){
     primaryRun = false;
    answer = true;
    clearTimeout(timer);
    onComplete(err,result);
}
    })
}

module.exports = hedgedRequest;
