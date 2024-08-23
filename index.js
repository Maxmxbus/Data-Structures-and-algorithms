const HashMap = require('./hashMap.js');

const test = new HashMap();

test.set('apple', 'red');
test.set('box', 'magenta');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('dad', 'dark-orange');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

console.log(test.get('apple')); // Output: red
console.log(test.get('moon')); // Output: silver
console.log(test.entries());   // Check all entries
