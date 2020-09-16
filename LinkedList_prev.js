const Node = require("./Node");

class LinkedList {
  constructor() {
    this.head = null;
  }

  addToHead(data) {
    const newHead = new Node(data);
    const currentHead = this.head;
    this.head = newHead;
    if (currentHead) {
      this.head.setNextNode(currentHead);
    }
  }

  addToTail(data) {
    let tail = this.head;
    if (!tail) {
      this.head = new Node(data);
    } else {
      while (tail.getNextNode() !== null) {
        tail = tail.getNextNode();
      }
      tail.setNextNode(new Node(data));
    }
  }

  removeHead() {
    const removedHead = this.head;
    if (!removedHead) {
      return;
    }
    this.head = removedHead.getNextNode();
    return removedHead.data;
  }

  removeNode(data) {
    var currentNode = this.head;
    var previousNode = currentNode;
    if (!currentNode) {
      return;
    }
    while (currentNode !== null) {
      if (currentNode.data === data) {
        if (previousNode === currentNode) {
          return this.removeHead();
        }
        previousNode.setNextNode(currentNode.getNextNode());
        // currentNode.setNextNode(null);
        return currentNode.data;
      }
      previousNode = currentNode;
      currentNode = currentNode.getNextNode();
    }
  }

  printList() {
    let currentNode = this.head;
    let output = "<head> ";
    while (currentNode !== null) {
      output += currentNode.data + " ";
      currentNode = currentNode.getNextNode();
    }
    output += "<tail>";
    console.log(output);
  }
}

module.exports = LinkedList;
