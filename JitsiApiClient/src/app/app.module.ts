import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JitsiConnectComponent } from './jitsi-connect/jitsi-connect.component';
import {RouterModule} from "@angular/router";
import { JitsiApiClientComponent } from './jitsi-api-client/jitsi-api-client.component';

@NgModule({
  declarations: [
    AppComponent,
    JitsiConnectComponent,
    JitsiApiClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: JitsiConnectComponent, pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
