import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotificationService, ToastEvent} from "../../services/notification.service";

@Component({
  selector: 'app-notification-event-handler',
  templateUrl: './notification-event-handler.component.html',
  styleUrl: './notification-event-handler.component.css'
})
export class NotificationEventHandlerComponent implements OnInit {
  notifications: ToastEvent[] = [];

  constructor(
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.notificationService.toastEvents.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        message: toasts.message,
      };
      this.notifications.push(currentToast);
      this.changeDetectorRef.detectChanges();
    });
  }

  dispose(index: number) {
    this.notifications.splice(index, 1);
    this.changeDetectorRef.detectChanges();
  }
}
