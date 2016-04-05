# simpledoku 0.2.0

`simpledoku` is a basic, desktop Sudoku game prototype built with React, Electron, Babel, and Webpack.

It's mostly just an exploration of React and Electron, but the concepts learned while building a Sudoku solver and puzzle generator were also valuable.

Right now it just builds a standalone `Simpledoku.app` file for OS X. Future updates will branch out to include a Mac App Store version and a Windows version.

## Building

1. Perform a `git clone` of this repo
1. `cd` into the `simpledoku` directory
1. Run `npm install`
1. Run `npm run watch` in a Terminal Window
1. Run `npm start` in another Terminal Window


## Packaging

1. Run `npm run build`
1. Run `npm run generate`
1. Run `cd app`
1. Run `npm install`
1. Run `npm package`

Built application files can be found in `simpledoku/dist/[current version number]/Simpledoku-darwin-x64`.

## Roadmap

- **Help & About** - Actually fill out the help and about pages with real information and allow user to go back to the menu screen
- **Persistent Solved State** - Store solved puzzle ids somewhere so that when the user returns we can serve up new puzzles and not stale ones
- **Better Solver/Generator** - Need to learn more about Dancing Links/Algorithm X and implement a much more efficient solver for puzzle generation, a more efficient solver could generate and store batches of puzzles for later use
- **Puzzle Database** - Replace `PuzzleService` with DB that stores puzzles and that we can inject new puzzles into
- **Difficulty Levels** - Allow user to select difficulty levels
- **Scoring** - Add user scoring based on hints used, solution checks, difficulty setting, and weight of difficulty of puzzle squares
- **Helper** - Show floating helper window with possible cell values when user activates it (maybe using the SHIFT key?)
- **Puzzle Permutations** - Implement sudoku solution permutations to generate even more puzzles
- **Standalone Solver** - Allow user to input a puzzle and provide the solution
- **Interface** - Update the interface so that it is much more attractive
- **App Icon** - Add custom icons
