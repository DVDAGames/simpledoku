# simpledoku 0.2.1

`simpledoku` is a basic, desktop Sudoku game prototype built with React, Electron, Babel, and Webpack.

It's mostly just an exploration of React and Electron, but the concepts learned while building a Sudoku solver and puzzle generator were also valuable.

Right now it just builds a standalone `Simpledoku.app` file for OS X. Future updates will branch out to include a Mac App Store version and a Windows version.

You can download the latest Proof of Concept version from the [current release page](https://github.com/DVDAGames/simpledoku/releases/tag/0.2.0).

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
1. Run `npm run package`

Built application files can be found in `simpledoku/dist/[current version number]/Simpledoku-darwin-x64`.

## Roadmap

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
- **Interaction Sounds** - Add sounds to button hover states, successful puzzle solution, incorrect puzzle solution, interactive cell focus, non-interactive cell focus, etc.
- **Sound Options** - Add menu for setting volume levels of BG and UI sounds. Add more BG music
- **Integrated Player** - Allow user to cycle through BG music and play/pause and mute/unmute it
