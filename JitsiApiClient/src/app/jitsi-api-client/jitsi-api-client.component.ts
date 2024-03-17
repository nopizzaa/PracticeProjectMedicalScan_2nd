import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {ReadyToConnectService} from "../../services/ready-to-connect.service";
import {NotificationService} from "../../services/notification.service";

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
export class JitsiApiClientComponent implements OnInit, AfterContentInit{
  @Input() meetingRoom!: string;
  @Input() name!: string;

  options: any;
  api: any;

  roomInfo: any;
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
    private notificationService: NotificationService,
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
    this.notificationService.showInfoToast(`Welcome! ${this.name}`);

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
    this.notificationService.showInfoToast(`Call is ended`);
  }

  handleParticipantLeft = async (participant: any) => {
    this.notificationService.showInfoToast(`Participant left: ${participant.formattedDisplayName}`);
  }

  handleParticipantJoined = async (participant: any) => {
    this.notificationService.showInfoToast(`New participant has joined: ${participant.formattedDisplayName}`);
  }

  handleHandleIncomingMessage = async (message: any) => {
    this.notificationService.showInfoToast(`${message.nick}: ${message.message}`);
  }

  handleAudioMuteStatusChanged = (audio: any) :void => {
    this.isAudioMuted = audio.muted;

    if (this.isAudioMuted)
      this.notificationService.showInfoToast('Microphone is off');
    else
      this.notificationService.showInfoToast('Microphone is on');
  }

  handleVideoMuteStatusChanged = (video: any) :void => {
    this.isVideoMuted = video.muted;

    if (this.isVideoMuted)
      this.notificationService.showInfoToast('Camera is off');
    else
      this.notificationService.showInfoToast('Camera is on');
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
      this.notificationService.showInfoToast(`Call is ended`);
      this.showComponentService.setConnectionIsReady(false);
      return;
    }
  }
}
