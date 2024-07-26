# Welcome to your Expo app

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## A Sudoku puzzle is valid if:

    Each row contains all digits from 1 to 9.
    Each column contains all digits from 1 to 9.
    Each 3x3 subgrid contains all digits from 1 to 9.

## Sudoku Solving Algorithm: Backtracking

Backtracking is the most common and intuitive approach for solving Sudoku puzzles. It's essentially a brute-force method with a smart pruning strategy.
How it works:

    Find an empty cell: Start by finding an empty cell in the Sudoku grid.
    Try numbers: For each possible number (1-9) in that cell:
        Check if the number is valid (doesn't exist in the same row, column, or 3x3 subgrid).
        If valid, recursively call the solving function for the next empty cell.
    Backtrack: If none of the numbers work for the current cell, backtrack to the previous cell and try a different number.


## Image

![image](./assets/images/suduko.png)