## Bitcoin Address Generator
Generates 
1. Bitcoin segwit addresses. Requires `path` and `seed`.
2. Bitcoin multisig m-of-n (P2SH) segwit addresses. Requires `m`, `n` and `publikKeys`.


---
## API Documentation
For a detailed information about how to use the application, 
> visit [bitcoin-address-api documentation](https://documenter.getpostman.com/view/6617513/UVsSLNEA)
___

## Local Usage
1. Clone from github to your local machine
2. Work on your local copy
&nbsp; - use command `npm install` to install dependencies.
&nbsp; - use command `cp .env.example .env` and adjust the variables to your preference.
3. use command `npm run dev` to start development server.

To run the production build, use:
```
$ npm run tsc
$ npm start
```

### Test
---
Tests are run built with [jest (ts-jest)](https://kulshekhar.github.io/ts-jest/).

```
$ npm test
```
