#!/usr/bin/env node

import { upgradeDependency, Terminal, Resource, FtpClient, Git } from '@metacodi/node-utils';
import { TypescriptParser, TypescriptProject } from '@metacodi/precode';
import chalk from 'chalk';
import Prompt from 'commander';
import * as fs from 'fs';
import ts from 'typescript';

/**
 * **Usage**
 *
 * ```bash
 * npx ts-node precode\publish.ts
 * ```
 * **Login**
 * ```bash
 * npm login --scope=@metacodi --registry=https://npm.pkg.github.com
 * ```
 * 
 * {@link https://docs.github.com/es/packages/working-with-a-github-packages-registry/working-with-the-npm-registry Working with the npm registry}
 */


Terminal.title('PUBLISH');

Prompt
  // .requiredOption('-f, --folder <folder>', 'Ruta absoluta de la carpeta i nom del component.')
  .option('-c, --commit <dir>', 'Descripció pel commit')
  .option('-v, --verbose', 'Log verbose')
  ;
Prompt.parse(process.argv);

if (Prompt.verbose) { console.log('Arguments: ', Prompt.opts()); }

Prompt.folder = Resource.normalize((Prompt.folder || process.cwd()));

const project: TypescriptProject = new TypescriptProject(Prompt.folder);
project.initialize().then(async () => {

  project.incrementPackageVersion();

   // 0) Error: node_modules/@types/node/globals.d.ts:72:13 - error TS2403: Subsequent variable declarations must have the same type. Variable 'AbortSignal'
    // Prenem la interface de node_modules/typescript/lib/lib.dom.d.ts:2335:13 i la substituim a `globals.d.ts`.
    // const parser = new TypescriptParser(`node_modules/@types/node/globals.d.ts`);
    // const variableDeclaration = parser.find((node: ts.Node | ts.Statement) => 
    //   node.kind === ts.SyntaxKind.VariableDeclaration && ((node as ts.VariableDeclaration).name as ts.Identifier).text === 'AbortSignal'
    // , { recursive: true, firstOnly: true }) as ts.VariableDeclaration;
    // const { pos, end } = variableDeclaration.type;
    // const text = `{ prototype: AbortSignal; new(): AbortSignal; abort(reason?: any): AbortSignal; timeout(milliseconds: number): AbortSignal; }`;
    // parser.replacements.push({ start: pos, end, text });
    // parser.save();

  if (Resource.exists(`dist`)) {
    Terminal.log(`Eliminant la carpeta de distribució ${chalk.bold(`dist`)}.`);
    fs.rmSync(`dist`, { recursive: true, force: true });
  }

  Terminal.log(chalk.bold(`Compilant projecte typescript`));
  await Terminal.run(`npm run build`);

  const ok = await Git.publish({ branch: 'main', commit: Prompt.commit });
  if (ok) { Terminal.log(`Git published successfully!`); }

  Terminal.log(`npm publish`);
  await Terminal.run(`npm publish`);

  Terminal.log(chalk.blueBright(`Repositori publicat correctament!`));
  const pkg = Resource.open('package.json');
  Terminal.log(chalk.green(`npm install ` + chalk.bold(`@metacodi/capacitor-electron@${pkg.version}`) + ' --save'));

  Terminal.line();
}).catch((error) => { Terminal.error(error)});
