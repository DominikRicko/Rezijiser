import { Component, OnInit } from '@angular/core';
import {Notification} from '../../../../_model/notification';
import {NotificationService} from '../../../../_services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationsAll: Notification[] = [];
  notificationsUnchecked: Notification[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.notificationService.getAll().subscribe((data) => {
      this.notificationsAll = data;
      this.notificationsUnchecked = data.filter((notification) => notification.checked === false);
    });
  }

  checkNotification(id: number) {
    this.notificationService.checkNotification(id).subscribe((data) => {
      console.log(data);
      this.refresh();
    });
  }
}
