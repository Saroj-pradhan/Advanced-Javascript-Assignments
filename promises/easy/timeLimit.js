// Problem Description – Time-Limited Async Function

// You are given an asynchronous function and a time limit t in milliseconds.
// Your task is to wrap this function so that it either resolves normally if it completes within the given time or rejects 
// with the message "Time Limit Exceeded" if execution takes longer than t.
 function timeLimit(fn, t) {
let timer = null;
return async function(...args){

    return new Promise(async (resolve,reject)=> {
timer = setTimeout(()=>{
 reject("Time Limit Exceeded");
},t);
try {
    const result = await fn(...args);

clearTimeout(timer);
resolve(result);

} catch (error) {
    
clearTimeout(timer);
    reject(error)
    
}

});

}


 }
module.exports = timeLimit;

