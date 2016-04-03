'use strict';

import { flatten, random, shuffle, uniq, without, countBy, identity, map, sortBy } from 'lodash';

import Puzzle from './puzzle';

import { cloneArray } from './utils';

export default class Solver {
  constructor(cells = []) {
    this.puzzler = new Puzzle(true, false);

    this.lastSolution = [];

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

    puzzle.some((rowValues, rowIndex, rowArray) => {
      let test = rowValues.some((colValue, colIndex, colArray) => {
        if(colValue === 0) {
          row = rowIndex;
          col = colIndex;

          return true;
        }
      });

      return test
    });

    return {
      row,
      col
    };
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
        const validValues = without(helperCell, invalidCell);

        if(validValues.length) {
          value = validValues[random(0, validValues.length - 1)];
        }
      }

      if(value) {
        safe = true;

        this.lastSolution.push({
          row: cell.row,
          col: cell.col,
          val: value,
          helper: solutionHelper
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
        const { row, col, val, helper } = this.lastSolution.pop();

        solutionHelper = helper;

        invalidValues[row][col].push(val);
      }
    } else {
      if(this.lastSolution.length) {
        const { row, col, val, helper } = this.lastSolution.pop();

        solutionHelper = helper;

        invalidValues[row][col].push(val);
      }
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

    const { puzzle, invalidValues, solutionHelper} = puzzleBuilder.generatePuzzleMatrices();

    let fullPuzzle = this.solvePuzzleTrampoline(() => {
      const test = this.solvePuzzle(puzzle, solutionHelper, invalidValues);

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

  stillHasZeros(puzzle) {
    const check = puzzle.some((row) => {
      const test = row.some((cell) => {
        if(cell === 0) {
          return true;
        }
      });

      return test;
    });

    return check;
  }

  solvePuzzle(puzzle, solutionHelper, invalidValues, passes = 0) {
    if(this.stillHasZeros(puzzle)) {
      passes++;

      if(passes < 200000) {
        const cell = this.chooseNextCell(puzzle);

        if(typeof cell.row !== 'undefined' && typeof cell.col !== 'undefined') {
          const calculate = this.chooseRandomValueForCell(cell, puzzle, solutionHelper, invalidValues);

          if(calculate.safe) {
            //matrices = this.mapCellToConstraintMatrices(cell, calculate.value, matrices);

            puzzle[cell.row][cell.col] = calculate.value;
          }

          solutionHelper = calculate.solutionHelper;

          return this.solvePuzzle(puzzle, solutionHelper, invalidValues, passes);
        }
      } else {
        return this.createSolution();
      }
    }

    return puzzle;
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

      console.log(cells);
      for(const prop in cells) {
        if(cells.hasOwnProperty(prop)) {
          check = cells[prop].every((section, sectionIndex) => {
            const test = uniq(section).length === this.puzzler.puzzleRowLength;

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
    const grids = this.puzzler.generateMatrix();

    rows.map((row, rowIndex) => {
      let gridRow;
      let gridColumn;

      if(rowIndex < 3) {
        gridRow = 0;
      } else if(rowIndex < 6) {
        gridRow = 1;
      } else if(rowIndex < 9) {
        gridRow = 2;
      }

      row.map((cellValue, colIndex) => {
        if(colIndex < 3) {
          gridColumn = 0;
        } else if(colIndex < 6) {
          gridColumn = 1;
        } else if(colIndex < 9) {
          gridColumn = 2;
        }

        const gridIndex = this.mapToGrid(gridRow, gridColumn);

        if(!Array.isArray(grids[gridIndex])) {
          grids[gridIndex] = [];
        }

        const nextItem = grids[gridIndex].indexOf(undefined);

        if(nextItem !== -1) {
          grids[gridIndex][nextItem] = cellValue;
        }
      });
    });

    return grids;
  }

  mapToGrid(row, column) {
    if(row === 0) {
      return column;
    } else if(row === 1) {
      return 3 + column;
    } else if(row === 2) {
      return 6 + column;
    }
  }

  createColumnArrays(rows) {
    const columns = this.puzzler.generateMatrix();

    rows.map((row, rowIndex) => {
      row.map((cell, colIndex) => {
        const nextItem = columns[colIndex].indexOf(undefined);

        if(nextItem !== -1) {
          columns[colIndex][nextItem] = cell;
        }
      });
    });

    return columns;
  }
}
