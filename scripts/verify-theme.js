#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REQUIRED_PATHS = [
  'layout/theme.liquid',
  'templates/index.json',
  'sections/header.liquid',
  'sections/footer.liquid',
  'config/settings_schema.json',
  'config/settings_data.json',
  'assets/theme.css',
  'assets/theme.js',
  'locales/en.default.json'
];

function ensureExists(filePath) {
  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) {
    throw new Error(`Missing required theme file: ${filePath}`);
  }
}

function validateJson(filePath) {
  const absolute = path.resolve(filePath);
  try {
    JSON.parse(fs.readFileSync(absolute, 'utf8'));
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
  }
}

function validateSettingsSchema() {
  const schemaPath = path.resolve('config/settings_schema.json');
  const contents = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  if (!Array.isArray(contents) || contents.length === 0) {
    throw new Error('config/settings_schema.json must define at least one settings group.');
  }
}

function main() {
  REQUIRED_PATHS.forEach(ensureExists);
  ['templates/index.json', 'config/settings_schema.json', 'config/settings_data.json', 'locales/en.default.json'].forEach(validateJson);
  validateSettingsSchema();
  console.log('✓ Shopify theme structure looks good.');
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
