import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from 'firebase/app';
import { Timestamp, addDoc, collection, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment.prod';
import {Location} from '@angular/common';
import { timestamp } from 'rxjs';
import * as firebase from 'firebase/compat';

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent  implements OnInit {
player : any;

  constructor(private fireStore: AngularFirestore,private _location: Location) { }
  name : any ;
  
  ngOnInit() {}
  async add(){
    this.player = this.fireStore.collection<any>('Players');
    this.name = (<HTMLInputElement>document.getElementById('name')).value;
    const docRef = await addDoc(collection(db, "Players"), {
      name: this.name,
      date:Date.now().valueOf(),
      total:0,
      games : 0

    });
    this._location.back();
  
  }
  back(){
    this._location.back();

  }

}
