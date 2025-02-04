# ccscan

[![Build status](https://github.com/neofinancial/config-dug/workflows/CI/badge.svg)](https://github.com/neofinancial/ccscan/actions)
![TypeScript 3.5.3](https://img.shields.io/badge/TypeScript-3.5.3-brightgreen.svg)
[![codecov.io](https://codecov.io/github/neofinancial/ccscan/coverage.svg)](https://codecov.io/github/neofinancial/ccscan)

Scan files for credit card numbers

## Usage

### `npx ccscan`

### Precommit Hook

You can also add `ccscan` to your project and set it up as a precommit hook that will block any commits that contain card numbers.

#### Add to `package.json`

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.{ts,tsx,js}": [
    "ccscan",
    "git add"
  ]
}
```

## Contributing

1. Fork this repo
1. Clone the forked repo
1. Install dependencies: `npm i`

### Building

#### `npm run build`

To clean the build directory run `npm run clean`

### Running Tests

#### `npm run test`

## Publishing

1. Update the version in `package.json`
1. Add a `CHANGELOG.md` entry
1. Commit your changes
1. Run `npm pack` to see what will be published then delete the `.tgz` file that was created
1. Run `npm publish`
1. Create a release on GitHub. Use the version as the tag and release name. For example for version `1.0.0` the tag and release name would be `v1.0.0`.
