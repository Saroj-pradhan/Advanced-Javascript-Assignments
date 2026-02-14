// Problem Description – Sum of Two Promises

// You are given two Promises that each resolve to numeric values. 
// Your task is to return a new Promise that resolves to the sum of these two numbers. 
// Both Promises should be executed in parallel using Promise.all to avoid unnecessary waiting.
async function sumPromises(p1, p2) {
    
     let ans = await Promise.all([p1,p2])
        let sum = ans[0]+ans[1];
       return sum;

}

module.exports = sumPromises;

