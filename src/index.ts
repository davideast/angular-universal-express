import 'zone.js/dist/zone-node';
import * as express from 'express';
import { enableProdMode as enableProd } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import * as fs from 'fs';
import { Observable, Observer } from 'rxjs';

export interface ServerConfiguration {
  main: string;
  index: string;
  enableProdMode?: boolean;
  staticDirectory?: string;
  extraOptions?: Array<any>;
}

/**
 * Create a single observable of a file system read
 * @param file the file path to read
 */
function readFile$(file: string): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if(err) { 
        observer.error(err); 
      } else { 
        observer.next(data);
        observer.complete();
      }
    });
  });
}

/**
 * Create the Angular Universal request handler
 * @param config 
 */
export function angularUniversal({ index, main, staticDirectory, enableProdMode = false, extraOptions }: ServerConfiguration) {
  if (enableProdMode) { enableProd(); }
  return (req: express.Request, res: express.Response) => {
    readFile$(index)
      .mergeMap(document => {
        const url = req.path;
        const AppServerModuleNgFactory = require(main).AppServerModuleNgFactory;
        return Observable.from(renderModuleFactory(AppServerModuleNgFactory, { document, url, extraOptions: extraOptions }))
      })
      .take(1)
      .subscribe(html => { res.send(html); });
  };
}
