const fs = require('fs');
const path = require('path');

const packagePath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@react-native-community',
  'blur',
  'package.json',
);

if (!fs.existsSync(packagePath)) {
  process.exit(0);
}

const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

packageJson.codegenConfig = {
  ...packageJson.codegenConfig,
  ios: {
    ...packageJson.codegenConfig?.ios,
    componentProvider: {
      ...packageJson.codegenConfig?.ios?.componentProvider,
      BlurView: 'BlurView',
      VibrancyView: 'VibrancyView',
    },
  },
};

fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
