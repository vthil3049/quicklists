import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { ChecklistPage } from '../pages/checklist/checklist';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    /* HomePage */
  /*  ChecklistPage */
  ],
  imports: [
    BrowserModule,
        HttpModule,

    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  /*  HomePage, */
    /* ChecklistPage */
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
