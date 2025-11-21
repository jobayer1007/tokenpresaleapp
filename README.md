# TokenPresaleApp

This repo is now split into two self-contained workspaces so the Solidity stack and the React app can be developed and audited independently.

## Structure
- `contracts/` – Solidity sources plus Hardhat/Truffle configs, scripts, and tests.
- `frontend/` – Vite-powered React frontend that consumes the ABI copied from the contracts build.

## Contracts
```bash
cd contracts
npm install
npm run devchain            # ganache-cli on :7545 with persisted data
npm run migrate             # truffle migrate --reset --compile-all --network develop
npm run deploy              # migrate + copy ABI to frontend/src/contracts/contractInfo.json
npm run truffle:test        # run Truffle tests
npm run hardhat:test        # run Hardhat tests (configured for 0.5.x contracts)
```

## Frontend
```bash
cd frontend
npm install
npm run dev    # start Vite dev server
npm run build  # production build
npm run serve  # preview build
```

ABI copying: `contracts/scripts/contractInfo.js` copies `build/contracts/Metacoin.json` into `frontend/src/contracts/contractInfo.json` after migrations so the UI can read the latest contract interface.
