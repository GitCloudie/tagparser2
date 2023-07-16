// const express = require('express')
import fs from 'fs';
import express from 'express';
const app = express()
import Zet from './lib/zet.js';

// Declarations
// import http from 'http';  

// Initialization
const port = 80;

async function mainHandler(request, response) {  
    console.log('Request:', request.url);
    let content = '';
    switch (request.url) {
        case '/index.html':
        case '/':
            content = fs.readFileSync('./pages/index.html');
            response.writeHead(200, { "Content-Type": 'text/html' });
            response.end(content, "utf-8");        
            break;
        default:
            content = 'Error';
            try {
                content = fs.readFileSync('.'+request.url);
            } catch (error) {
                console.error(error);
            }
            //response.writeHead(200, { "Content-Type": 'text/html' });
            response.end(content, "utf-8");     
            break;
    }
}
app.get('/*', mainHandler);
app.use(express.static('static'))
app.listen(port, () => {
    console.log(`Callosal HUB listening on port ${port}`)
});
// const g_Server = http.createServer(mainHandler).listen(g_Port);
// console.log('Server is running');


let a = new Zet(["A", "B", "C"]);
let b = new Zet(["C", "D", "E"]);
let c = new Zet(["B", "C", "D"]);

let r1 = Zet.union(a, b).dump();
// output(r);
//=> [Zet] {1, 2, 3, 4, 5}

let r2 = a.union(b, c).dump();
//=> [Zet] {1, 2, 3, 4, 5}

let r3 = a.intersection(b).dump();
//=> [Zet] {3}

let r4 = a.symmetricDifference(c).dump();
// r.dump();
//=> [Zet] {1, 4}

console.log('a subset of b? = ',a.subset(b));
//=> false

let r5_1 = a.filter(i => i % 2).dump();
let r5_2 = a.filter(i => i=="B").dump();
//=> [Zet] {1, 3}
// console.log(r);
console.log('r4 subset of r2? = ',r4.subset(r2));