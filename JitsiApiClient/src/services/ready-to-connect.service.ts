import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReadyToConnectService {
  isConnectionReady: Observable<boolean>;
  private _isConnectionReady = new Subject<boolean>();

  constructor() {
    this.isConnectionReady = this._isConnectionReady.asObservable();
  }

  setConnectionIsReady(value: boolean) {
    this._isConnectionReady.next(value);
  }
}
