const {
  parseCoordinates,
  parseRobotInstructions,
  parseRobot,
  INSTRUCTIONS,
} = require("../helpers/utils");

// Test all Utils for parsing instructions
describe("Helpers Tests", () => {
  test("Test Parse Coordinates", () => {
    expect(parseCoordinates("1 1")).toEqual([1, 1]);
  });

  test("Test Parse Robot Instructions", () => {
    expect(parseRobotInstructions("RFL")).toEqual([
      INSTRUCTIONS.Right,
      INSTRUCTIONS.Forward,
      INSTRUCTIONS.Left,
    ]);
  });

  test("Test Parse Robot", () => {
    expect(parseRobot("1 1 E")).toEqual([[1, 1], "E"]);
  });
});
