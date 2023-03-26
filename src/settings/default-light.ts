import type {Light} from '../schema.js';

import {linearToneCurve} from './linear-tone-curve.js';

export const defaultLight: Required<Light> = {
  exposure: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  whites: 0,
  blacks: 0,
  toneCurve: linearToneCurve,
  parametricCurve: {
    shadows: 0,
    darks: 0,
    lights: 0,
    highlights: 0,
    shadowsSplit: 25,
    midtonesSplit: 50,
    highlightsSplit: 75,
  },
};
