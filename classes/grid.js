class Grid {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.scents = [];
  }

  // Check if Robot is currently out of bounds
  outOfBounds(robot) {
    return robot.x < 0 || robot.x > this.x || robot.y < 0 || robot.y > this.y;
  }
}

module.exports = Grid;
