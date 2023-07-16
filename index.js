import Zet from './lib/zet.js';

// Declarations
import http from 'http';
import fs from 'fs';

// Initialization
const g_Port = 80;

async function mainHandler(request, response) {
    response.writeHead(200, { "Content-Type": 'text/html' });
    response.end('<h1>Hello World</h1>', "utf-8");
}

const g_Server = http.createServer(mainHandler).listen(g_Port);
console.log('Server is running');


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