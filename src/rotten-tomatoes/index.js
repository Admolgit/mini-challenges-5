function rottenTomatoes(grid) {
  // Storing the number of rows in the grid
  const rows = grid.length;
  // Storing the number of column in the grid
  const cols = grid[0].length;
  // Set an empty queue
  const queue = [];
  // Set the number of fresh tomatoe counts
  let count = 0;
  // Initializing minimum number of minutes that must elapse.
  let minutes = 0;
  // Checking if there is no grid or the are no values, if any of that condition is true, it returns -1, because there is no grid to work with
  if (!grid || rows === 0) return -1;

  // Using matrix method to represent the values of the tomatoes, and moving in all directions.
  const matrixDirections = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  // Using nested for loop to iterate grid values
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        // Push rotten tomatoes to the queue
        queue.push([i, j]);
      } else if (grid[i][j] === 1) {
        // Increment count for fresh tomatoes
        count++;
      }
    }
  }
  // Return 0 minutes if there are no fresh tomatoes, no time to waste on rotten tomatoes and empty cell.
  if (count === 0) return 0;

  while (queue.length > 0) {
    // Checking the length of the rotten tomatoes in queue
    const currentRottenTomatoes = queue.length;
    // Keeping track if any tomatoe has become rotten at any current minute
    let rottenThisMin = false;

    for (let k = 0; k < currentRottenTomatoes; k++) {
      // Remove the value from the queue and get rotten tomatoes from rows and columns.
      const [row, column] = queue.shift();
      // Using for of loop to explore all possible rows and columns.
      for (const [dr, dc] of matrixDirections) {
        const rowSum = row + dr;
        const columnSum = column + dc;
        if (
          rowSum >= 0 &&
          rowSum < rows &&
          columnSum >= 0 &&
          columnSum < cols &&
          grid[rowSum][columnSum] === 1
        ) {
          // If the tomatoe has become rotten, then we decrement the number of fresh tomatoes by 1
          grid[rowSum][columnSum] = 2;
          count--;
          // Then push the new rotten tomatoes to the queue
          queue.push([rowSum, columnSum]);
          // And also update the current rotten tomatoe to true
          rottenThisMin = true;
        }
      }
    }
    // Increment the minutes if tomatoes got rotten in the current minute
    if (rottenThisMin) minutes++;
  }
  // If all tomatoes have becomes rotten, rtuen the minutes, if not return -1, that mean it is not possible to rotten all the tomatoes.
  return count === 0 ? minutes : -1;
}

module.exports = rottenTomatoes;
