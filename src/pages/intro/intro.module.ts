import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroPage } from './intro';
import { HomePage } from '../home/home';
@NgModule({
  declarations: [
    IntroPage,
    
  ],
  imports: [
    IonicPageModule.forChild(IntroPage),
  ],
  exports: [
    IntroPage
  ]
})
export class IntroPageModule {}
