const { spawn } = require('child_process');
const path = require('path');

const run = () => {
  const cwd = path.join(__dirname, '..');
  console.log('Starting local dev chain (ganache-cli)...');

  try {
    spawn('ganache-cli -d --db data -i 1337 --port 7545', {
      shell: true,
      stdio: 'inherit',
      cwd,
    });
  } catch (e) {
    console.log(e);
  }
};

run();
