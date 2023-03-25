import type {Color} from '../schema.js';

export const defaultColor: Required<Color> = {
  whiteBalance: {name: `As Shot`},
  vibrance: 0,
  saturation: 0,
  colorMix: {
    red: {hue: 0, saturation: 0, luminance: 0},
    orange: {hue: 0, saturation: 0, luminance: 0},
    yellow: {hue: 0, saturation: 0, luminance: 0},
    green: {hue: 0, saturation: 0, luminance: 0},
    aqua: {hue: 0, saturation: 0, luminance: 0},
    blue: {hue: 0, saturation: 0, luminance: 0},
    purple: {hue: 0, saturation: 0, luminance: 0},
    magenta: {hue: 0, saturation: 0, luminance: 0},
  },
  colorGrading: {
    shadows: {hue: 0, saturation: 0, luminance: 0},
    midtones: {hue: 0, saturation: 0, luminance: 0},
    highlights: {hue: 0, saturation: 0, luminance: 0},
    global: {hue: 0, saturation: 0, luminance: 0},
    blending: 50,
    balance: 0,
  },
};
