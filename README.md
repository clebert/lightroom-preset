# Lightroom Preset

[![][ci-badge]][ci-link] [![][version-badge]][version-link] [![][license-badge]][license-link]
[![][types-badge]][types-link] [![][size-badge]][size-link]

[ci-badge]: https://github.com/clebert/lightroom-preset/workflows/CI/badge.svg
[ci-link]: https://github.com/clebert/lightroom-preset
[version-badge]: https://badgen.net/npm/v/lightroom-preset
[version-link]: https://www.npmjs.com/package/lightroom-preset
[license-badge]: https://badgen.net/npm/license/lightroom-preset
[license-link]: https://github.com/clebert/lightroom-preset/blob/master/LICENSE
[types-badge]: https://badgen.net/npm/types/lightroom-preset
[types-link]: https://github.com/clebert/lightroom-preset
[size-badge]: https://badgen.net/bundlephobia/minzip/lightroom-preset
[size-link]: https://bundlephobia.com/result?p=lightroom-preset

A TypeScript API for generating presets for Adobe Lightroom.

## Installation

```
npm install lightroom-preset --save
```

## Usage example

```js
import {writeFileSync} from 'fs';
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
} from 'lightroom-preset';
```

```js
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
```

```js
writeFileSync('./example.xmp', generatePreset('Example', settings));
```

---

Copyright (c) 2021, Clemens Akens. Released under the terms of the
[MIT License](https://github.com/clebert/lightroom-preset/blob/master/LICENSE).
