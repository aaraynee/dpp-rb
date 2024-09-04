const Grid = require("./classes/grid");
const Robot = require("./classes/robot");
const {
  parseCoordinates,
  parseRobotInstructions,
  parseRobot,
  readFile,
} = require("./helpers/utils");

function processMarsRobots() {
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", function (input) {
    // Parse input data
    let parsedInput = input.split("\n");
    // Filter just incase of empty row in input data
    parsedInput = parsedInput.filter((o) => o && o != "");
    // Create grid
    const gridSize = parseCoordinates(parsedInput[0]);
    const grid = new Grid(gridSize[0], gridSize[1]);
    // Given input pattern of Coordinates and Orientation
    // followed by instructions we can filter out robots
    // and instructions by index (removing the first as that)
    // is for grid size
    const robots = parsedInput
      .slice(1, parsedInput.length)
      .filter((o, index) => index % 2 == 0);
    const instructions = parsedInput
      .slice(1, parsedInput.length)
      .filter((o, index) => index % 2 == 1);
    for (let i = 0; i < robots.length; i++) {
      let data = robots[i];
      // Get current Robot Coordinates and Direction, and Instructions for robot
      const [coords, direction] = parseRobot(data);
      const directions = parseRobotInstructions(instructions[i]);
      // Create Robot
      const robot = new Robot({ grid, coords, direction });
      robot.processInstructions(directions);
      console.log(robot.finalStatus());
    }
  });
}

processMarsRobots();
