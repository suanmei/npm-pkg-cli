#!/usr/bin/env node

const chalk = require('chalk');
const semver = require('semver');
const requiredVersion = require('../package').engines.node;

function checkNodeVersion (wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ));
    process.exit(1);
  }
}

checkNodeVersion(requiredVersion, 'npm-pkg-cli');

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]');

program
  .command('create <package-name>')
  .description('create a new project powered by npm-pkg-cli-service')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .option('-d, --default', 'Skip prompts and use default preset')
  .action((name, cmd) => {
    // todo
  });

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`vue <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
