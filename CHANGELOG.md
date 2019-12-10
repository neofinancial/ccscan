# Changelog

## 1.0.4 (December 10, 2019)

- When luhn-check is enabled, scanFile will now run a luhn check before flagging a file. Previously the luhn check only affected console output logic.
- Upgrade to TypeScript 3.7.3.

## 1.0.3 (December 10, 2019)

- Changed `main` property in `package.json` to `build/index.js` to match the ncc build output.

## 1.0.2 (November 13, 2019)

- Build with @zeit/ncc for better performance
- Fix line endings in bin file

## 1.0.1 (November 6, 2019)

Modified `scanFiles` function to return a list of file names where credit card numbers are found.

## 1.0.0 (October 29, 2019)

Initial release! :tada:
