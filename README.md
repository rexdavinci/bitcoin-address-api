## Bitcoin Wallet API
A wallet service that can be used to generate
1. bitcoin (HD) segwit addresses from a specified derivation path. Requires 
    - `path` (e.g m/84'/0'/0'/0)
    - `seed` (mnemonic phrase)

2. bitcoin multisig m-of-n (P2SH) segwit addresses. Requires
    - `n` (total number of eligible signers)
    - `m` (number of required signatures necessary to perform a multisig transaction)
    - `publicKeys` (an array of public keys of all eligible signers)
    (e.g a multisig that has 4 eligible signers and requires 3 signatures will have `n` = 4 and `m`= 3)

## API Documentation
For a detailed information on how to use the application, check the [documentation](https://documenter.getpostman.com/view/6617513/UVsSLNEA).


## Local Usage
1. Clone from github to your local machine
2. To work on your local copy
    - use command `npm install` to install dependencies and also build the application.
    - use command `cp .env.example .env` and adjust the variables to your preference.
    - use command `npm run dev` to start development server.

To run the production build, use:
```
$ npm start
```

### Test

Tests are run built with [jest (ts-jest)](https://kulshekhar.github.io/ts-jest/).

```
$ npm test
```

## References
[bitcoinjs](https://www.npmjs.com/package/bitcoinjs-lib)

