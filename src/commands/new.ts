import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import * as fs from 'fs-extra';
import * as path from 'path';

export default class New extends Command {
  static description = 'Scaffold a new react native expo app  + redux + magnus-ui';

  static examples = ['$ create-sabelhost-expo new app'];

  static flags = {
    debug: flags.boolean({ char: 'v', description: 'debug output' }),
  };

  static args = [{ name: 'name' }];

  async run() {
    const { args, flags } = this.parse(New);

    this.log('Creating frontend project...');
    const rootFolder = path.join(process.cwd(), args.name);
    const frontendFolder = path.join(rootFolder, args.name);
    fs.mkdirSync(rootFolder);
    execSync(
      'git clone https://github.com/sabelhost/react-native-app.git '+args.name,
      { cwd: rootFolder },
    );
    execSync('rm -rf '+frontendFolder+'/.git', { cwd: rootFolder });

    this.log('install yarn .');
    execSync('npm -g i yarn', { cwd: frontendFolder });
    
    this.log('Installing npm dependencies');
    execSync('yarn', { cwd: frontendFolder });
    this.log('your app is ready now \n cd '+args.name+' \n yarn start ');
    
  }
}
