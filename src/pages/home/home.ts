import { Component } from '@angular/core';
import { IonicPage, AlertController, Platform, NavController } from 'ionic-angular';
import { ChecklistModel } from '../../models/checklist-model';
import { DataProvider } from '../../providers/data/data';
import { Keyboard } from '@ionic-native/keyboard';
import { Storage } from '@ionic/storage';
//import { ChecklistPage } from '../checklist/checklist';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  checklists: ChecklistModel[] = [];
  constructor(public nav: NavController,public dataService: DataProvider,
    public alertCtrl: AlertController, public storage: Storage, public platform: Platform,
    public keyboard:  Keyboard) {

    }

    ionViewDidLoad() {
      this.platform.ready().then(() => {
        //this.storage.clear();

        this.storage.get('introShown').then((result) => {
          if(!result){
            this.storage.set('introShown', true);
            this.nav.setRoot('IntroPage');
          }
        });

        this.dataService.getData().then((checklists) => {
          let savedChecklists: any = false;
          if(typeof(checklists) != "undefined"){
            savedChecklists = JSON.parse(checklists);
          }
          if(savedChecklists){
            savedChecklists.forEach((savedChecklist) => {
              let loadChecklist = new ChecklistModel(savedChecklist.title,
                savedChecklist.items);
                this.checklists.push(loadChecklist);
                loadChecklist.checklistUpdates().subscribe(update => {
                  this.save();
                });

              });
            }
          });
        });
      }

      addChecklist(): void {
        let prompt = this.alertCtrl.create({
          title: 'New Checklist',
          message: 'Enter the name of your new checklist below:',
          inputs: [
            {
              name: 'name'
            }
          ],
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Save',
              handler: data => {
                let newChecklist = new ChecklistModel(data.name, []);
                this.checklists.push(newChecklist);
                newChecklist.checklistUpdates().subscribe(update => {
                  this.save();
                });
                this.save();

              }
            }
          ]
        });
        prompt.present();
      }

      renameChecklist(checklist): void {
        let prompt = this.alertCtrl.create({
          title: 'Rename Checklist',
          message: 'Enter the new name of this checklist below:',
          inputs: [
            {
              name: 'name'
            }
          ],
          buttons: [
            {
              text: 'Cancel'
            },
            {
              text: 'Save',
              handler: data => {
                let index = this.checklists.indexOf(checklist);
                if(index > -1){
                  this.checklists[index].setTitle(data.name);
                  this.save();
                }
              }
            }
          ]
        });

        prompt.present();

      }
      viewChecklist(checklist): void {
        this.nav.push('ChecklistPage', {
          checklist: checklist
        });
      }
      removeChecklist(checklist): void{
        let index = this.checklists.indexOf(checklist);
        if(index > -1){
          this.checklists.splice(index, 1);

          this.save();
        }

      }

      save(): void{
        this.keyboard.close();
        this.dataService.save(this.checklists);
      }
    }
