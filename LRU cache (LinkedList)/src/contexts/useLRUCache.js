import { useRef } from "react";

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LRU {
  #capacity;
  #head = null;
  #tail = null;
  #cache = {};
  constructor(capacity) {
    this.#capacity = capacity;
  }

  get(key) {
    if (Object.keys(this.#cache).includes(String(key))) {
      this.#moveToRight(key);
      return this.#cache[key].value;
    }
    return null;
  }

  put(key, value) {
    // check if it is inserted at first time.
    if (!this.#head && !Object.keys(this.#cache).length) {
      const newNode = new Node(key, value);
      this.#head = newNode;
      this.#tail = newNode;
      this.#cache[key] = newNode;
      return;
    }

    // chec if size is full
    if (Object.keys(this.#cache).length >= this.#capacity) {
      this.#deleteLast();
    }
    // put at head.
    const newNode = new Node(key, value);
    newNode.next = this.#head;
    this.#head = newNode;
    this.#cache[key] = newNode;
  }

  #deleteLast() {
    let temp = this.#head;
    while (temp && temp.next !== this.#tail) {
      temp = temp.next;
    }
    temp.next = null;
    delete this.#cache[this.#tail.key];
    this.#tail = temp;
  }

  #moveToRight(key) {
    // if there is only one node don't move.
    if (!this.#head.next) {
      return;
    }
    const node = this.#cache[key];
    if (node === this.#head) return;

    let temp = this.#head;

    while (temp && temp.next !== node) {
      temp = temp.next;
    }

    temp.next = node.next;
    if (node === this.#tail) {
      this.#tail = temp;
    }
    node.next = this.#head;
    this.#head = node;
  }
}

function useLRUCache(capacity) {
  const cacheRef = useRef(new LRU(capacity));
  return {
    get: (key) => cacheRef.current.get(key),
    put: (key, value) => cacheRef.current.put(key, value),
  };
}

export default useLRUCache;
