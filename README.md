# Polkamarkets

Polkamarkets is an Autonomous Prediction Market Protocol built for multi-chain information exchange and trading, based on Polkadot.

## Project Overview

Our web interface is built with React.

The backend is being developed in partnership with [Bepro.network](https://github.com/bepronetwork), through [`bepro-js`](https://github.com/bepronetwork/bepro-js). You can have a look on our smart contract [here](https://github.com/bepronetwork/bepro-js/blob/feature/prediction-markets/contracts/PredictionMarket.sol).

We're currently running in closed Beta on the Kovan testnet. You can access it at [https://app.polkamarkets.com](https://app.polkamarkets.com)

## Project Setup

### 1. Required software

- [Yarn](https://yarnpkg.com/) (`node v10`)
- MetaMask for [Chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/)

### 2. Installing the app

```
git clone https://github.com/Polkamarkets/polkamarkets-web.git
cd polkamarkets-web
yarn install
```

### 3. Required environment variables

- At the project root create a `.env` file
- Copy the contents of `.env.example` (it has all the required env variables needed for the project)

### 4. Running the app

- Type `yarn start` to start the local server
- Open `http://localhost:3000/` in your browser
