# Angular Universal Express
A (somehow even simplier) setup for Angular Universal and Express.

## Status
Alpha: This package is in an infant stage. Any usage and feedback is welcome.

## Install
```bash
npm i angular-universal-express
# or
yarn add angular-universal-express
```

## Basic usage
```ts
import { angularUniversal } from 'angular-universal-express';
import * as express from 'express';

const app = express();
/* 
  I usually copy my Angular CLI "dist" build into my "dist-server" build 
  and serve them as static files so they aren't treated as dynamic routes.
*/
app.use(express.static(__dirname + '/dist'));
app.get('/*', angularUniversal({
  index: 'path/to/index.html',
  main: 'path/to/main.<some-long-hash>.bundle',
  enableProdMode: true
}));
app.listen(3005, () => { console.log('Listening on 3005'); });
```

## Contribute!?
```bash
git clone https://github.com/davideast/angular-universal-express.git
# npm setup
npm i 
npm run build
# yarn setup
yarn
yarn build
```
