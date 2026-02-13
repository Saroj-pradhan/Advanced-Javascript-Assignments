// Problem Description – Custom Implementation of Promise.race

// You are required to implement your own version of Promise.race without using the built-in method. 
// The function should accept an iterable of values that may include Promises or plain values. 
// It must settle as soon as the first input settles, resolving or rejecting accordingly. 
// Using Promise.resolve ensures non-promise values are handled correctly.
function promiseRace(promises) {
    let len = promises.length;
   
   
    return new Promise((resolve,reject)=>{
         if(len == 0) {};
    for(let i=0;i< len ; i++){
        async function Run(){
         try {
            const result = await Promise.resolve(promises[i]);
            resolve(result);
        } catch (error) {
                reject(error);
        }
        }
        Run();
       
    }
    })
}

module.exports = promiseRace;

