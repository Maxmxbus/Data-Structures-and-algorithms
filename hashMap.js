const LinkedList = require('./linkedList.js');
const Node = require('./node.js');

class HashMap {
    constructor(tableSize = 16) {
        this.tableSize = tableSize;
        this.hashTable = new Array(this.tableSize).fill(null);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.tableSize;
        }
        return hashCode;
    }

    set(key, value) {
        const hashed = this.hash(key);
        if (hashed < 0 || hashed >= this.hashTable.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.hashTable[hashed]) {
            // If the bucket is empty, create a new LinkedList
            this.hashTable[hashed] = new LinkedList();
        }

        const linkedList = this.hashTable[hashed];
        let current = linkedList.head();

        // Check if key exists and update its value
        while (current !== null) {
            if (current.value[0] === key) {
                current.value[1] = value;
                return;
            }
            current = current.nextNode;
        }

        // If the key does not exist, append a new node
        linkedList.append([key, value]);
    }

    get(key) {
        const hashed = this.hash(key);
        const linkedList = this.hashTable[hashed];

        if (!linkedList) return null;

        let current = linkedList.head();
        while (current !== null) {
            if (current.value[0] === key) {
                return current.value[1];
            }
            current = current.nextNode;
        }

        return null; // Key not found
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const hashed = this.hash(key);
        const linkedList = this.hashTable[hashed];

        if (!linkedList) return false;

        let current = linkedList.head();
        let index = 0;

        while (current !== null) {
            if (current.value[0] === key) {
                linkedList.removeAt(index);
                return true;
            }
            current = current.nextNode;
            index++;
        }

        return false; // Key not found
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.hashTable.length; i++) {
            const linkedList = this.hashTable[i];
            if (linkedList) {
                count += linkedList.size();
            }
        }
        return count;
    }

    clear() {
        this.hashTable = new Array(this.tableSize).fill(null);
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.hashTable.length; i++) {
            const linkedList = this.hashTable[i];
            if (linkedList) {
                let current = linkedList.head();
                while (current !== null) {
                    keys.push(current.value[0]);
                    current = current.nextNode;
                }
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let i = 0; i < this.hashTable.length; i++) {
            const linkedList = this.hashTable[i];
            if (linkedList) {
                let current = linkedList.head();
                while (current !== null) {
                    values.push(current.value[1]);
                    current = current.nextNode;
                }
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (let i = 0; i < this.hashTable.length; i++) {
            const linkedList = this.hashTable[i];
            if (linkedList) {
                let current = linkedList.head();
                while (current !== null) {
                    entries.push(current.value);
                    current = current.nextNode;
                }
            }
        }
        return entries;
    }
}

module.exports = HashMap;
