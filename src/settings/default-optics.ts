import type {Optics} from '../schema.js';

export const defaultOptics: Required<Optics> = {
  removeChromaticAberration: false,
  enableLensCorrections: false,
  defringe: {
    purple: {amount: 0, hueLow: 30, hueHigh: 70},
    green: {amount: 0, hueLow: 40, hueHigh: 60},
  },
};
