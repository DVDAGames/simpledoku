'use strict';

import { shuffle, tail, concat } from 'lodash';
import { cloneArray } from './utils';

const emptyValue = 0;
const minValue = 1;
const maxValue = 9;
const rowLength = 9;
const difficultyLevels = [
  'Easy',
  'Medium',
  'Advanced',
  'Expert'
];

const defaultFirstRow = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9
];

const defaultMatrixRow = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

export default class Puzzle {
  constructor(leaveNull = false, generateFirstRow = false) {
    this.leaveNull = leaveNull;
    this.generateFirstRow = generateFirstRow;
  }

  get difficultyLevels() {
    return difficultyLevels;
  }

  get puzzleMinValue() {
    return minValue;
  }

  get defaultFirstRow() {
    return defaultFirstRow;
  }

  get defaultMatrixRow() {
    return defaultMatrixRow;
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

  generateMatrix(val) {
    const matrix = [];

    for(let i = 0; i < this.puzzleRowLength; i++) {
      matrix.push([]);

      for(let j = 0; j < this.puzzleMaxValue; j++) {
        if(Array.isArray(val)) {
          if(val.length) {
            matrix[i].push(cloneArray(val));
          } else {
            matrix[i].push([]);
          }
        } else {
          matrix[i].push(val);
        }
      }
    }

    return matrix;
  }

  setDefaultHelpers(solutionHelper, puzzle) {
    puzzle.forEach((defaultCell, cellIndex, cellArray) => {
      let cell = {
        row: 0,
        col: cellIndex,
        val: defaultCell
      };

      solutionHelper.forEach((row, rowIndex, rowArray) => {
        row.forEach((column, columnIndex, columnArray) => {
          if(rowIndex === cell.row) {
            solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
          } else if(columnIndex === cell.col) {
            solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
          } else {
            if(cell.row > -1 && cell.row < 3 && rowIndex > -1 && rowIndex < 3) {
              if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              }
            } /*else if(cell.row > 2 && cell.row < 6 && rowIndex > 2 && rowIndex < 6) {
              if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              }
            } else if(cell.row > 5 && cell.row < 9 && rowIndex > 5 && rowIndex < 9) {
              if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(cell.val), 1);
              }
            }*/
          }
        });
      });
    });

    return solutionHelper;
  }

  generatePuzzle(matrix) {
    return concat([shuffle(this.defaultFirstRow)], tail(cloneArray(matrix)));
  }

  generateSolutionHelper(puzzle) {
    const helper = this.generateMatrix(this.defaultFirstRow);

    return this.setDefaultHelpers(helper, puzzle[0]);
  }

  generateConstraintMatrix(matrixValues, puzzle) {
    let matrix = this.generateMatrix(matrixValues);

    puzzle.forEach((row, rowIndex, rowArray) => {
      row.forEach((col, colIndex, colArray) => {
        if(col !== 0) {
          matrix[rowIndex][colIndex][col -1] = 1;
        }
      });
    });

    return matrix;
  }

  generatePuzzleMatrices() {
    const invalidValues = this.generateMatrix([]);
    const puzzle = this.generatePuzzle(this.generateMatrix(this.puzzleEmptyValue));
    const solutionHelper = this.generateSolutionHelper(puzzle);
    //const matrix = this.generateConstraintMatrix(this.defaultMatrixRow, puzzle);

    return {
      puzzle,
      //matrix,
      invalidValues,
      solutionHelper
    };
  }
}
