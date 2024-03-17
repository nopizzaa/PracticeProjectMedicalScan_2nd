import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ReadyToConnectService} from "../../services/ready-to-connect.service";

@Component({
  selector: 'app-jitsi-connect',
  templateUrl: './jitsi-connect.component.html',
  styleUrl: './jitsi-connect.component.css'
})
export class JitsiConnectComponent implements OnInit{
  connectForm: any;
  isConnectFormInvalid: boolean = true;
  showJitsiClientComponent: boolean = false;

  name = '';
  meetingRoom = '';

  constructor(
    private formBuilder: FormBuilder,
    private readyToConnectServiceService: ReadyToConnectService
  ) {}

  ngOnInit(): void {
    this.connectForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      meetingRoom: ['', [Validators.required]],
    });

    this.connectForm.valueChanges.subscribe((): void => {
      this.isConnectFormInvalid = this.connectForm.invalid;
    });

    this.readyToConnectServiceService.isConnectionReady.subscribe((value): void => {
      this.showJitsiClientComponent = value;
    });
  }

  get connectFormControl() {
    return this.connectForm.controls;
  }

  onSubmit() :void {
    if (this.connectForm?.valid) {
      this.name = this.connectForm.value.name;
      this.meetingRoom = this.connectForm.value.meetingRoom;
      this.readyToConnectServiceService.setConnectionIsReady(true);
    }
  }
}
