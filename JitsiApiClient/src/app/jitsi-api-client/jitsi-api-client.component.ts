import {Component, Input} from '@angular/core';
import {ReadyToConnectService} from "../../services/ready-to-connect.service";

declare var JitsiMeetExternalAPI: any;

const jitsiDomain : string = 'meet.jit.si';

const commandEndCall :string = 'hangup';
const commandToggleMic :string = 'toggleAudio';
const commandToggleCamera :string = 'toggleVideo';
const commandToggleShareScreen :string = 'toggleShareScreen';
const commandMuteEveryone :string = 'muteEveryone';

@Component({
  selector: 'app-jitsi-api-client',
  templateUrl: './jitsi-api-client.component.html',
  styleUrl: './jitsi-api-client.component.css'
})
export class JitsiApiClientComponent {
  @Input() meetingRoom!: string;
  @Input() name!: string;

  options: any;
  api: any;

  roomInfo: any;
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
    private showComponentService: ReadyToConnectService
  ) {}

  ngOnInit(): void {
    this.options = {
      roomName: this.meetingRoom,
      width: '100%',
      height: '500pt',
      configOverwrite: {prejoinPageEnabled: false},
      noSsl: true,
      interfaceConfigOverwrite: {},
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.name
      }
    }
  }

  ngAfterContentInit() : void {
    this.api = new JitsiMeetExternalAPI(jitsiDomain, this.options);

    this.api.addEventListeners({
      readyToClose: this.handleReadyToClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      audioMuteStatusChanged: this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged: this.handleVideoMuteStatusChanged,
      incomingMessage: this.handleHandleIncomingMessage
    });
  }

  handleReadyToClose = () => {
    console.log(`Call is ended`);
  }

  handleParticipantLeft = async (participant: any) => {
    console.log(`Participant left: ${participant.formattedDisplayName}`);
  }

  handleParticipantJoined = async (participant: any) => {
    console.log(`New participant has joined: ${participant.formattedDisplayName}`);
  }

  handleHandleIncomingMessage = async (message: any) => {
    console.log(`${message.nick}: ${message.message}`);
  }

  handleAudioMuteStatusChanged = (audio: any) :void => {
    this.isAudioMuted = audio.muted;
  }

  handleVideoMuteStatusChanged = (video: any) :void => {
    this.isVideoMuted = video.muted;
  }

  getRoomInformation() {
    return new Promise((resolve, reject) :void => {
      setTimeout(() :void => {
        resolve(this.api.getRoomsInfo()); // get all participants
      }, 500)
    });
  }

  onEndCall() :void {
    this.executeJitsiCommand(commandEndCall);
  }

  onToggleMic() :void {
    this.executeJitsiCommand(commandToggleMic);
  }

  onToggleCamera() :void {
    this.executeJitsiCommand(commandToggleCamera);
  }

  onShareScreen() :void {
    this.executeJitsiCommand(commandToggleShareScreen);
  }

  onMuteEveryone() :void {
    this.executeJitsiCommand(commandMuteEveryone);
  }

  onGetRoomInformation() :void {
    this.getRoomInformation().then((info: any) =>{
      this.roomInfo = info
    });
  }

  executeJitsiCommand(command: string) {
    this.api.executeCommand(command);

    if(command === commandEndCall) {
      this.showComponentService.setConnectionIsReady(false);
      return;
    }
  }
}
