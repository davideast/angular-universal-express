import 'zone.js/dist/zone-node';
import * as express from 'express';
import { renderModuleFactory } from '@angular/platform-server';
import * as fs from 'fs';
import { Observable, Observer } from 'rxjs';

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

export function angularUniversal({ index, main }: { index: string, main: string }) {
  return (req: express.Request, res: express.Response) => {
    readFile$(index)
      .mergeMap(document => {
        const url = req.path;
        const AppServerModuleNgFactory = require(main).AppServerModuleNgFactory;
        return Observable.from(renderModuleFactory(AppServerModuleNgFactory, { document, url }))
      })
      .take(1)
      .subscribe(html => {
        res.send(html);
      });
  };
}
