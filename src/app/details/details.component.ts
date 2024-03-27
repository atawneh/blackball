import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { Details } from '../Classes/detalis';
import { Players } from '../Classes/PLayer';
import {Location} from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent  implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  PlayerId :any;
  items:Details[] =[];
  games : number = 0;
  total:number = 0 ;
  PlayerName : string = "";
  item:Details = new Details();
  
  constructor(private afs: AngularFirestore,private _location: Location,private alertController: AlertController) {
    this.getData();
    
   }

   getData(){
     
    this.PlayerId = String(this.route.snapshot.params['id']);
    this.afs.collection('Players').doc(this.PlayerId).ref.onSnapshot(data=>{
      this.games = (<Players>data.data()).games;
      this.PlayerName = (<Players>data.data()).name;
    })
    this.afs.collection('details').ref.where('PlayerId' ,'==', this.PlayerId).onSnapshot(data=>{
    this.items = [];
    this.total = 0;
      data.docs.forEach(item=>{
        var id = item.id;
        this.item = <Details>item.data();
        this.item.id = id;
        this.items.push(<Details>this.item);
        this.total += (<Details>item.data()).price;
      })
      this.total += this.games * 1.5;

    })
   }

  ngOnInit() {}
  addgame(){
    this.games+=1;
    this.total += 1.5;
    this.afs.collection('Players').doc(this.PlayerId).update({total : this.total,games:this.games});
  

  }
  removegame(){
    this.games-=1;
    this.total-= 1.5;
    this.afs.collection('Players').doc(this.PlayerId).update({total : this.total,games:this.games});

  }
  back(){
    this._location.back();
  }
  async presentAlert(item : Details) {
    const alert = await this.alertController.create({
      header: 'هل انت متأكد من الحذف ؟',
      buttons: [
        {
          text: 'لا',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'نعم',
          role: 'confirm',
          handler: () => {
            this.deleteItem(item);
          },
        },
      ],
    });

    await alert.present();

  }
deleteItem(item:Details){
  this.total -= item.price;
  this.afs.collection('Players').doc(this.PlayerId).update({total : this.total}).then(x=>{
    this.afs.collection("details").doc(item.id).delete();
    this.items.forEach( (_item, index) => {
      if(_item === item) this.items.splice(index,1);
    });
  });


}


handleRefresh(event:any) {
  setTimeout(() => {
    this.getData();
    event.target.complete();
  }, 2000);
}

}
