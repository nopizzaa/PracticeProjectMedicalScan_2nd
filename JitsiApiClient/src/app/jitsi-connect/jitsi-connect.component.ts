import {Component, OnInit} from '@angular/core';

declare var JitsiMeetJS: any;

@Component({
  selector: 'app-jitsi-connect',
  templateUrl: './jitsi-connect.component.html',
  styleUrl: './jitsi-connect.component.css'
})
export class JitsiConnectComponent implements OnInit{

  ngOnInit(): void {
    JitsiMeetJS.init();

    const connection = new JitsiMeetJS.JitsiConnection(null, null, {hosts: {domain: 'meet.jit.si'}});
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, () => {
      console.log(connection);
    });
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, () => {
      console.log('The connection failed.');
    });
    connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, () => {
      console.log("Connection disconnected");
    });

    connection.connect();
  }
}
