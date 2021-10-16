# Changelog

## 1.1.3 (October 16, 2021)

- Updated dependencies as per dependabot security issues. 

## 1.1.2 (October 17, 2020)

- Changed `node_modules` glob pattern to also exclude nested node_modules

## 1.1.1 (September 24, 2020)

- The `ignore-numbers` argument is now properly interpreted as an array of strings.
- The `ignore-numbers` argument is now respected when scanning files.

## 1.1.0 (March 9, 2020)

-  Add `ignore-numbers` argument which takes an array of numbers you want to ignore

## 1.0.4 (December 10, 2019)

- When `luhn-check` is enabled, `scanFile` will now run a luhn check before flagging a file. Previously the luhn check only affected console output logic.
- Upgrade to TypeScript 3.7.3

## 1.0.3 (December 10, 2019)

- Changed `main` property in `package.json` to `build/index.js` to match the ncc build output.

## 1.0.2 (November 13, 2019)

- Build with @zeit/ncc for better performance
- Fix line endings in bin file

## 1.0.1 (November 6, 2019)

Modified `scanFiles` function to return a list of file names where credit card numbers are found.

## 1.0.0 (October 29, 2019)

Initial release! :tada:
