<div align="center">
  <h1 align="center">Angular Universal Express</h1>
  <p align="center">
    A (somehow even simplier) setup for Angular Universal and Express.
  </p>
</div>

## Status
Alpha: This package is in an infant stage. Any usage and feedback is welcome.

## Install
```bash
npm i angular-universal-express
# or
yarn add angular-universal-express
```

## Basic usage (TypeScript)
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

## Setup
There are two parts to an Angular Universal app: the **server build** and the **server**.

### Server Build
The current RC version of the Angular CLI covers the server build. [Follow these steps to setup the CLI to get a server build.](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/universal-rendering.md)

#### Build both browser and server Angular builds
At this point you should have two app entries in your `angularcli.json` file: **browser** and **server**. The browser build writes to the `dist` folder and the server build writes to the `dist-server` folder. 

#### Delete `dist/index.html`. 
This index file is uneeded because Angular Universal uses the assets in `dist-server` to generate the initial HTML.

#### Copy `dist` to `dist-server/dist`

The server responds to requests from the browser. There are two types of requests to handle: dynamic and static. For dynamic routes Express will respond with HTML generated from Angular Universal. But for static routes you don't want to run Angular Universal. 

For this example, copying the contents of `dist` into `dist-server/dist` will allow you to set up a static directory for `dist-server/dist`. This way Express won't treat those requests as dynamic.

### Server

In your Angular CLI project create a `server` folder and an `index.js` file inside of it.

```js
const { angularUniversal } = require('angular-universal-express');
const express = require('express');

const app = express();
// This will treat each file in `/dist` as static. However, it will not
// map the URL for the request to "/dist/file.js". It actually treats 
// the files in "/dist" as if they are at the root. This means the
// request is actually "file.js" rather than "dist/file.js". 
app.use(express.static(__dirname + '/dist'));
app.get('/*', angularUniversal({
  index: 'path/to/index.html',
  main: 'path/to/main.<some-long-hash>.bundle',
  enableProdMode: true
}));
app.listen(3005, () => { console.log('Listening on 3005'); });
```

#### Run

```bash
node dist-server/index.js
# site will serve on localhost:3005
```

## Deploying

Angular Universal Express can be run on any node.js host. See the list below for setting up specific hosts:
- [Firebase Hosting + Cloud Functions](https://github.com/davideast/angular-universal-express-firebase)
- Contribute more!


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
