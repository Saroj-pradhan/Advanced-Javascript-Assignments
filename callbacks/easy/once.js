// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) {
  let cbArr = [];
let result;
let error ;
let onceCall = false;
return function(...arg){
let callback = arg.pop();
if(onceCall && ( result!=undefined || error!= undefined)){
return callback(error , result);
}

cbArr.push(callback);

if(onceCall) return;

onceCall=true;

fn(...arg , (err,data)=>{
if(data) result = data;
if(err) error=err;

cbArr.forEach(cb=> cb(error, result))
cbArr=[];
})
}
}

module.exports = once;

// function once(fn) {
//   let called = false;
//   let result;
//   let error;
//   let callbacks = [];

//   return function (...args) {
//     const callback = args.pop();

//     // If already completed, return cached result immediately
//     if (called && (result !== undefined || error !== undefined)) {
//       return callback(error, result);
//     }

//     // Queue callbacks if first call is still running
//     callbacks.push(callback);

//     // If fn already started, don't start again
//     if (called) return;

//     called = true;

//     fn(...args, (err, data) => {
//       error = err;
//       result = data;

//       // Call all queued callbacks
//       callbacks.forEach(cb => cb(error, result));
//       callbacks = [];
//     });
//   };
// }

// module.exports = once;
