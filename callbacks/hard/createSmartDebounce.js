// Problem Description – Debounced Search with Result Guard
//
// You are building a search bar that should not call the API
// on every keystroke, so the request must be debounced.
//
// If an older request finishes after a newer one, its result
// must be ignored to prevent stale UI updates.
//
// Requirements:
// - Delay execution by waitMs.
// - Reset the timer on repeated calls.
// - Only the latest request may trigger the callback.

function createSmartDebounce(worker, waitMs) {
    let timer =null;
    let lastrequestId = 0;
return function(...args){
    if(timer){
        clearTimeout(timer)
    }
let cb = args.pop();
lastrequestId ++;
let requestId = lastrequestId ;
 timer = setTimeout(()=>{
    if(requestId !== lastrequestId) return;
    worker(...args,(err,result)=>{
cb(err,result);
    })
},waitMs)
}
}

module.exports = createSmartDebounce;


