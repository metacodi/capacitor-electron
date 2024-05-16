import { Terminal, upgradeDependency } from '@metacodi/node-utils';
import chalk from 'chalk';
import Prompt from 'commander';


/**
 * **Usage**
 *
 * ```bash
 * npx ts-node precode/upgrade-metacodi-dependencies.ts
 * ```
 */

Terminal.title('UPGRADE METACODI');
 
Prompt
  // .requiredOption('-f, --folder <folder>', 'Ruta absoluta de la carpeta i nom del component.')
  // .option('-c, --commit <dir>', 'Descripció pel commit')
  .option('-v, --verbose', 'Log verbose')
;
Prompt.parse(process.argv);

if (Prompt.verbose) { console.log('Arguments: ', Prompt.opts()); }

(async () => {

  try {
  
    Terminal.log(`Actualitzant dependències de ${chalk.bold(`@metacodi`)}`);
    
    await upgradeDependency(`@metacodi/node-api-client`, '-D');
    await upgradeDependency(`@metacodi/node-utils`, '-D');
    await upgradeDependency(`@metacodi/precode`, '-D');

    Terminal.log(`Dependències actualitzades correctament!`);

  } catch (error) {
    Terminal.error(error);
  }

})();
