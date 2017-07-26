import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { ChecklistPage } from '../checklist/checklist';
@NgModule({
  declarations: [
    HomePage,
    //ChecklistPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}