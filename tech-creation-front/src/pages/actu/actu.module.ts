import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActuPage } from './actu';

@NgModule({
  declarations: [
    ActuPage,
  ],
  imports: [
    IonicPageModule.forChild(ActuPage),
  ],
})
export class ActuPageModule {}
