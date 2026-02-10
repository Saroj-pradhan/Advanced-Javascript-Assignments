// Problem Description – Async Initialization Gate
//
// You are required to design a mechanism for APIs that depend on an
// asynchronous initialization step.
// Any calls made before initialization completes should be queued and
// executed only after the initialization finishes.
// Calls made after initialization should execute immediately.
//
// The initialization task and API functions must invoke callbacks when
// they complete.
class GuardedAPI {
  constructor() {
    this.queue = [];
    this.initComplete = false;
  }

  init(initTask) {
initTask(()=>{
  this.initComplete = true;
  this._flush();
})
  }

  call(apiFn, onComplete) {
    if( this.initComplete){
      apiFn((err,result)=>{
        onComplete(err,result);
      })
    }else{
      this.queue.push({apiFn,onComplete});
    }
  }

  _flush() {
    while(this.queue.length>0 && this.initComplete){
      let item = this.queue.shift();
      item.apiFn((err,result)=>{
      item.onComplete(err,result);
      })
    }
  }
}

module.exports = GuardedAPI;

