'use strict';

const emptyValue = 0;
const minValue = 1;
const maxValue = 9;
const rowLength = 9;

export default class Puzzle {
  constructor(leaveNull = false) {
    this.leaveNull = leaveNull;
  }

  get puzzleMinValue() {
    return minValue;
  }

  get puzzleMaxValue() {
    return maxValue;
  }

  get puzzleEmptyValue() {
    return emptyValue;
  }

  get puzzleRowLength() {
    return rowLength;
  }

  generatePuzzle() {
    let puzzle = [];

    for(let i = 0; i < this.puzzleMaxValue; i++) {
      let row = [];

      if(!this.leaveNull) {
        for(let j = 0; j < this.puzzleMaxValue; j++) {
          row.push(this.puzzleEmptyValue);
        }
      }

      puzzle.push(row);
    }

    return puzzle;
  }
}
