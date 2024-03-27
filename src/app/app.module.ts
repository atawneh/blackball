import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from 'firebase/app';
import {
  doc,
  enableIndexedDbPersistence,
  Firestore,
  FirestoreModule,
  getFirestore,
  provideFirestore,
  
  setDoc
} from '@angular/fire/firestore';

import { environment } from 'src/environments/environment.prod';
import { provideFirebaseApp } from '@angular/fire/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AddComponent } from './Add/add.component';
import { DetailsComponent } from './details/details.component';
import { AddresponsComponent } from './addrespons/addrespons.component';

@NgModule({
  declarations: [AppComponent,AddComponent,DetailsComponent,AddresponsComponent],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),

      ReactiveFormsModule,
      AngularFireModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirestoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
