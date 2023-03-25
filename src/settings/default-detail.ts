import type {Detail} from '../schema.js';

export const defaultDetail: Required<Detail> = {
  sharpening: {amount: 40, radius: 1, detail: 25, masking: 0},
  noiseReduction: {amount: 0, detail: 50, contrast: 0},
  colorNoiseReduction: {amount: 25, detail: 50, smoothness: 50},
};
