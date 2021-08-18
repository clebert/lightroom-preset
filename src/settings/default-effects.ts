import type {Effects} from '../schema';

export const defaultEffects: Required<Effects> = {
  texture: 0,
  clarity: 0,
  dehaze: 0,
  vignette: {amount: 0, midpoint: 50, roundness: 0, feather: 50, highlights: 0},
  grain: {amount: 0, size: 25, roughness: 50},
};
