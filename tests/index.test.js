const Grid = require("../classes/grid");
const Robot = require("../classes/robot");
const {
  parseCoordinates,
  parseRobotInstructions,
  parseRobot,
  DIRECTIONS,
  INSTRUCTIONS,
} = require("../helpers/utils");

describe("Martian Robot Tests", () => {
  let grid, robot;

  beforeEach(() => {
    grid = new Grid(5, 3);
    robot = new Robot({ grid, coords: [1, 1], direction: "E" });
  });

  test("Test Grid", () => {
    expect(grid).toEqual({ scents: [], x: 5, y: 3 });
  });

  test("Test Robot", () => {
    expect(robot).toEqual({
      direction: DIRECTIONS.East,
      grid: { scents: [], x: 5, y: 3 },
      lost: false,
      x: 1,
      y: 1,
    });
  });

  test("Test robot moving forward", () => {
    robot.processInstructions([INSTRUCTIONS.Forward]);
    expect(robot.x).toBe(2);
    expect(robot.y).toBe(1);
    expect(robot.lost).toBe(false);
  });

  test("Test robot going off grid", () => {
    robot.processInstructions(new Array(5).fill(INSTRUCTIONS.Forward));
    expect(robot.x).toBe(5);
    expect(robot.y).toBe(1);
    expect(robot.lost).toBe(true);
  });

  test("Test out of bounds", () => {
    const robotIn = new Robot({
      grid,
      coords: [1, 1],
      direct: DIRECTIONS.North,
    });
    expect(grid.outOfBounds(robotIn)).toBe(false);
    const robotOut = new Robot({
      grid,
      coords: [7, 5],
      direct: DIRECTIONS.North,
    });
    expect(grid.outOfBounds(robotOut)).toBe(true);
  });

  // Make sure if robot is lost, newly created robot will avoid being lost at same coordinates
  test("Test scents", () => {
    const robot2 = new Robot({ grid, coords: [1, 1], direction: "E" });
    robot.processInstructions(new Array(5).fill(INSTRUCTIONS.Forward));
    expect(robot.x).toBe(5);
    expect(robot.lost).toBe(true);

    robot2.processInstructions(new Array(5).fill(INSTRUCTIONS.Forward));
    expect(robot2.x).toBe(5);
    expect(robot2.lost).toBe(false);
  });

  // End to end test for the sample case
  test("Test case", () => {
    const input = `5 3
            1 1 E
            RFRFRFRF
            3 2 N
            FRRFLLFFRRFLL
            0 3 W
            LLFFFLFLFL`;

    const parsedInput = input.split("\n");
    const gridSize = parseCoordinates(parsedInput[0]);
    const grid = new Grid(gridSize[0], gridSize[1]);
    const robots = parsedInput
      .slice(1, parsedInput.length)
      .filter((o, index) => index % 2 == 0);
    const instructions = parsedInput
      .slice(1, parsedInput.length)
      .filter((o, index) => index % 2 == 1);
    let result = [];
    for (let i = 0; i < robots.length; i++) {
      let data = robots[i];
      const [coords, direction] = parseRobot(data);
      const directions = parseRobotInstructions(instructions[i]);
      const robot = new Robot({ grid, coords, direction });
      robot.processInstructions(directions);
      result.push(robot.finalStatus());
    }
    expect(result).toEqual(["1 1 E", "3 3 N LOST", "2 3 S"]);
  });
});
