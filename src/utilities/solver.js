'use strict';

import _ from 'lodash';

import Puzzle from './puzzle';

import { cloneArray } from './utils';

export default class Solver {
  constructor(cells = []) {
    this.puzzler = new Puzzle(true);

    this.lastSolution = [];

    this.matrix = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    this.cells = {
      grids: this.createGridArrays(cells),
      columns: this.createColumnArrays(cells),
      rows: cells
    };
  }

  checkSolution() {
    const validLengths = this.checkArrayLengths();

    const noDuplicates = this.checkForDuplicates();

    const validValues = this.checkForValidValues();

    return (validLengths && noDuplicates && validValues);
  }

  chooseNextCell(puzzle) {
    let row, col;

    puzzle.forEach((rowValues, rowIndex, rowArray) => {
      rowValues.forEach((colValue, colIndex, colArray) => {
        if(colValue === 0) {
          row = rowIndex;
          col = colIndex;
        }
      });
    });

    return {
      row,
      col
    };
  }

  chooseRandomCell(puzzle) {
    let row;
    let col;

    row = _.random(this.puzzler.puzzleMinValue - 1, this.puzzler.puzzleMaxValue - 1);

    while(puzzle[row].indexOf(0) === -1) {
      row = _.random(this.puzzler.puzzleMinValue - 1, this.puzzler.puzzleMaxValue - 1);
    }

    col = _.random(this.puzzler.puzzleMinValue - 1, this.puzzler.puzzleMaxValue - 1);

    while(puzzle[row][col] !== 0) {
      col = _.random(this.puzzler.puzzleMinValue - 1, this.puzzler.puzzleMaxValue - 1);
    }

    return {
      row,
      col
    }
  }

  chooseRandomValueForCell(cell, puzzle, solutionHelper, invalidValues) {
    let safe = false;
    let value = false;

    const helperCell = solutionHelper[cell.row][cell.col];

    const invalidCell = invalidValues[cell.row][cell.col];

    if(helperCell.length) {
      if(helperCell.length === 1) {
        value = helperCell[0];
      } else {
        value = helperCell[_.random(0, helperCell.length - 1)];
      }

      if(invalidCell.length && invalidCell.indexOf(value) !== -1) {
        while(invalidCell.indexOf(value) !== -1 || valueChecks < maxValueChecks) {
          value = helperCell[_.random(0, helperCell.length - 1)];
        }
      }

      if(value) {
        safe = true;

        this.lastSolution.push({
          row: cell.row,
          col: cell.col,
          val: value
        });

        solutionHelper.forEach((row, rowIndex, rowArray) => {
          row.forEach((column, columnIndex, columnArray) => {
            if(column.indexOf(value) !== -1) {
              if(rowIndex === cell.row) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
              } else if(columnIndex === cell.col) {
                solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
              } else {
                if(cell.row > -1 && cell.row < 3 && rowIndex > -1 && rowIndex < 3) {
                  if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  }
                } else if(cell.row > 2 && cell.row < 6 && rowIndex > 2 && rowIndex < 6) {
                  if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  }
                } else if(cell.row > 5 && cell.row < 9 && rowIndex > 5 && rowIndex < 9) {
                  if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
                    solutionHelper[rowIndex][columnIndex].splice(column.indexOf(value), 1);
                  }
                }
              }
            }
          });
        });
      } else {
        const lastIndex = this.lastSolution.length - 1;

        const { row, col, val } = this.lastSolution[lastIndex];

        invalidValues[row][col].push(val);
      }
    } else {
      const lastIndex = this.lastSolution.length - 1;

      const { row, col, val } = this.lastSolution[lastIndex];

      invalidValues[row][col].push(val);
    }

    return {
      value,
      solutionHelper,
      invalidValues,
      safe
    };
  }

  createSolution() {
    const puzzleBuilder = new Puzzle(false, true);

    const { puzzle, invalidValues, matrix, solutionHelper} = puzzleBuilder.generatePuzzleMatrices();

    let fullPuzzle = this.solvePuzzleTrampoline(() => {
      const test = this.solvePuzzle(puzzle, solutionHelper, invalidValues, matrix);

      return test;
    });

    return fullPuzzle;
  }

  solvePuzzleTrampoline(fn) {
    while(fn && typeof fn === 'function') {
      fn = fn();
    }

    return fn;
  }

  solvePuzzle(puzzle, solutionHelper, invalidValues, matrix, passes = 0) {
    console.log('pass #', passes);
    passes++;

    if(passes < 200) {
      passes++;

      const cell = this.chooseNextCell(puzzle);

      if(typeof cell.row !== 'undefined' && typeof cell.col !== 'undefined') {
        const calculate = this.chooseRandomValueForCell(cell, puzzle, solutionHelper, invalidValues);

        if(calculate.safe) {
          puzzle[cell.row][cell.col] = calculate.value;

          solutionHelper = calculate.solutionHelper;
        } else {
          const backtrack = this.revertLastSolutionValue(calculate.solutionHelper);

          solutionHelper = backtrack.solutionHelper;
        }

        return this.solvePuzzle(puzzle, solutionHelper, calculate.invalidValues, matrix, passes);
      } else {
        const backtrack = this.revertLastSolutionValue(solutionHelper);

        solutionHelper = backtrack.solutionHelper;

        return this.solvePuzzle(puzzle, solutionHelper, invalidValues, matrix, passes);
      }
    }

    return puzzle;
  }

  revertLastSolutionValue(solutionHelper) {
    const lastIndex = this.lastSolution.length - 1;

    const cell = this.lastSolution.pop();

    console.log(cell);

    solutionHelper.forEach((row, rowIndex, rowArray) => {
      row.forEach((column, columnIndex, columnArray) => {
        if(rowIndex === cell.row) {
          solutionHelper[rowIndex][columnIndex].push(cell.val);
        } else if(columnIndex === cell.col) {
          solutionHelper[rowIndex][columnIndex].push(cell.val);
        } else {
          if(cell.row > -1 && cell.row < 3 && rowIndex > -1 && rowIndex < 3) {
            if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            }
          } else if(cell.row > 2 && cell.row < 6 && rowIndex > 2 && rowIndex < 6) {
            if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            }
          } else if(cell.row > 5 && cell.row < 9 && rowIndex > 5 && rowIndex < 9) {
            if(cell.col > -1 && cell.col < 3 && columnIndex > -1 && columnIndex < 3) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            } else if(cell.col > 2 && cell.col < 6 && columnIndex > 2 && columnIndex < 6) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            } else if(cell.col > 5 && cell.col < 9 && columnIndex > 5 && columnIndex < 9) {
              solutionHelper[rowIndex][columnIndex].push(cell.val);
            }
          }
        }
      });
    });

    return {
      solutionHelper
    };
  }

  createSolutionArray() {
    let solutionArray = [];

    for(let i = 0; i < this.puzzler.puzzleRowLength; i++) {
      solutionArray[i] = [];

      for(let j = 0; j < this.puzzler.puzzleRowLength; j++) {
        solutionArray[i][j] = [];

        for(let k = 0; k < this.puzzler.puzzleMaxValue; k++) {
          const val = k + 1;

          solutionArray[i][j].push(val);
        }

        solutionArray[i][j] = _.shuffle(solutionArray[i][j]);
      }
    }

    return solutionArray;
  }

  checkArrayLengths() {
    const cells = this.cells;

    if(cells) {
      let check;

      for(const prop in cells) {
        if(cells.hasOwnProperty(prop)) {
          if(cells[prop].length === 9) {
            check = cells[prop].every((section, sectionIndex) => {
              return section.length === 9;
            });
          }
        }
      }

      return check;
    }
  }

  checkForValidValues() {
    const cells = this.cells;

    if(cells) {
      let check;

      for(const prop in cells) {
        if(cells.hasOwnProperty(prop)) {
          check = cells[prop].every((section, sectionIndex) => {
            const sortedSection = [].concat(section);

            sortedSection.sort((a, b) => {
              return a - b;
            });

            let lastVal = 0;

            return sortedSection.every((val, index, array) => {
              val = parseInt(val, 10);

              const test = (val === lastVal + 1 && lastVal === index);

              lastVal = val;

              return test;
            });
          });
        }
      }

      return check;
    }
  }

  checkForDuplicates() {
    const cells = this.cells;

    let check;

    if(cells) {
      for(const prop in cells) {
        if(cells.hasOwnProperty(prop)) {
          check = cells[prop].every((section, sectionIndex) => {
            const test = _.uniq(section).length === this.puzzler.puzzleRowLength;

            return test;
          });

          if(!check) {
            return false;
          }
        }
      }
    }

    return check;
  }

  createGridArrays(rows) {
    const grids = this.puzzler.generatePuzzle();

    rows.map((row, rowIndex) => {
      let gridRow;
      let gridColumn;

      if(rowIndex < 3) {
        gridRow = 0;
      } else if(rowIndex < 6) {
        gridRow = 1;
      } else {
        gridRow = 2;
      }

      row.map((cellValue, colIndex) => {
        if(colIndex < 3) {
          gridColumn = 0;
        } else if(colIndex < 6) {
          gridColumn = 1;
        } else {
          gridColumn = 2;
        }

        grids[this.mapToGrid(gridRow, gridColumn)].push(cellValue);
      })
    });

    return grids;
  }

  mapToGrid(row, column) {
    if(row === 0) {
      return column;
    } else if(row === 1) {
      return row * 4 - 1 + column;
    } else if(row === 2) {
      return row * 3 + column;
    }
  }

  createColumnArrays(rows) {
    const columns = this.puzzler.generatePuzzle();

    rows.map((row, rowIndex) => {
      row.map((cell, colIndex) => {
        columns[colIndex].push(cell);
      });
    });

    return columns;
  }
}
