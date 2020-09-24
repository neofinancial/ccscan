import stripAnsi from 'strip-ansi';

import { scanFiles } from '../src/app';

let consoleLogSpy: jest.SpyInstance;

const formatConsoleOutput = (consoleOutput: string[][]): string[] => {
  return consoleOutput.map((line: string[]): string => stripAnsi(line[0]));
};

beforeAll(() => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('TypeScript', () => {
  test('card numbers are detected', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}' })).toEqual([
      'test/fixtures/typescript/bad.ts'
    ]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(12);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card numbers are detected but ignored numbers are not included', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}', ignoreNumbers: ["5555554240233167"] })).toEqual([
      'test/fixtures/typescript/bad.ts'
    ]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toHaveLength(0)
  });

  test('card numbers are detected in silent mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}', silent: true })
    ).toEqual(['test/fixtures/typescript/bad.ts']);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('card numbers are detected in verbose mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}', verbose: true })
    ).toEqual(['test/fixtures/typescript/bad.ts']);
    expect(consoleLogSpy).toHaveBeenCalledTimes(14);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card-like numbers are detected when luhn check is disabled', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/typescript/*.{ts,js}', luhnCheck : false })
    ).toEqual(['test/fixtures/typescript/bad.ts', 'test/fixtures/typescript/questionable.ts']);
    expect(consoleLogSpy).toHaveBeenCalledTimes(24);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card numbers are not detected when no files match pattern', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/typescript/*.js' })).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });

  test('card numbers are not detected in excluded files', async () => {
    expect(
      await scanFiles({
        files: '**/test/fixtures/typescript/*.{ts,js}',
        exclude: ['test/fixtures/typescript']
      })
    ).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });
});

describe('JavaScript', () => {
  test('card numbers are detected', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}' })).toEqual([
      'test/fixtures/javascript/bad.js'
    ]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(12);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('files with ignored card numbers are not included', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}' , ignoreNumbers: ["5555554240233167"] })).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toHaveLength(0)
  });

  test('card numbers are detected in silent mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}', silent: true })
    ).toEqual(['test/fixtures/javascript/bad.js']);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('card numbers are detected in verbose mode', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}', verbose: true })
    ).toEqual(['test/fixtures/javascript/bad.js']);
    expect(consoleLogSpy).toHaveBeenCalledTimes(14);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card-like numbers are detected when luhn check is disabled', async () => {
    expect(
      await scanFiles({ files: '**/test/fixtures/javascript/*.{ts,js}', luhnCheck: false })
    ).toEqual(['test/fixtures/javascript/bad.js', 'test/fixtures/javascript/questionable.js']);
    expect(consoleLogSpy).toHaveBeenCalledTimes(24);
    expect(formatConsoleOutput(consoleLogSpy.mock.calls)).toMatchSnapshot();
  });

  test('card numbers are not detected when no files match pattern', async () => {
    expect(await scanFiles({ files: '**/test/fixtures/javascript/*.ts' })).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });

  test('card numbers are not detected in excluded files', async () => {
    expect(
      await scanFiles({
        files: '**/test/fixtures/javascript/*.{ts,js}',
        exclude: ['test/fixtures/javascript']
      })
    ).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
  });
});
