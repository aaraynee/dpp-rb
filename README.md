# Developer Programming Problem

## Intro

### Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.

### Solution

Using JavaScript we can create a quick and easy solution to input grid and robot instructions to get the final location of the robots. We can start off by writing some tests to make sure we follow all the constraints within the brief.

## Getting started

```
// Clone the repo locally and then run
yarn or npm
yarn start or npm run start

// To run the unit tests
yarn test or npm run test
```

## Dependancies

- yarn or npm for package management
- Jest for unit testing

## Input Data

```
To update input data update data.txt
```

#### Sample Input

```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```

#### Sample Output

```
1 1 E
3 3 N LOST
2 3 S
```
