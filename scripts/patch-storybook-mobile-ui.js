const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@storybook',
  'react-native-ui',
  'dist',
  'index.js',
);

if (!fs.existsSync(filePath)) {
  process.exit(0);
}

const source = fs.readFileSync(filePath, 'utf8');
const before = `if (open) {
\t\t\tshouldScrollOnOpen.current = true;
\t\t\tmenuBottomSheetRef.current?.snapToIndex(1);
\t\t} else {`;

const after = `if (open) {
\t\t\tshouldScrollOnOpen.current = true;
\t\t\tmenuBottomSheetRef.current?.snapToIndex(1);
\t\t\trequestAnimationFrame(() => {
\t\t\t\tmenuBottomSheetRef.current?.snapToIndex(1);
\t\t\t});
\t\t\tsetTimeout(() => {
\t\t\t\tmenuBottomSheetRef.current?.snapToIndex(1);
\t\t\t}, 80);
\t\t} else {`;

if (!source.includes(before) || source.includes('setTimeout(() => {\n\t\t\t\tmenuBottomSheetRef.current?.snapToIndex(1);')) {
  process.exit(0);
}

fs.writeFileSync(filePath, source.replace(before, after));
