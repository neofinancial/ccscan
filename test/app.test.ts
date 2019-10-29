import stripAnsi from 'strip-ansi';

import { scanFiles } from '../src/app';

let consoleLogSpy: jest.SpyInstance;

const formatConsoleOutput = (consoleOutput: string[][]): string[] => {
  return consoleOutput.map((line: string[]): string => stripAnsi(line[0]));
}

beforeAll(() => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('TypeScript', () => {
  test('card numbers are detected', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}' })).toEqual(true);
    expect(consoleLogSpy).toHaveBeenCalledTimes(12);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card numbers are detected in silent mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}', silent: true })
    ).toEqual(true);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('card numbers are detected in verbose mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}', verbose: true })
    ).toEqual(true);
    expect(consoleLogSpy).toHaveBeenCalledTimes(14);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card-like numbers are detected when luhn check is disabled', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}', 'luhn-check': false })
    ).toEqual(true);
    expect(consoleLogSpy).toHaveBeenCalledTimes(23);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card numbers are not detected when no files match pattern', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/typescript/*.js' })).toEqual(false);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });

  test('card numbers are not detected in excluded files', async () => {
    expect(
      await scanFiles({
        files: '**/test/fixtures/typescript/*.{ts,js}',
        exclude: ['test/fixtures/typescript']
      })
    ).toEqual(false);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });
});

describe('JavaScript', () => {
  test('card numbers are detected', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}' })).toEqual(true);
    expect(consoleLogSpy).toHaveBeenCalledTimes(12);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card numbers are detected in silent mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}', silent: true })
    ).toEqual(true);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('card numbers are detected in verbose mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}', verbose: true })
    ).toEqual(true);
    expect(consoleLogSpy).toHaveBeenCalledTimes(14);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card-like numbers are detected when luhn check is disabled', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}', 'luhn-check': false })
    ).toEqual(true);
    expect(consoleLogSpy).toHaveBeenCalledTimes(23);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card numbers are not detected when no files match pattern', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/javascript/*.ts' })).toEqual(false);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });

  test('card numbers are not detected in excluded files', async () => {
    expect(
      await scanFiles({
        files: '**/test/fixtures/javascript/*.{ts,js}',
        exclude: ['test/fixtures/javascript']
      })
    ).toEqual(false);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });
});
