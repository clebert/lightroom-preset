import type {Geometry} from '../schema';

export const defaultGeometry: Required<Geometry> = {
  upright: 'Off',
  manualTransforms: {
    distortion: 0,
    vertical: 0,
    horizontal: 0,
    rotate: 0,
    aspect: 0,
    scale: 100,
    xOffset: 0,
    yOffset: 0,
  },
};
