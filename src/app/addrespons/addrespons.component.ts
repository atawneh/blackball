import { Component, Input, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { Players } from '../Classes/PLayer';

@Component({
  selector: 'app-addrespons',
  templateUrl: './addrespons.component.html',
  styleUrls: ['./addrespons.component.scss'],
})
export class AddresponsComponent  implements OnInit {

  PlayerId : any;
  route: ActivatedRoute = inject(ActivatedRoute);
  private total : number = 0;
  constructor(private fireStore: AngularFirestore,private _location: Location) { 
    this.getData();
  }
  getData(){
    this.PlayerId = String(this.route.snapshot.params['id']);
    
    this.fireStore.collection('Players').doc(this.PlayerId).ref.onSnapshot(data=>{
      this.total = 0;
      this.total = (<Players>data.data()).total;
    })
  }
  name : any ;
  @Input() price : number | undefined;
  ngOnInit() {

  }
  async add(){
    this.name = (<HTMLInputElement>document.getElementById('name')).value;
    this.price = parseInt((<HTMLInputElement>document.getElementById('price')).value);
    this.fireStore.collection('details').ref.add({
      name: this.name,
      price:this.price,
      PlayerId:this.PlayerId
    });

    var AllTotal = this.total + this.price;
    this.fireStore.collection('Players').doc(this.PlayerId).update({total : AllTotal}).then(s=>{
      this._location.back();

    });

  
  }
  back(){
    this._location.back();
  }

}
