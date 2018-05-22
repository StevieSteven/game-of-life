import chai from 'chai';

const assert = chai.assert;

import Board from './Board';

let board = new Board({sizeX: 6, sizeY: 6});

console.log("Teste Spielfeldmaße: ");
assert.equal(board.getSizeX(), 6);
assert.equal(board.getSizeY(), 6);

console.log("Teste Nachbarschaftsberechnung: ");

let neighbor = board.getLeft(3,3);
assert.equal(neighbor.x, 2);
assert.equal(neighbor.y, 3);

neighbor = board.getRight(3,3);
assert.equal(neighbor.x, 4);
assert.equal(neighbor.y, 3);

neighbor = board.getTop(3,3);
assert.equal(neighbor.x, 3);
assert.equal(neighbor.y, 2);

neighbor = board.getBottom(3,3);
assert.equal(neighbor.x, 3);
assert.equal(neighbor.y, 4);

console.log("Grenzfälle testen");
neighbor = board.getLeft(0,0);
assert.equal(neighbor.x, 5);
assert.equal(neighbor.y, 0);

neighbor = board.getRight(5,5);
assert.equal(neighbor.x, 0);
assert.equal(neighbor.y, 5);

neighbor = board.getTop(0,0);
assert.equal(neighbor.x, 0);
assert.equal(neighbor.y, 5);


neighbor = board.getBottom(5,5);
assert.equal(neighbor.x, 5);
assert.equal(neighbor.y, 0);