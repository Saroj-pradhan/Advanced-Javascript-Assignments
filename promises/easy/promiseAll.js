// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method. 
// The function should accept an array of values that may include Promises or plain constants. 
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.
 function promiseAll(promises) {
    let error = false;
    let results=[];
    let counter = 0;
    return new Promise((resolve,reject)=>{
        if(promises.length == 0) return resolve([]);
        if(!Array.isArray(promises))  return reject(new TypeError("not an array"));

         for(let i=0;i<promises.length;i++){
    async function Run(){
        try {
           let result = await Promise.resolve(promises[i])
             results[i] = result;
            
            counter++;
         if(counter == promises.length) resolve(results);
        } catch (err) {
            reject(err);
        }
    }
    Run();

    }
 
})
}

module.exports = promiseAll;
