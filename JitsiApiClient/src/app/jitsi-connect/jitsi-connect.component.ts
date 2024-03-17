import {Component, OnInit} from '@angular/core';

declare var JitsiMeetJS: any;

@Component({
  selector: 'app-jitsi-connect',
  templateUrl: './jitsi-connect.component.html',
  styleUrl: './jitsi-connect.component.css'
})
export class JitsiConnectComponent implements OnInit{

  ngOnInit(): void {
    const testConfig = {
      hosts: {
        domain: 'meet.jit.si',

        muc: 'conference.meet.jit.si', // FIXME: use XEP-0030
        focus: 'focus.meet.jit.si',
      },
      serviceUrl: 'wss://meet.jit.si/xmpp-websocket',
      disableSimulcast: false,
      enableRemb: true,
      enableTcc: true,
      resolution: 720,
      constraints: {
        video: {
          height: {
            ideal: 720,
            max: 720,
            min: 180
          },
          width: {
            ideal: 1280,
            max: 1280,
            min: 320
          }
        }
      },
      enableInsecureRoomNameWarning: true,
      externalConnectUrl: 'https://meet.jit.si/http-pre-bind',
      analytics: {
        amplitudeAPPKey: "fafdba4c3b47fe5f151060ca37f02d2f",
        whiteListedEvents: ['conference.joined', 'page.reload.scheduled', 'rejoined', 'transport.stats'],
      },
      enableP2P: true, // flag to control P2P connections
      // New P2P options
      p2p: {
        enabled: true,
        preferH264: true,
        disableH264: true,
        useStunTurn: true // use XEP-0215 to fetch STUN and TURN servers for the P2P connection
      },
      useStunTurn: true, // use XEP-0215 to fetch TURN servers for the JVB connection
      useTurnUdp: false,
      websocket: 'wss://meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
      clientNode: 'http://jitsi.org/jitsimeet', // The name of client node advertised in XEP-0115 'c' stanza
      //deprecated desktop sharing settings, included only because older version of jitsi-meet require them
      desktopSharing: 'ext', // Desktop sharing method. Can be set to 'ext', 'webrtc' or false to disable.
      desktopSharingSources: ['screen', 'window'],
      enableCalendarIntegration: true,
      //new desktop sharing settings
      desktopSharingChromeDisabled: false,
      desktopSharingFirefoxDisabled: false,
      useRoomAsSharedDocumentName: false,
      enableLipSync: false,
      disableRtx: false, // Enables RTX everywhere
      enableScreenshotCapture: false,
      openBridgeChannel: 'websocket', // One of true, 'datachannel', or 'websocket'
      channelLastN: -1, // The default value of the channel attribute last-n.
      startBitrate: "800",
      disableAudioLevels: false,
      disableSuspendVideo: true,
      stereo: false,
      forceJVB121Ratio: -1,
      enableTalkWhileMuted: true,
      enableNoAudioDetection: true,
      enableNoisyMicDetection: true,
      enableClosePage: true,
      disableLocalVideoFlip: true,
      hiddenDomain: 'recorder.meet.jit.si',
    }

    JitsiMeetJS.init();

    const connection = new JitsiMeetJS.JitsiConnection(null, null, testConfig);
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
