# Voting DApp

This repository combines a Hardhat project and a Next.js application for a simple blockchain based voting system.

## Install dependencies

```bash
npm install
```

## Run Hardhat tests

```bash
npx hardhat test
```

## Configure `.env.local`

Create a `.env.local` file in the project root and set the address of your deployed `Voting` contract.

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
```

Additional variables can be added here as the project grows.

## Build and start the Next.js app

For a production build run:

```bash
npm run build
npm start
```

During development you can instead use:

```bash
npm run dev
```

## IPFS integration plans

Candidate images are currently referenced by URL. Future updates will store these assets and voting proofs on IPFS. Environment variables for IPFS gateways or API keys will be added to `.env.local` when this functionality lands.
