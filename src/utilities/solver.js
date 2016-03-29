'use strict';

import _ from 'lodash';

export default class Solver {
  constructor(cells = []) {
    this.cells = {
      grids: this.createGridArrays(cells),
      columns: this.createColumnArrays(cells),
      rows: cells
    };
  }

  checkSolution() {
    console.log('cells:', this.cells);

    const validLengths = this.checkArrayLengths();

    const noDuplicates = this.checkForDuplicates();

    const validValues = this.checkForValidValues();

    console.log('validLengths:', validLengths);
    console.log('noDuplicates:', noDuplicates);
    console.log('validValues:', validValues);

    return (validLengths && noDuplicates && validValues);
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
            return _.uniq(section).length === 9;
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
    const grids = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];

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
    const columns = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];

    rows.map((row, rowIndex) => {
      row.map((cell, colIndex) => {
        columns[colIndex].push(cell);
      });
    });

    return columns;
  }
}
