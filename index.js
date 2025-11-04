#!/usr/bin/env node

// console.log(window);
// console.log(process.argv);
// console.log("helloworld");

const note = process.argv[2];
const newNote = {
    content: note,
    id: Date.now()
}

console.log(newNote);