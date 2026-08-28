
const thread = require('thread');
console.log('thread',thread);
console.log('CurrentThreadName',thread.getCurrentThreadName());
thread.runOnUiThread(() => {
console.log('runOnUiThread',thread.getCurrentThreadName());
});
thread.runOnGameThread(() => {
console.log('runOnGameThread',thread.getCurrentThreadName());
});
