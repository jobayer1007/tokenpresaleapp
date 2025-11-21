const fs = require('fs');
const path = require('path');

const contractsRoot = path.join(__dirname, '..');
const sourceAbi = path.join(contractsRoot, 'build', 'contracts', 'Metacoin.json');
const frontendAbi = path.join(contractsRoot, '..', 'frontend', 'src', 'contracts', 'contractInfo.json');

fs.copyFile(sourceAbi, frontendAbi, (err) => {
  if (err) throw err;
  console.log("Contract ABI copied to frontend/src/contracts/contractInfo.json");
});
