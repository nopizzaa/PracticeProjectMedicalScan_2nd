import {Component, Input} from '@angular/core';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi-api-client',
  templateUrl: './jitsi-api-client.component.html',
  styleUrl: './jitsi-api-client.component.css'
})
export class JitsiApiClientComponent {
  @Input() meetingRoom!: string;
  @Input() name!: string;

}
