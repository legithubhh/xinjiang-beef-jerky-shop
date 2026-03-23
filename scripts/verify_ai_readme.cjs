#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

function getChangedFiles(mode) {
  try {
    if (mode === 'staged') {
      return execSync('git diff --cached --name-only', { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
    } else {
      try { execSync('git fetch origin main --depth=1', { stdio: 'ignore' }); } catch (e) {}
      let out = '';
      try {
        out = execSync('git diff --name-only origin/main...HEAD', { encoding: 'utf8' });
      } catch (e) {
        out = execSync('git diff --name-only HEAD~1..HEAD', { encoding: 'utf8' });
      }
      return out.split(/\r?\n/).filter(Boolean);
    }
  } catch (e) {
    return [];
  }
}

const mode = process.argv[2];
const changed = getChangedFiles(mode);
if (changed.length === 0) {
  console.log('No changed files detected. Skipping AI_README check.');
  process.exit(0);
}

const aiChanged = changed.includes('AI_README.md');
const nonMd = changed.filter(f => !f.endsWith('.md'));

if (nonMd.length > 0 && !aiChanged) {
  console.error('ERROR: Non-markdown files changed but AI_README.md not included in changes.');
  console.error('Changed files:', changed.join(', '));
  process.exit(1);
}

const mdFilesToCheck = changed.filter(f => f.endsWith('.md') && (
  f.startsWith('docs/') || f === 'README.md' || f.endsWith('README.md')
));

let missingChangeNote = [];
mdFilesToCheck.forEach(path => {
  try {
    const content = fs.readFileSync(path, 'utf8');
    if (!/###\s*变更记录/.test(content) && !/##\s*变更记录/.test(content)) {
      missingChangeNote.push(path);
    }
  } catch (e) {
    // ignore
  }
});

if (missingChangeNote.length > 0) {
  console.error('ERROR: The following markdown files lack a "变更记录" section:', missingChangeNote.join(', '));
  process.exit(1);
}

console.log('AI README check passed.');
process.exit(0);
