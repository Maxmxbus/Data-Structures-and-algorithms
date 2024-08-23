const Node = require('./node.js');

class LinkedList {
    constructor() {
        this.headNode = null; // Start with an empty list
    }

    // Append a new node to the end of the list
    append(value) {
        const newNode = new Node(value);
        if (this.headNode === null) {
            this.headNode = newNode; // If the list is empty, set the head to the new node
        } else {
            let current = this.headNode;
            while (current.nextNode !== null) {
                current = current.nextNode; // Traverse to the end of the list
            }
            current.nextNode = newNode; // Add the new node at the end
        }
    }

    // Prepend a new node to the start of the list
    prepend(value) {
        const newNode = new Node(value, this.headNode);
        this.headNode = newNode; // Set the new node as the head
    }

    // Return the total number of nodes in the list
    size() {
        let count = 0;
        let current = this.headNode;
        while (current !== null) {
            count++;
            current = current.nextNode;
        }
        return count;
    }

    // Return the first node in the list
    head() {
        return this.headNode;
    }

    // Return the last node in the list
    tail() {
        let current = this.headNode;
        while (current && current.nextNode !== null) {
            current = current.nextNode;
        }
        return current;
    }

    // Return the node at the given index
    at(index) {
        let current = this.headNode;
        let count = 0;
        while (current !== null) {
            if (count === index) return current;
            count++;
            current = current.nextNode;
        }
        return null; // If index is out of bounds
    }

    // Remove the last element from the list
    pop() {
        if (this.headNode === null) return null;

        if (this.headNode.nextNode === null) {
            this.headNode = null; // If there's only one node, remove it
            return;
        }

        let current = this.headNode;
        while (current.nextNode.nextNode !== null) {
            current = current.nextNode;
        }
        current.nextNode = null; // Remove the last node
    }

    // Check if the list contains a value
    contains(value) {
        let current = this.headNode;
        while (current !== null) {
            if (current.value === value) return true;
            current = current.nextNode;
        }
        return false;
    }

    // Return the index of the node containing value, or null if not found
    find(value) {
        let current = this.headNode;
        let index = 0;
        while (current !== null) {
            if (current.value === value) return index;
            index++;
            current = current.nextNode;
        }
        return null;
    }

    // Represent the LinkedList objects as strings
    toString() {
        let result = '';
        let current = this.headNode;
        while (current !== null) {
            result += `( ${current.value} ) -> `;
            current = current.nextNode;
        }
        result += 'null';
        return result;
    }

    // Insert a new node with the provided value at the given index
    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }

        const previous = this.at(index - 1);
        if (previous === null) return; // Index out of bounds

        const newNode = new Node(value, previous.nextNode);
        previous.nextNode = newNode;
    }

    // Remove the node at the given index
    removeAt(index) {
        if (index === 0) {
            this.headNode = this.headNode.nextNode;
            return;
        }

        const previous = this.at(index - 1);
        if (previous === null || previous.nextNode === null) return; // Index out of bounds

        previous.nextNode = previous.nextNode.nextNode;
    }
}

module.exports = LinkedList;