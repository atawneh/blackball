import { Component, Input, OnInit } from '@angular/core';
import { firebaseApp$ } from '@angular/fire/app';
import { Observable } from 'rxjs';
import { Players } from '../Classes/PLayer';
import { Firestore, collection, collectionData, doc, getDocFromCache } from '@angular/fire/firestore';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  ArrayIds: string[] = [];
  item: Players = new Players();
  player: Players[] = [];
  @Input() search_word : string ='';
  constructor(private afs: AngularFirestore,private alertController: AlertController) {
  }
  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.afs.collection('Players').ref.orderBy('date',"desc").onSnapshot(data => {
      this.player = [];
      data.forEach(item => {
        var id = item.id;
        this.item = <Players>item.data();
        this.item.id = id;
        this.player.push(this.item);
      })
    });
  }
  async NewDataBase() {
    const alert = await this.alertController.create({
      cssClass:"delete_alert",
      header: 'هل انت متأكد من حذف جميع المشتركين؟',
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
            this.player.forEach(item=>{
              this.afs.collection("Players").ref.doc(item.id).delete();

            })
          },
        },
      ],
    });

    await alert.present();

  }
  async presentAlert(item : Players) {
    const alert = await this.alertController.create({
      cssClass:"delete_alert",
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
            this.afs.collection("Players").doc(item.id).delete();
            this.player.forEach( (_item, index) => {
              if(_item === item) this.player.splice(index,1);
            });
          },
        },
      ],
    });

    await alert.present();

  }

  setResult(ev:any,item:Players) {
    if(ev.detail.role=='confirm'){

    }

  }
  search(){

    if(this.search_word?.length){
      this.player = this.player.filter(a=>a.name.includes(this.search_word));
    }
    else this.getData();
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.getData();
      event.target.complete();
    }, 2000);
  }



}
