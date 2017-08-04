# Angular Universal Express Middleware

A (somehow even simplier) setup for Angular Universal and Express.

## Status
This package is in an infant stage. Any usage and feedback is welcome.

## Install
npm i angular-universal-express
# or
yarn add angular-universal-express

## Basic usage

```ts
import { angularUniversal } from 'angular-universal-express';
import * as express from 'express';

const app = express();
// I usually copy my Angular CLI "dist" build into my
// "dist-server" build and serve them as static files
// so they aren't treated as dynamic routes.
app.use(express.static(__dirname + '/dist'));
app.get('/*', angularUniversal({
  index: __dirname + '/index.gen.html',
  main: __dirname + '/main.e32674213d4b38e0b697.bundle',
  enableProdMode: true
}));

app.listen('3005', () => { console.log('Listening on 3005...'); });
```
