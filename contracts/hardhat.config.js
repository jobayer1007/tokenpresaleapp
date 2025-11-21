require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: {
    compilers: [
      { version: '0.5.16' }, // for MetaCoin sample + legacy contracts
      { version: '0.8.20' }, // ready for newer work
    ],
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};
