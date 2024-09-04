const { DIRECTIONS, INSTRUCTIONS } = require("../helpers/utils");

class Robot {
  constructor({ grid, coords, direction }) {
    this.grid = grid;
    this.x = coords[0];
    this.y = coords[1];
    this.direction = direction;
    this.lost = grid.outOfBounds(this);
  }

  // Process all instructions for given robot
  processInstructions(instructions) {
    for (let instruction of instructions) {
      this.processInstruction(instruction);
    }
  }

  // Direct robot to perform movement
  processInstruction(instruction) {
    switch (instruction) {
      case INSTRUCTIONS.Forward:
        this.moveForward();
        break;
      case INSTRUCTIONS.Right:
        this.rotateRight();
        break;
      case INSTRUCTIONS.Left:
        this.rotateLeft();
        break;
      default:
        throw new Error(`Unrecognized instruction "${instruction}"`);
    }
  }

  // Move robot in 3 given directions (F, L, R)
  moveForward() {
    if (this.lost) return;

    const initialX = this.x;
    const initialY = this.y;

    switch (this.direction) {
      case DIRECTIONS.East:
        this.x += 1;
        break;
      case DIRECTIONS.West:
        this.x -= 1;
        break;
      case DIRECTIONS.North:
        this.y += 1;
        break;
      case DIRECTIONS.South:
        this.y -= 1;
        break;
    }

    if (this.grid.outOfBounds(this)) {
      this.x = initialX;
      this.y = initialY;

      const scent = `${this.x} ${this.y} ${this.direction}`;
      if (!this.grid.scents.includes(scent)) {
        this.lost = true;
        this.grid.scents.push(scent);
      }
    }
  }

  rotateLeft() {
    switch (this.direction) {
      case DIRECTIONS.North:
        this.direction = DIRECTIONS.West;
        break;
      case DIRECTIONS.West:
        this.direction = DIRECTIONS.South;
        break;
      case DIRECTIONS.South:
        this.direction = DIRECTIONS.East;
        break;
      case DIRECTIONS.East:
        this.direction = DIRECTIONS.North;
        break;
    }
  }

  rotateRight() {
    switch (this.direction) {
      case DIRECTIONS.North:
        this.direction = DIRECTIONS.East;
        break;
      case DIRECTIONS.East:
        this.direction = DIRECTIONS.South;
        break;
      case DIRECTIONS.South:
        this.direction = DIRECTIONS.West;
        break;
      case DIRECTIONS.West:
        this.direction = DIRECTIONS.North;
        break;
    }
  }

  // Set final location of robot and display lost of lost
  finalStatus() {
    return `${this.x} ${this.y} ${this.direction}${this.lost ? " LOST" : ""}`;
  }
}

module.exports = Robot;
