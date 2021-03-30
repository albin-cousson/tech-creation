import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSpacePage } from './user-space';

@NgModule({
  declarations: [
    UserSpacePage,
  ],
  imports: [
    IonicPageModule.forChild(UserSpacePage),
  ],
})
export class UserSpacePageModule {}
