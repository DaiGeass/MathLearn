#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to the compiled Rust binary
let binName = 'mathlearn-backend';
if (process.platform === 'win32') {
  binName += '.exe';
}

const binPath = path.join(__dirname, '..', 'rust-backend', 'target', 'release', binName);

if (!fs.existsSync(binPath)) {
  console.log('📦 Compilando el backend de Rust para producción por primera vez (esto puede tomar un momento)...');
  const build = spawn('cargo', ['build', '--release'], {
    cwd: path.join(__dirname, '..', 'rust-backend'),
    stdio: 'inherit'
  });

  build.on('close', (code) => {
    if (code !== 0) {
      console.error('❌ Error compilando el backend de Rust.');
      process.exit(1);
    }
    runBinary();
  });
} else {
  runBinary();
}

function runBinary() {
  const args = process.argv.slice(2);
  const child = spawn(binPath, args, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });

  child.on('close', (code) => {
    process.exit(code);
  });
}
