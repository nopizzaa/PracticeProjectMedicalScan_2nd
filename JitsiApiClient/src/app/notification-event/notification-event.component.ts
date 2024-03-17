import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Toast} from "bootstrap";
import {fromEvent, take} from "rxjs";

@Component({
  selector: 'app-notification-event',
  templateUrl: './notification-event.component.html',
  styleUrl: './notification-event.component.css'
})
export class NotificationEventComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', {static: true})
  toastEl!: ElementRef;

  @Input()
  message!: string;

  toast!: Toast;

  ngOnInit() {
    this.show();
  }

  show() {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      {
        delay: 15000,
      }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
