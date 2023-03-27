import type {
  LinearToneCurvePoints,
  MediumContrastToneCurve,
} from '../schema.js';

const linearPoints: LinearToneCurvePoints = [
  [0, 0],
  [255, 255],
];

export const mediumContrastToneCurve: MediumContrastToneCurve = {
  name: `Medium Contrast`,
  points: [
    [0, 0],
    [32, 22],
    [64, 56],
    [128, 128],
    [192, 196],
    [255, 255],
  ],
  pointsRed: linearPoints,
  pointsGreen: linearPoints,
  pointsBlue: linearPoints,
};
