const { spawn } = require('child_process');
const path = require('path');

const run = async () => {
  const cwd = path.join(__dirname, '..');
  console.log('Deploying and updating contracts...');

  try {
    spawn('truffle migrate --reset --compile-all --network develop && node scripts/contractInfo.js', {
      shell: true,
      stdio: 'inherit',
      cwd,
    });
  } catch (e) {
    console.log(e);
  }
};

run();
