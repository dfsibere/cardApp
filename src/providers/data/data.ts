import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from "firebase";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    cardsRef:any;
    cards:any = [];
    constructor() {
    }
  //   getCards():void {
  //       return firebase.database().ref('/Cards/').once('value').then(function (snapshot))
  //     this.cardsRef = firebase.database().ref('Cards');
  //     this.cardsRef.on('value', function(snapshot) => {
  //         // console.log(snapshot.val());
  //         // console.log('snap', snapshot.val());
  //         // this.cards = snapshot.val();
  //         // console.log('cards', this.cards);
  //       this.cards = snapshot.val();
  //       return snapshot.val();
  //     });
  // }

    getCards():Promise<any> {
        this.cardsRef = firebase.database().ref('Cards');
        return this.cardsRef.once('value').then(snapshot => {
            return this.snapshotToArray(snapshot);
        });
    }

    snapshotToArray(snapshot) {
        let returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    }

  addCardToDB(newCard):void {
      firebase.database().ref('Cards').push(newCard);
  }

  allCards(snap):void {
      console.log(snap);

  }
}
