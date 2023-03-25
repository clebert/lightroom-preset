import {writeFile} from 'node:fs/promises';
import {
  autoColor,
  autoLight,
  defaultColor,
  defaultDetail,
  defaultEffects,
  defaultLight,
  defaultOptics,
  generatePreset,
  mediumContrastToneCurve,
} from './lib/index.js';

/** @type {import('./lib/index.js').CameraRawSettings} */
const settings = {
  autoTone: true,
  profile: `Adobe Color`,
  light: {
    ...defaultLight,
    ...autoLight,
    toneCurve: mediumContrastToneCurve,
  },
  color: {
    ...defaultColor,
    ...autoColor,
    colorGrading: {
      ...defaultColor.colorGrading,
      highlights: {...defaultColor.colorGrading.highlights, luminance: -5},
    },
  },
  effects: {...defaultEffects, texture: 30, clarity: 20},
  detail: {...defaultDetail},
  optics: {...defaultOptics, removeChromaticAberration: true, enableLensCorrections: true},
};

await writeFile(`./example.xmp`, generatePreset(`Example`, settings));
