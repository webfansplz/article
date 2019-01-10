# lightercollective

[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A lighter [opencollective](https://github.com/opencollective/opencollective) postinstall alternative.

### Project Goal
Show all necessary info to help contributing to relative [Open Collective](https://opencollective.com) projects, without bringing in the entirety of the [opencollective](https://github.com/opencollective/opencollective-cli) CLI as dependency (an overhead of *24MB* vs *4K* in total for this package).

### How To
If your `package.json` contains, as example, these entries:
```js
{
  "name": "hyperhtml",
  "scripts": {
    "postinstall": "opencollective postinstall"
  },
  "dependencies": {
    "opencollective": "^1.0.3"
  },
  "collective": {
    "type": "opencollective",
    "url": "https://opencollective.com/hyperhtml",
    "logo": "https://opencollective.com/hyperhtml/logo.txt"
  }
}
```

all you need to do is to replace `postinstall` and `dependencies` with `lightercollective`.

```js
{
  "name": "hyperhtml",
  "scripts": {
    "postinstall": "lightercollective"
  },
  "dependencies": {
    "lightercollective": "^0.0.0"
  },
  "collective": {
    "type": "opencollective",
    "url": "https://opencollective.com/hyperhtml",
    "logo": "https://opencollective.com/hyperhtml/logo.txt"
  }
}
```
