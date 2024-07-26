// App.js
import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import Sudoku from "sudoku-umd";

const generateRandomSudoku = () => {
  // Difficulty can be adjusted here
  const difficulty = "easy";
  const puzzle = Sudoku.generate(difficulty);
  return Sudoku.board_string_to_grid(puzzle);
};

const SudokuPuzzle = () => {
  const [initialPuzzle, setInitialPuzzle] = useState(generateRandomSudoku());
  const [puzzle, setPuzzle] = useState(
    JSON.parse(JSON.stringify(initialPuzzle))
  );
  const [solvedPuzzle, setSolvedPuzzle] = useState([]);
  const [validationResult, setValidationResult] = useState("");

  const validatePuzzle = () => {
    const isPuzzleValid =
      JSON.stringify(puzzle) === JSON.stringify(solvedPuzzle);
    setValidationResult(isPuzzleValid ? "Correct" : "Incorrect");
  };

  const solveSudoku = (board) => {
    const flattenedBoard = board.flat().join("");
    const solved = Sudoku.solve(flattenedBoard);
    if (solved) {
      const solvedGrid = Sudoku.board_string_to_grid(solved);
      return solvedGrid;
    } else {
      console.log("Puzzle is not solvable.");
      return board;
    }
  };

  const solvePuzzle = () => {
    const solved = solveSudoku(puzzle);
    setPuzzle(solved);
    setSolvedPuzzle(solved);
  };

  const resetPuzzle = () => {
    const newPuzzle = generateRandomSudoku();
    setInitialPuzzle(newPuzzle);
    setPuzzle(JSON.parse(JSON.stringify(newPuzzle)));
    setSolvedPuzzle([]);
    setValidationResult("");
  };

  const handleCellChange = (value, row, col) => {
    const newPuzzle = puzzle.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? +value : cell
      )
    );
    setPuzzle(newPuzzle);
  };

  const clearCell = (row, col) => {
    const newPuzzle = puzzle.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? 0 : cell
      )
    );
    setPuzzle(newPuzzle);
  };

  return (
    <View style={styles.container}>
      {puzzle.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, columnIndex) => (
            <TextInput
              key={columnIndex}
              style={[
                styles.cell,
                (rowIndex + columnIndex) % 2 === 0
                  ? styles.lightBackground
                  : styles.darkBackground,
              ]}
              value={cell !== 0 ? String(cell) : ""}
              onChangeText={(value) =>
                handleCellChange(value, rowIndex, columnIndex)
              }
              keyboardType="numeric"
              maxLength={1}
              onFocus={() => clearCell(rowIndex, columnIndex)}
            />
          ))}
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Validate" onPress={validatePuzzle} />
        <Button title="Solve" onPress={solvePuzzle} />
        <Button title="Reset" onPress={resetPuzzle} />
      </View>
      {validationResult !== "" && (
        <Text
          style={
            validationResult === "Correct"
              ? styles.correctText
              : styles.incorrectText
          }
        >
          {validationResult}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderColor: "black",
    width: 30,
    height: 30,
    textAlign: "center",
  },
  lightBackground: {
    backgroundColor: "#A9A9A9",
  },
  darkBackground: {
    backgroundColor: "#EBF3E8",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  correctText: {
    marginTop: 20,
    color: "green",
    fontWeight: "bold",
  },
  incorrectText: {
    marginTop: 20,
    color: "red",
    fontWeight: "bold",
  },
});

export default SudokuPuzzle;
