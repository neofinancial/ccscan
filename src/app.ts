import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import globby from 'globby';
import yargs, { Argv } from 'yargs';
import luhn from 'fast-luhn';
import lineReader from 'line-reader';

export interface Args {
  exclude?: string[];
  files: string;
  ignoreNumbers?: string[];
  luhnCheck?: boolean;
  silent?: boolean;
  verbose?: boolean;
}

const defaultArgs = {
  exclude: [],
  files: '**/*.{ts,js}',
  ignoreNumbers: [],
  luhnCheck: true,
  silent: false,
  verbose: false,
};

const isCardNumber = (suspect: string, ignoreNumbers?: string[]): boolean => {
  const trimmedSuspect = suspect.replaceAll(/[\s-]+/g, '');

  return !ignoreNumbers?.includes(trimmedSuspect) && luhn(trimmedSuspect);
};

const showMatches = async (
  fileName: string,
  matches: RegExpMatchArray,
  args: Args,
): Promise<void> => {
  return new Promise((resolve): void => {
    const filePath = path.isAbsolute(fileName) ? fileName : path.join(process.cwd(), fileName);
    const outputLines: string[] = [];
    let lineNumber = 0;
    let warning = false;
    let error = false;

    lineReader.eachLine(filePath, (line: string, last?: boolean): void => {
      lineNumber++;

      for (const match of matches) {
        if (new RegExp(`.*${match}.*`).test(line)) {
          const columnNumber = line.search(match) + 1;

          if (args.luhnCheck && isCardNumber(match, args.ignoreNumbers)) {
            error = true;
            outputLines.push(
              `${chalk.gray(`${lineNumber}:${columnNumber}`.padEnd(8))} ${chalk.red(
                'error'.padEnd(6),
              )} ${line.replace(match, chalk.red(match))}`,
            );
          } else if (!args.luhnCheck) {
            if (isCardNumber(match, args.ignoreNumbers)) {
              error = true;
              outputLines.push(
                `${chalk.gray(`${lineNumber}:${columnNumber}`.padEnd(8))} ${chalk.red(
                  'error'.padEnd(6),
                )} ${line.replace(match, chalk.red(match))}`,
              );
            } else {
              warning = true;
              outputLines.push(
                `${chalk.gray(`${lineNumber}:${columnNumber}`.padEnd(8))} ${chalk.yellow(
                  'warn'.padEnd(6),
                )} ${line.replace(match, chalk.yellow(match))}`,
              );
            }
          }

          break;
        }
      }

      if (last) {
        if ((!args.silent && outputLines.length > 0 && error) || (warning && !args.luhnCheck)) {
          console.log(fileName);
          console.log();
          outputLines.forEach((line: string): void => {
            console.log(`  ${line}`);
          });
          console.log();
        }

        resolve();
      }
    });
  });
};

const scanFile = async (fileName: string, args: Args): Promise<boolean> => {
  const contents = fs.readFileSync(fileName, 'utf8');
  const matches = args.luhnCheck
    ? contents.match(/\b[2-6]\d{3}(?:[\s-]*\d{4}){3}[\s-]*\b/gm)
    : contents.match(/\b[1-9]\d{3}(?:[\s-]*\d{4}){3}[\s-]*\b/gm);

  if (matches && matches.length > 0) {
    !args.silent && (await showMatches(fileName, matches, args));

    if (
      !args.luhnCheck ||
      matches.some((match) => isCardNumber(match, args.ignoreNumbers))
    ) {
      return true;
    }
  }

  !args.silent && args.verbose && console.log(chalk.gray(fileName));

  return false;
};

const scanFiles = async (args: Args): Promise<string[]> => {
  const mergedArgs = { ...defaultArgs, ...args };
  const found = [];

  try {
    const pattern = [mergedArgs.files, '!**/node_modules'];

    mergedArgs.exclude &&
      mergedArgs.exclude.forEach((exclude: string): void => {
        pattern.push(`!${exclude}`);
      });

    const files = await globby(pattern);

    for (const fileName of files) {
      if (await scanFile(fileName, mergedArgs)) {
        found.push(fileName);
      }
    }

    return found;
  } catch (error) {
    if (!mergedArgs.silent) {
      throw error;
    }

    return found;
  }
};

const run = async (): Promise<void> => {
  yargs
    .scriptName('ccscan')
    .usage('$0 [files] [options]')
    .command({
      command: '$0 [files] [options]',
      describe: 'Scan files for credit card numbers',
      builder: (yargs): Argv<{ files: string }> =>
        yargs.positional('files', {
          default: '**/*.{ts,js}',
          describe: 'Files to scan',
          type: 'string',
        }),
      handler: async (args: Args): Promise<void> => {
        if ((await scanFiles(args)).length > 0) {
          process.exit(1);
        }
      },
    })
    .demandCommand(1)
    .option('exclude', {
      default: [],
      describe: 'exclude pattern',
      type: 'array',
    })
    .option('ignore-numbers', {
      default: [],
      describe: 'ignore these numbers',
      type: 'array',
      string: true,
    })
    .option('luhn-check', {
      default: true,
      describe: 'check if suspected card number passes the luhn check',
      type: 'boolean',
    })
    .option('silent', {
      describe: 'do not show any output',
      type: 'boolean',
    })
    .option('verbose', {
      describe: 'show all scanned files',
      type: 'boolean',
    })
    .conflicts('silent', 'verbose')
    .help().argv;
};

export default run;
export { run, scanFiles, scanFile, showMatches, isCardNumber };
