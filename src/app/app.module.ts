import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, FirestoreSettingsToken  } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { Camera } from '@ionic-native/camera/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VisionPage } from './vision/vision.page';
import { HomePage } from './home/home.page';
//import { HomePage } from './home/home.page';

const firebaseConfig = {
  // your config here
  apiKey: "AIzaSyAR2a_lvT1s9iR07n_jntCmNzwYBbNRXm4",
  authDomain: "visionapp-5bc68.firebaseapp.com",
  databaseURL: "https://visionapp-5bc68.firebaseio.com",
  projectId: "visionapp-5bc68",
  storageBucket: "visionapp-5bc68.appspot.com",
  messagingSenderId: "258893784253"

}

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    VisionPage,
  ],
  entryComponents: [
    AppComponent,
    HomePage,
    VisionPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule

  ],

  providers: [{ provide: FirestoreSettingsToken, useValue: {} },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
