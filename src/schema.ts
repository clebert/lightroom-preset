export const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    autoTone: {type: 'boolean'},
    profile: {type: 'string', minLength: 1},
    light: {$ref: '#/$defs/light'},
    color: {$ref: '#/$defs/color'},
    effects: {$ref: '#/$defs/effects'},
    detail: {$ref: '#/$defs/detail'},
    optics: {$ref: '#/$defs/optics'},
    geometry: {$ref: '#/$defs/geometry'},
  },
  $defs: {
    light: {
      type: 'object',
      additionalProperties: false,
      properties: {
        exposure: {type: 'number', minimum: -5, maximum: 5},
        contrast: {type: 'integer', minimum: -100, maximum: 100},
        highlights: {type: 'integer', minimum: -100, maximum: 100},
        shadows: {type: 'integer', minimum: -100, maximum: 100},
        whites: {type: 'integer', minimum: -100, maximum: 100},
        blacks: {type: 'integer', minimum: -100, maximum: 100},
        toneCurve: {
          oneOf: [
            {$ref: '#/$defs/linearToneCurve'},
            {$ref: '#/$defs/mediumContrastToneCurve'},
            {$ref: '#/$defs/strongContrastToneCurve'},
            {$ref: '#/$defs/customToneCurve'},
          ],
        },
        parametricCurve: {$ref: '#/$defs/parametricCurve'},
      },
    },
    linearToneCurve: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'points', 'pointsRed', 'pointsGreen', 'pointsBlue'],
      properties: {
        name: {const: 'Linear'},
        points: {$ref: '#/$defs/linearToneCurvePoints'},
        pointsRed: {$ref: '#/$defs/linearToneCurvePoints'},
        pointsGreen: {$ref: '#/$defs/linearToneCurvePoints'},
        pointsBlue: {$ref: '#/$defs/linearToneCurvePoints'},
      },
    },
    linearToneCurvePoints: {
      const: [
        [0, 0],
        [255, 255],
      ],
    },
    mediumContrastToneCurve: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'points', 'pointsRed', 'pointsGreen', 'pointsBlue'],
      properties: {
        name: {const: 'Medium Contrast'},
        points: {
          const: [
            [0, 0],
            [32, 22],
            [64, 56],
            [128, 128],
            [192, 196],
            [255, 255],
          ],
        },
        pointsRed: {$ref: '#/$defs/linearToneCurvePoints'},
        pointsGreen: {$ref: '#/$defs/linearToneCurvePoints'},
        pointsBlue: {$ref: '#/$defs/linearToneCurvePoints'},
      },
    },
    strongContrastToneCurve: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'points', 'pointsRed', 'pointsGreen', 'pointsBlue'],
      properties: {
        name: {const: 'Strong Contrast'},
        points: {
          const: [
            [0, 0],
            [32, 16],
            [64, 50],
            [128, 128],
            [192, 202],
            [255, 255],
          ],
        },
        pointsRed: {$ref: '#/$defs/linearToneCurvePoints'},
        pointsGreen: {$ref: '#/$defs/linearToneCurvePoints'},
        pointsBlue: {$ref: '#/$defs/linearToneCurvePoints'},
      },
    },
    customToneCurve: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'points', 'pointsRed', 'pointsGreen', 'pointsBlue'],
      properties: {
        name: {const: 'Custom'},
        points: {$ref: '#/$defs/customToneCurvePoints'},
        pointsRed: {$ref: '#/$defs/customToneCurvePoints'},
        pointsGreen: {$ref: '#/$defs/customToneCurvePoints'},
        pointsBlue: {$ref: '#/$defs/customToneCurvePoints'},
      },
    },
    customToneCurvePoints: {
      type: 'array',
      minItems: 2,
      items: {
        type: 'array',
        minItems: 2,
        maxItems: 2,
        items: {type: 'integer', minimum: 0, maximum: 255},
      },
    },
    parametricCurve: {
      type: 'object',
      additionalProperties: false,
      required: ['shadows', 'darks', 'lights', 'highlights', 'shadowsSplit', 'midtonesSplit', 'highlightsSplit'],
      properties: {
        shadows: {type: 'integer', minimum: -100, maximum: 100},
        darks: {type: 'integer', minimum: -100, maximum: 100},
        lights: {type: 'integer', minimum: -100, maximum: 100},
        highlights: {type: 'integer', minimum: -100, maximum: 100},
        shadowsSplit: {type: 'integer', minimum: 10, maximum: 70},
        midtonesSplit: {type: 'integer', minimum: 20, maximum: 80},
        highlightsSplit: {type: 'integer', minimum: 30, maximum: 90},
      },
    },
    color: {
      type: 'object',
      additionalProperties: false,
      properties: {
        whiteBalance: {
          oneOf: [{$ref: '#/$defs/predefinedWhiteBalance'}, {$ref: '#/$defs/customWhiteBalance'}],
        },
        vibrance: {type: 'integer', minimum: -100, maximum: 100},
        saturation: {type: 'integer', minimum: -100, maximum: 100},
        colorMix: {$ref: '#/$defs/colorMix'},
        colorGrading: {$ref: '#/$defs/colorGrading'},
      },
    },
    predefinedWhiteBalance: {
      type: 'object',
      additionalProperties: false,
      required: ['name'],
      properties: {
        name: {
          enum: ['As Shot', 'Auto', 'Daylight', 'Cloudy', 'Shade', 'Tungsten', 'Fluorescent', 'Flash'],
        },
      },
    },
    customWhiteBalance: {
      type: 'object',
      additionalProperties: false,
      required: ['name', 'temperature', 'tint'],
      properties: {
        name: {const: 'Custom'},
        temperature: {type: 'integer', minimum: 2000, maximum: 50000},
        tint: {type: 'integer', minimum: -150, maximum: 150},
      },
    },
    colorMix: {
      type: 'object',
      additionalProperties: false,
      required: ['red', 'orange', 'yellow', 'green', 'aqua', 'blue', 'purple', 'magenta'],
      properties: {
        red: {$ref: '#/$defs/colorMixAdjustments'},
        orange: {$ref: '#/$defs/colorMixAdjustments'},
        yellow: {$ref: '#/$defs/colorMixAdjustments'},
        green: {$ref: '#/$defs/colorMixAdjustments'},
        aqua: {$ref: '#/$defs/colorMixAdjustments'},
        blue: {$ref: '#/$defs/colorMixAdjustments'},
        purple: {$ref: '#/$defs/colorMixAdjustments'},
        magenta: {$ref: '#/$defs/colorMixAdjustments'},
      },
    },
    colorMixAdjustments: {
      type: 'object',
      additionalProperties: false,
      required: ['hue', 'saturation', 'luminance'],
      properties: {
        hue: {type: 'integer', minimum: -100, maximum: 100},
        saturation: {type: 'integer', minimum: -100, maximum: 100},
        luminance: {type: 'integer', minimum: -100, maximum: 100},
      },
    },
    colorGrading: {
      type: 'object',
      additionalProperties: false,
      required: ['shadows', 'midtones', 'highlights', 'global', 'blending', 'balance'],
      properties: {
        shadows: {$ref: '#/$defs/colorGradingAdjustments'},
        midtones: {$ref: '#/$defs/colorGradingAdjustments'},
        highlights: {$ref: '#/$defs/colorGradingAdjustments'},
        global: {$ref: '#/$defs/colorGradingAdjustments'},
        blending: {type: 'integer', minimum: 0, maximum: 100},
        balance: {type: 'integer', minimum: -100, maximum: 100},
      },
    },
    colorGradingAdjustments: {
      type: 'object',
      additionalProperties: false,
      required: ['hue', 'saturation', 'luminance'],
      properties: {
        hue: {type: 'integer', minimum: 0, maximum: 359},
        saturation: {type: 'integer', minimum: 0, maximum: 100},
        luminance: {type: 'integer', minimum: -100, maximum: 100},
      },
    },
    effects: {
      type: 'object',
      additionalProperties: false,
      properties: {
        texture: {type: 'integer', minimum: -100, maximum: 100},
        clarity: {type: 'integer', minimum: -100, maximum: 100},
        dehaze: {type: 'integer', minimum: -100, maximum: 100},
        vignette: {$ref: '#/$defs/vignette'},
        grain: {$ref: '#/$defs/grain'},
      },
    },
    vignette: {
      type: 'object',
      additionalProperties: false,
      required: ['amount', 'midpoint', 'roundness', 'feather', 'highlights'],
      properties: {
        amount: {type: 'integer', minimum: -100, maximum: 100},
        midpoint: {type: 'integer', minimum: 0, maximum: 100},
        roundness: {type: 'integer', minimum: -100, maximum: 100},
        feather: {type: 'integer', minimum: 0, maximum: 100},
        highlights: {type: 'integer', minimum: 0, maximum: 100},
      },
    },
    grain: {
      type: 'object',
      additionalProperties: false,
      required: ['amount', 'size', 'roughness'],
      properties: {
        amount: {type: 'integer', minimum: 0, maximum: 100},
        size: {type: 'integer', minimum: 0, maximum: 100},
        roughness: {type: 'integer', minimum: 0, maximum: 100},
      },
    },
    detail: {
      type: 'object',
      additionalProperties: false,
      properties: {
        sharpening: {$ref: '#/$defs/sharpening'},
        noiseReduction: {$ref: '#/$defs/noiseReduction'},
        colorNoiseReduction: {$ref: '#/$defs/colorNoiseReduction'},
      },
    },
    sharpening: {
      type: 'object',
      additionalProperties: false,
      required: ['amount', 'radius', 'detail', 'masking'],
      properties: {
        amount: {type: 'integer', minimum: 0, maximum: 150},
        radius: {type: 'number', minimum: 0.5, maximum: 3},
        detail: {type: 'integer', minimum: 0, maximum: 100},
        masking: {type: 'integer', minimum: 0, maximum: 100},
      },
    },
    noiseReduction: {
      type: 'object',
      additionalProperties: false,
      required: ['amount', 'detail', 'contrast'],
      properties: {
        amount: {type: 'integer', minimum: 0, maximum: 100},
        detail: {type: 'integer', minimum: 0, maximum: 100},
        contrast: {type: 'integer', minimum: 0, maximum: 100},
      },
    },
    colorNoiseReduction: {
      type: 'object',
      additionalProperties: false,
      required: ['amount', 'detail', 'smoothness'],
      properties: {
        amount: {type: 'integer', minimum: 0, maximum: 100},
        detail: {type: 'integer', minimum: 0, maximum: 100},
        smoothness: {type: 'integer', minimum: 0, maximum: 100},
      },
    },
    optics: {
      type: 'object',
      additionalProperties: false,
      properties: {
        removeChromaticAberration: {type: 'boolean'},
        enableLensCorrections: {type: 'boolean'},
        defringe: {$ref: '#/$defs/defringe'},
      },
    },
    defringe: {
      type: 'object',
      additionalProperties: false,
      required: ['purple', 'green'],
      properties: {
        purple: {$ref: '#/$defs/defringeAdjustments'},
        green: {$ref: '#/$defs/defringeAdjustments'},
      },
    },
    defringeAdjustments: {
      type: 'object',
      additionalProperties: false,
      required: ['amount', 'hueLow', 'hueHigh'],
      properties: {
        amount: {type: 'integer', minimum: 0, maximum: 20},
        hueLow: {type: 'integer', minimum: 0, maximum: 90},
        hueHigh: {type: 'integer', minimum: 10, maximum: 100},
      },
    },
    geometry: {
      type: 'object',
      additionalProperties: false,
      properties: {
        upright: {enum: ['Off', 'Auto', 'Level', 'Vertical', 'Full']},
        manualTransforms: {$ref: '#/$defs/manualTransforms'},
      },
    },
    manualTransforms: {
      type: 'object',
      additionalProperties: false,
      required: ['distortion', 'vertical', 'horizontal', 'rotate', 'aspect', 'scale', 'xOffset', 'yOffset'],
      properties: {
        distortion: {type: 'integer', minimum: -100, maximum: 100},
        vertical: {type: 'integer', minimum: -100, maximum: 100},
        horizontal: {type: 'integer', minimum: -100, maximum: 100},
        rotate: {type: 'number', minimum: -10, maximum: 10},
        aspect: {type: 'integer', minimum: -100, maximum: 100},
        scale: {type: 'integer', minimum: 50, maximum: 150},
        xOffset: {type: 'number', minimum: -100, maximum: 100},
        yOffset: {type: 'number', minimum: -100, maximum: 100},
      },
    },
  },
};

// Auto-generated types

export type LinearToneCurvePoints = [[0, 0], [255, 255]];
export type CustomToneCurvePoints = [[number, number], [number, number], ...[number, number][]];

export interface CameraRawSettings {
  autoTone?: boolean;
  profile?: string;
  light?: Light;
  color?: Color;
  effects?: Effects;
  detail?: Detail;
  optics?: Optics;
  geometry?: Geometry;
}
export interface Light {
  exposure?: number;
  contrast?: number;
  highlights?: number;
  shadows?: number;
  whites?: number;
  blacks?: number;
  toneCurve?: LinearToneCurve | MediumContrastToneCurve | StrongContrastToneCurve | CustomToneCurve;
  parametricCurve?: ParametricCurve;
}
export interface LinearToneCurve {
  name: 'Linear';
  points: LinearToneCurvePoints;
  pointsRed: LinearToneCurvePoints;
  pointsGreen: LinearToneCurvePoints;
  pointsBlue: LinearToneCurvePoints;
}
export interface MediumContrastToneCurve {
  name: 'Medium Contrast';
  points: [[0, 0], [32, 22], [64, 56], [128, 128], [192, 196], [255, 255]];
  pointsRed: LinearToneCurvePoints;
  pointsGreen: LinearToneCurvePoints;
  pointsBlue: LinearToneCurvePoints;
}
export interface StrongContrastToneCurve {
  name: 'Strong Contrast';
  points: [[0, 0], [32, 16], [64, 50], [128, 128], [192, 202], [255, 255]];
  pointsRed: LinearToneCurvePoints;
  pointsGreen: LinearToneCurvePoints;
  pointsBlue: LinearToneCurvePoints;
}
export interface CustomToneCurve {
  name: 'Custom';
  points: CustomToneCurvePoints;
  pointsRed: CustomToneCurvePoints;
  pointsGreen: CustomToneCurvePoints;
  pointsBlue: CustomToneCurvePoints;
}
export interface ParametricCurve {
  shadows: number;
  darks: number;
  lights: number;
  highlights: number;
  shadowsSplit: number;
  midtonesSplit: number;
  highlightsSplit: number;
}
export interface Color {
  whiteBalance?: PredefinedWhiteBalance | CustomWhiteBalance;
  vibrance?: number;
  saturation?: number;
  colorMix?: ColorMix;
  colorGrading?: ColorGrading;
}
export interface PredefinedWhiteBalance {
  name: 'As Shot' | 'Auto' | 'Daylight' | 'Cloudy' | 'Shade' | 'Tungsten' | 'Fluorescent' | 'Flash';
}
export interface CustomWhiteBalance {
  name: 'Custom';
  temperature: number;
  tint: number;
}
export interface ColorMix {
  red: ColorMixAdjustments;
  orange: ColorMixAdjustments;
  yellow: ColorMixAdjustments;
  green: ColorMixAdjustments;
  aqua: ColorMixAdjustments;
  blue: ColorMixAdjustments;
  purple: ColorMixAdjustments;
  magenta: ColorMixAdjustments;
}
export interface ColorMixAdjustments {
  hue: number;
  saturation: number;
  luminance: number;
}
export interface ColorGrading {
  shadows: ColorGradingAdjustments;
  midtones: ColorGradingAdjustments;
  highlights: ColorGradingAdjustments;
  global: ColorGradingAdjustments;
  blending: number;
  balance: number;
}
export interface ColorGradingAdjustments {
  hue: number;
  saturation: number;
  luminance: number;
}
export interface Effects {
  texture?: number;
  clarity?: number;
  dehaze?: number;
  vignette?: Vignette;
  grain?: Grain;
}
export interface Vignette {
  amount: number;
  midpoint: number;
  roundness: number;
  feather: number;
  highlights: number;
}
export interface Grain {
  amount: number;
  size: number;
  roughness: number;
}
export interface Detail {
  sharpening?: Sharpening;
  noiseReduction?: NoiseReduction;
  colorNoiseReduction?: ColorNoiseReduction;
}
export interface Sharpening {
  amount: number;
  radius: number;
  detail: number;
  masking: number;
}
export interface NoiseReduction {
  amount: number;
  detail: number;
  contrast: number;
}
export interface ColorNoiseReduction {
  amount: number;
  detail: number;
  smoothness: number;
}
export interface Optics {
  removeChromaticAberration?: boolean;
  enableLensCorrections?: boolean;
  defringe?: Defringe;
}
export interface Defringe {
  purple: DefringeAdjustments;
  green: DefringeAdjustments;
}
export interface DefringeAdjustments {
  amount: number;
  hueLow: number;
  hueHigh: number;
}
export interface Geometry {
  upright?: 'Off' | 'Auto' | 'Level' | 'Vertical' | 'Full';
  manualTransforms?: ManualTransforms;
}
export interface ManualTransforms {
  distortion: number;
  vertical: number;
  horizontal: number;
  rotate: number;
  aspect: number;
  scale: number;
  xOffset: number;
  yOffset: number;
}
