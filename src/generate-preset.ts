import type {CameraRawSettings} from './schema.js';

import {schema} from './schema.js';
import _Ajv from 'ajv';
import {format} from 'prettier';
import {v4 as uuid} from 'uuid';

const Ajv = _Ajv as unknown as typeof _Ajv.default;
const validate = new Ajv().compile(schema);

export function generatePreset(
  presetName: string,
  cameraRawSettings: CameraRawSettings,
): string {
  const valid = validate(cameraRawSettings);

  if (!valid) {
    throw new Error(
      `The camera raw settings ${validate.errors?.[0]?.message}.`,
    );
  }

  return format(
    [
      `<x:xmpmeta xmlns:x="adobe:ns:meta/">`,
      `<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">`,
      `<rdf:Description ${generateMainAttributes(cameraRawSettings)}>`,
      ...generatePresetNameNode(presetName),
      ...generateProfileNode(cameraRawSettings),
      ...generateToneCurve(cameraRawSettings),
      ...generateToneCurve(cameraRawSettings, `Red`),
      ...generateToneCurve(cameraRawSettings, `Green`),
      ...generateToneCurve(cameraRawSettings, `Blue`),
      `</rdf:Description>`,
      `</rdf:RDF>`,
      `</x:xmpmeta>`,
    ].join(`\n`),
    {parser: `xml`, xmlWhitespaceSensitivity: `ignore`} as any,
  );
}

// eslint-disable-next-line complexity
const generateMainAttributes = ({
  autoTone,
  profile,
  light,
  color,
  effects,
  detail,
  optics,
  geometry,
}: CameraRawSettings) =>
  [
    `xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"`,
    `crs:PresetType="Normal"`,
    `crs:UUID="${generateUuid()}"`,
    `crs:Version="13.3"`,
    `crs:ProcessVersion="11.0"`,

    ...(autoTone ? [`crs:AutoTone="True"`] : []),

    ...(profile && !profile.startsWith(`Adobe`)
      ? [`crs:CameraProfile="${profile}"`, `crs:ConvertToGrayscale="False"`]
      : []),

    ...(light?.exposure !== undefined
      ? [`crs:Exposure2012="${light.exposure.toFixed(2)}"`]
      : []),

    ...(light?.contrast !== undefined
      ? [`crs:Contrast2012="${light.contrast.toFixed(0)}"`]
      : []),

    ...(light?.highlights !== undefined
      ? [`crs:Highlights2012="${light.highlights.toFixed(0)}"`]
      : []),

    ...(light?.shadows !== undefined
      ? [`crs:Shadows2012="${light.shadows.toFixed(0)}"`]
      : []),

    ...(light?.whites !== undefined
      ? [`crs:Whites2012="${light.whites.toFixed(0)}"`]
      : []),

    ...(light?.blacks !== undefined
      ? [`crs:Blacks2012="${light.blacks.toFixed(0)}"`]
      : []),

    ...(light?.toneCurve
      ? [`crs:ToneCurveName2012="${light.toneCurve.name}"`]
      : []),

    ...(light?.parametricCurve
      ? [
          `crs:ParametricShadows="${light.parametricCurve.shadows.toFixed(0)}"`,
          `crs:ParametricDarks="${light.parametricCurve.darks.toFixed(0)}"`,
          `crs:ParametricLights="${light.parametricCurve.lights.toFixed(0)}"`,
          `crs:ParametricHighlights="${light.parametricCurve.highlights.toFixed(
            0,
          )}"`,
          `crs:ParametricShadowSplit="${light.parametricCurve.shadowsSplit.toFixed(
            0,
          )}"`,
          `crs:ParametricMidtoneSplit="${light.parametricCurve.midtonesSplit.toFixed(
            0,
          )}"`,
          `crs:ParametricHighlightSplit="${light.parametricCurve.highlightsSplit.toFixed(
            0,
          )}"`,
        ]
      : []),

    ...(color?.whiteBalance
      ? color.whiteBalance.name === `Custom`
        ? [
            `crs:WhiteBalance="Custom"`,
            `crs:Temperature="${color.whiteBalance.temperature.toFixed(0)}"`,
            `crs:Tint="${color.whiteBalance.tint.toFixed(0)}"`,
          ]
        : [`crs:WhiteBalance="${color.whiteBalance.name}"`]
      : []),

    ...(color?.vibrance !== undefined
      ? [`crs:Vibrance="${color.vibrance.toFixed(0)}"`]
      : []),

    ...(color?.saturation !== undefined
      ? [`crs:Saturation="${color.saturation.toFixed(0)}"`]
      : []),

    ...(color?.colorMix
      ? [
          `crs:HueAdjustmentRed="${color.colorMix.red.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentRed="${color.colorMix.red.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentRed="${color.colorMix.red.luminance.toFixed(
            0,
          )}"`,
          `crs:HueAdjustmentOrange="${color.colorMix.orange.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentOrange="${color.colorMix.orange.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentOrange="${color.colorMix.orange.luminance.toFixed(
            0,
          )}"`,
          `crs:HueAdjustmentYellow="${color.colorMix.yellow.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentYellow="${color.colorMix.yellow.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentYellow="${color.colorMix.yellow.luminance.toFixed(
            0,
          )}"`,
          `crs:HueAdjustmentGreen="${color.colorMix.green.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentGreen="${color.colorMix.green.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentGreen="${color.colorMix.green.luminance.toFixed(
            0,
          )}"`,
          `crs:HueAdjustmentAqua="${color.colorMix.aqua.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentAqua="${color.colorMix.aqua.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentAqua="${color.colorMix.aqua.luminance.toFixed(
            0,
          )}"`,
          `crs:HueAdjustmentBlue="${color.colorMix.blue.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentBlue="${color.colorMix.blue.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentBlue="${color.colorMix.blue.luminance.toFixed(
            0,
          )}"`,
          `crs:HueAdjustmentPurple="${color.colorMix.purple.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentPurple="${color.colorMix.purple.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentPurple="${color.colorMix.purple.luminance.toFixed(
            0,
          )}"`,
          `crs:HueAdjustmentMagenta="${color.colorMix.magenta.hue.toFixed(0)}"`,
          `crs:SaturationAdjustmentMagenta="${color.colorMix.magenta.saturation.toFixed(
            0,
          )}"`,
          `crs:LuminanceAdjustmentMagenta="${color.colorMix.magenta.luminance.toFixed(
            0,
          )}"`,
        ]
      : []),

    ...(color?.colorGrading
      ? [
          `crs:SplitToningShadowHue="${color.colorGrading.shadows.hue.toFixed(
            0,
          )}"`,
          `crs:SplitToningShadowSaturation="${color.colorGrading.shadows.saturation.toFixed(
            0,
          )}"`,
          `crs:ColorGradeShadowLum="${color.colorGrading.shadows.luminance.toFixed(
            0,
          )}"`,
          `crs:ColorGradeMidtoneHue="${color.colorGrading.midtones.hue.toFixed(
            0,
          )}"`,
          `crs:ColorGradeMidtoneSat="${color.colorGrading.midtones.saturation.toFixed(
            0,
          )}"`,
          `crs:ColorGradeMidtoneLum="${color.colorGrading.midtones.luminance.toFixed(
            0,
          )}"`,
          `crs:SplitToningHighlightHue="${color.colorGrading.highlights.hue.toFixed(
            0,
          )}"`,
          `crs:SplitToningHighlightSaturation="${color.colorGrading.highlights.saturation.toFixed(
            0,
          )}"`,
          `crs:ColorGradeHighlightLum="${color.colorGrading.highlights.luminance.toFixed(
            0,
          )}"`,
          `crs:ColorGradeGlobalHue="${color.colorGrading.global.hue.toFixed(
            0,
          )}"`,
          `crs:ColorGradeGlobalSat="${color.colorGrading.global.saturation.toFixed(
            0,
          )}"`,
          `crs:ColorGradeGlobalLum="${color.colorGrading.global.luminance.toFixed(
            0,
          )}"`,
          `crs:ColorGradeBlending="${color.colorGrading.blending.toFixed(0)}"`,
          `crs:SplitToningBalance="${color.colorGrading.balance.toFixed(0)}"`,
        ]
      : []),

    ...(effects?.texture !== undefined
      ? [`crs:Texture="${effects.texture.toFixed(0)}"`]
      : []),

    ...(effects?.clarity !== undefined
      ? [`crs:Clarity2012="${effects.clarity.toFixed(0)}"`]
      : []),

    ...(effects?.dehaze !== undefined
      ? [`crs:Dehaze="${effects.dehaze.toFixed(0)}"`]
      : []),

    ...(effects?.vignette
      ? [
          `crs:OverrideLookVignette="${
            effects.vignette.amount === 0 ? `False` : `True`
          }"`,
          `crs:PostCropVignetteAmount="${effects.vignette.amount.toFixed(0)}"`,

          ...(effects.vignette.amount !== 0
            ? [
                `crs:PostCropVignetteMidpoint="${effects.vignette.midpoint.toFixed(
                  0,
                )}"`,
                `crs:PostCropVignetteRoundness="${effects.vignette.roundness.toFixed(
                  0,
                )}"`,
                `crs:PostCropVignetteFeather="${effects.vignette.feather.toFixed(
                  0,
                )}"`,
                `crs:PostCropVignetteStyle="1"`,
              ]
            : []),

          ...(effects.vignette.amount < 0
            ? [
                `crs:PostCropVignetteHighlightContrast="${effects.vignette.highlights.toFixed(
                  0,
                )}"`,
              ]
            : []),
        ]
      : []),

    ...(effects?.grain
      ? [
          `crs:GrainAmount="${effects.grain.amount.toFixed(0)}"`,

          ...(effects.grain.amount !== 0
            ? [
                `crs:GrainSize="${effects.grain.size.toFixed(0)}"`,
                `crs:GrainFrequency="${effects.grain.roughness.toFixed(0)}"`,
              ]
            : []),
        ]
      : []),

    ...(detail?.sharpening
      ? [
          `crs:Sharpness="${detail.sharpening.amount.toFixed(0)}"`,

          ...(detail.sharpening.amount !== 0
            ? [
                `crs:SharpenRadius="${detail.sharpening.radius.toFixed(1)}"`,
                `crs:SharpenDetail="${detail.sharpening.detail.toFixed(0)}"`,
                `crs:SharpenEdgeMasking="${detail.sharpening.masking.toFixed(
                  0,
                )}"`,
              ]
            : []),
        ]
      : []),

    ...(detail?.noiseReduction
      ? [
          `crs:LuminanceSmoothing="${detail.noiseReduction.amount.toFixed(0)}"`,

          ...(detail.noiseReduction.amount !== 0
            ? [
                `crs:LuminanceNoiseReductionDetail="${detail.noiseReduction.detail.toFixed(
                  0,
                )}"`,
                `crs:LuminanceNoiseReductionContrast="${detail.noiseReduction.contrast.toFixed(
                  0,
                )}"`,
              ]
            : []),
        ]
      : []),

    ...(detail?.colorNoiseReduction
      ? [
          `crs:ColorNoiseReduction="${detail.colorNoiseReduction.amount.toFixed(
            0,
          )}"`,

          ...(detail.colorNoiseReduction.amount !== 0
            ? [
                `crs:ColorNoiseReductionDetail="${detail.colorNoiseReduction.detail.toFixed(
                  0,
                )}"`,
                `crs:ColorNoiseReductionSmoothness="${detail.colorNoiseReduction.smoothness.toFixed(
                  0,
                )}"`,
              ]
            : []),
        ]
      : []),

    ...(optics?.removeChromaticAberration !== undefined
      ? [`crs:AutoLateralCA="${optics.removeChromaticAberration ? 1 : 0}"`]
      : []),

    ...(optics?.enableLensCorrections !== undefined
      ? [
          `crs:LensProfileEnable="${optics.enableLensCorrections ? 1 : 0}"`,
          ...(optics.enableLensCorrections
            ? [`crs:LensProfileSetup="LensDefaults"`]
            : []),
        ]
      : []),

    ...(optics?.defringe
      ? [
          `crs:DefringePurpleAmount="${optics.defringe.purple.amount.toFixed(
            0,
          )}"`,

          ...(optics.defringe.purple.amount !== 0
            ? [
                `crs:DefringePurpleHueLo="${optics.defringe.purple.hueLow.toFixed(
                  0,
                )}"`,
                `crs:DefringePurpleHueHi="${optics.defringe.purple.hueHigh.toFixed(
                  0,
                )}"`,
              ]
            : []),

          `crs:DefringeGreenAmount="${optics.defringe.green.amount.toFixed(
            0,
          )}"`,

          ...(optics.defringe.green.amount !== 0
            ? [
                `crs:DefringeGreenHueLo="${optics.defringe.green.hueLow.toFixed(
                  0,
                )}"`,
                `crs:DefringeGreenHueHi="${optics.defringe.green.hueHigh.toFixed(
                  0,
                )}"`,
              ]
            : []),
        ]
      : []),

    ...(geometry?.upright !== undefined
      ? [
          `crs:PerspectiveUpright="${
            geometry.upright === `Auto`
              ? 1
              : geometry.upright === `Full`
              ? 2
              : geometry.upright === `Level`
              ? 3
              : geometry.upright === `Vertical`
              ? 4
              : 0
          }"`,
        ]
      : []),

    ...(geometry?.manualTransforms
      ? [
          `crs:LensManualDistortionAmount="${geometry.manualTransforms.distortion.toFixed(
            0,
          )}"`,
          `crs:PerspectiveVertical="${geometry.manualTransforms.vertical.toFixed(
            0,
          )}"`,
          `crs:PerspectiveHorizontal="${geometry.manualTransforms.horizontal.toFixed(
            0,
          )}"`,
          `crs:PerspectiveRotate="${geometry.manualTransforms.rotate.toFixed(
            1,
          )}"`,
          `crs:PerspectiveAspect="${geometry.manualTransforms.aspect.toFixed(
            0,
          )}"`,
          `crs:PerspectiveScale="${geometry.manualTransforms.scale.toFixed(
            0,
          )}"`,
          `crs:PerspectiveX="${geometry.manualTransforms.xOffset.toFixed(1)}"`,
          `crs:PerspectiveY="${geometry.manualTransforms.yOffset.toFixed(1)}"`,
        ]
      : []),
  ].join(` `);

const generateUuid = () => uuid().replace(/-/g, ``).toUpperCase();

const generatePresetNameNode = (presetName: string) => [
  `<crs:Name>`,
  `<rdf:Alt>`,
  `<rdf:li xml:lang="x-default">${presetName}</rdf:li>`,
  `</rdf:Alt>`,
  `</crs:Name>`,
];

const generateProfileNode = ({profile}: CameraRawSettings) =>
  profile?.startsWith(`Adobe`)
    ? [
        `<crs:Look>`,
        [
          `<rdf:Description`,
          `crs:Name="${profile}"`,
          `crs:Amount="1"`,
          `crs:UUID="${generateUuid()}"`,
          `crs:SupportsAmount="false"`,
          `crs:SupportsMonochrome="false"`,
          `crs:SupportsOutputReferred="false"`,
          `crs:Stubbed="true"`,
          `/>`,
        ].join(` `),
        `</crs:Look>`,
      ]
    : [];

const generateToneCurve = (
  {light}: CameraRawSettings,
  prefix: '' | 'Red' | 'Green' | 'Blue' = ``,
) => {
  const points = light?.toneCurve?.[`points${prefix}` as const];

  return points
    ? [
        `<crs:ToneCurvePV2012${prefix}>`,
        `<rdf:Seq>`,
        ...points.map(
          ([x, y]) => `<rdf:li>${x.toFixed(0)}, ${y.toFixed(0)}</rdf:li>`,
        ),
        `</rdf:Seq>`,
        `</crs:ToneCurvePV2012${prefix}>`,
      ]
    : [];
};
