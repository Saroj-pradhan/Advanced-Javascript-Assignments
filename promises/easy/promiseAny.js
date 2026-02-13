// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
    let countError = 0;
    let len = promises.length;
    let errors =new Array(len);
   
    return new Promise((resolve,reject)=>{
         if(len == 0) return reject(new Error("Empty iterable"));
    for(let i=0;i< len ; i++){
        async function Run(){
         try {
            const result = await Promise.resolve(promises[i]);
            resolve(result);
        } catch (error) {
            countError++;
            errors[i] = error;
            if(len == countError){
                reject(new Error("All promises were rejected"));
            }
        }
        }
        Run();
       
    }
    })
}

module.exports = promiseAny;
