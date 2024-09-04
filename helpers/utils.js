const DIRECTIONS = {
  North: "N",
  South: "S",
  East: "E",
  West: "W",
};

const INSTRUCTIONS = {
  Forward: "F",
  Right: "R",
  Left: "L",
};

const parseCoordinates = (input) => {
  // Use regex to check coordinates are valid format
  const match = input.trim().match(/^(\d+)\s+(\d+)$/);
  if (match) return [parseInt(match[1]), parseInt(match[2])];
  throw new Error("Invalid coordinates");
};

const parseRobotInstructions = (input) => [...input.trim()];

// Parse Robot Coordinates and Orientation
const parseRobot = (input) => {
  const directionValues = Object.values(DIRECTIONS).join("");
  const match = input
    .trim()
    .match(new RegExp(`^(\\d+)\\s+(\\d+)\\s+([${directionValues}])$`));
  if (match) return [[parseInt(match[1]), parseInt(match[2])], match[3]];
  throw new Error("Invalid robot specification");
};

module.exports = {
  DIRECTIONS,
  INSTRUCTIONS,
  parseCoordinates,
  parseRobotInstructions,
  parseRobot,
};
