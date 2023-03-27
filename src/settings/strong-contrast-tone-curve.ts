import type {
  LinearToneCurvePoints,
  StrongContrastToneCurve,
} from '../schema.js';

const linearPoints: LinearToneCurvePoints = [
  [0, 0],
  [255, 255],
];

export const strongContrastToneCurve: StrongContrastToneCurve = {
  name: `Strong Contrast`,
  points: [
    [0, 0],
    [32, 16],
    [64, 50],
    [128, 128],
    [192, 202],
    [255, 255],
  ],
  pointsRed: linearPoints,
  pointsGreen: linearPoints,
  pointsBlue: linearPoints,
};
