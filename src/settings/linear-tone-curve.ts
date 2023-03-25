import type {LinearToneCurve, LinearToneCurvePoints} from '../schema.js';

const linearPoints: LinearToneCurvePoints = [
  [0, 0],
  [255, 255],
];

export const linearToneCurve: LinearToneCurve = {
  name: `Linear`,
  points: linearPoints,
  pointsRed: linearPoints,
  pointsGreen: linearPoints,
  pointsBlue: linearPoints,
};
