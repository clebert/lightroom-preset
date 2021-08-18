// @ts-check

const {writeFileSync} = require('fs');
const {
  autoColor,
  autoLight,
  defaultColor,
  defaultDetail,
  defaultEffects,
  defaultLight,
  defaultOptics,
  generatePreset,
  mediumContrastToneCurve,
} = require('./lib/cjs');

/** @type {import('./lib/cjs').CameraRawSettings} */
const settings = {
  autoTone: true,
  profile: 'Adobe Color',
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

writeFileSync('./example.xmp', generatePreset('Example', settings));
