import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ToastEvent {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toastEvents: Observable<ToastEvent>;
  private _toastEvents = new Subject<ToastEvent>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showInfoToast(message: string) :void {
    this._toastEvents.next({
      message,
    });
  }
}
