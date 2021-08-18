import {} from 'uuid';
import {
  autoColor,
  autoLight,
  defaultColor,
  defaultDetail,
  defaultEffects,
  defaultGeometry,
  defaultLight,
  defaultOptics,
  generatePreset,
  mediumContrastToneCurve,
  strongContrastToneCurve,
} from '.';

jest.mock('uuid', () => ({v4: () => 'abcdefgh-ijkl-mnop-qrst-uvwxyz123456'}));

describe('generatePreset()', () => {
  test('valid settings', () => {
    expect(generatePreset('Test', {})).toMatchSnapshot();
    expect(generatePreset('Test', {autoTone: true})).toMatchSnapshot();
    expect(generatePreset('Test', {profile: 'Adobe Color'})).toMatchSnapshot();
    expect(generatePreset('Test', {profile: 'Custom'})).toMatchSnapshot();
    expect(generatePreset('Test', {light: {}})).toMatchSnapshot();
    expect(generatePreset('Test', {light: defaultLight})).toMatchSnapshot();
    expect(generatePreset('Test', {light: {...defaultLight, ...autoLight}})).toMatchSnapshot();
    expect(generatePreset('Test', {light: {toneCurve: mediumContrastToneCurve}})).toMatchSnapshot();
    expect(generatePreset('Test', {light: {toneCurve: strongContrastToneCurve}})).toMatchSnapshot();
    expect(generatePreset('Test', {color: {}})).toMatchSnapshot();
    expect(generatePreset('Test', {color: defaultColor})).toMatchSnapshot();
    expect(generatePreset('Test', {color: {...defaultColor, ...autoColor}})).toMatchSnapshot();

    expect(
      generatePreset('Test', {
        color: {whiteBalance: {name: 'Custom', temperature: 6500, tint: 0}},
      })
    ).toMatchSnapshot();

    expect(generatePreset('Test', {effects: {}})).toMatchSnapshot();
    expect(generatePreset('Test', {effects: defaultEffects})).toMatchSnapshot();
    expect(generatePreset('Test', {effects: {vignette: {...defaultEffects.vignette, amount: -100}}})).toMatchSnapshot();
    expect(generatePreset('Test', {effects: {vignette: {...defaultEffects.vignette, amount: 100}}})).toMatchSnapshot();
    expect(generatePreset('Test', {effects: {grain: {...defaultEffects.grain, amount: 100}}})).toMatchSnapshot();
    expect(generatePreset('Test', {detail: {}})).toMatchSnapshot();
    expect(generatePreset('Test', {detail: defaultDetail})).toMatchSnapshot();

    expect(
      generatePreset('Test', {
        detail: {
          sharpening: {...defaultDetail.sharpening, amount: 0},
          noiseReduction: {...defaultDetail.noiseReduction, amount: 100},
          colorNoiseReduction: {...defaultDetail.colorNoiseReduction, amount: 0},
        },
      })
    ).toMatchSnapshot();

    expect(generatePreset('Test', {optics: {}})).toMatchSnapshot();
    expect(generatePreset('Test', {optics: defaultOptics})).toMatchSnapshot();

    expect(
      generatePreset('Test', {
        optics: {
          removeChromaticAberration: true,
          enableLensCorrections: true,
          defringe: {
            purple: {...defaultOptics.defringe.purple, amount: 20},
            green: {...defaultOptics.defringe.green, amount: 20},
          },
        },
      })
    ).toMatchSnapshot();

    expect(generatePreset('Test', {geometry: {}})).toMatchSnapshot();
    expect(generatePreset('Test', {geometry: defaultGeometry})).toMatchSnapshot();
    expect(generatePreset('Test', {geometry: {upright: 'Auto'}})).toMatchSnapshot();
    expect(generatePreset('Test', {geometry: {upright: 'Full'}})).toMatchSnapshot();
    expect(generatePreset('Test', {geometry: {upright: 'Level'}})).toMatchSnapshot();
    expect(generatePreset('Test', {geometry: {upright: 'Vertical'}})).toMatchSnapshot();
  });

  test('invalid settings', () => {
    expect(() => generatePreset('Test', undefined as any)).toThrow(
      new Error('The camera raw settings must be object.')
    );

    expect(() => generatePreset('Test', {auto: true} as any)).toThrow(
      new Error('The camera raw settings must NOT have additional properties.')
    );
  });
});
