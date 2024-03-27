import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.prod';
import { Firestore, getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AngularFireModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
   

  ],
  bootstrap:[Tab1Page],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
