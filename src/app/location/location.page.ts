import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Shops } from './location.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Geolocation } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'Firebase';
import { Area } from './locationarea.model';
import { StorageService } from '../storage.service';



@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latitude: number;
  longitude: number;

  ref: any;
  areas: Area[] = [];
  searchedArea: Area[] = [];
  selectedArea: Area;



  constructor(private firestore: AngularFirestore,
    private toastCtrl: ToastController, private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService) {


  }

  ngOnInit() {
    this.getNearByShops();
  }

  getNearByShops() {
    //this.ref = firebase.database().ref('areas/');

    var areasRef = firebase.database().ref('areas');
    
    areasRef.ref.on('value', resp => {
      this.snapshotToArray(resp);

    });

  }

  snapshotToArray = snapshot => {
    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      //item.key = childSnapshot.key;
      this.areas.push(item);

    });

    console.log(this.areas);

  };


  onInput(input: any) {

    if (input.length > 3) {
      this.searchedArea = [];
      for (var i = 0; i < this.areas.length; i++) {
        var jsonVal = this.areas[i].areadesc;
        if (jsonVal.toLowerCase().includes(input.toLowerCase())) {
          this.searchedArea.push(this.areas[i])
        }
      }

    }

  }



  async showToast(message: any) {
    this.toastCtrl.create({
      message: message,
      duration: 5000
    });
  }


  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    const location = { latitude: this.latitude, longitude: this.longitude };
    console.log("latitude -->" + this.latitude);
    console.log("longitude -->" + this.longitude);

    this.router.navigate(['./folder'], { state: { latitude: this.latitude, longitude: this.longitude } });

  }


  locate(selectedArea: any) {
    //console.log(JSON.stringify(selectedArea));
    this.storage.setString("selectedArea","");
    this.storage.setString("selectedArea", selectedArea);

    this.router.navigate(['./folder']);

  };

  isShopAvailable(){
    var vasteras = { lat: 59.615911, lng: 16.544232 };
    var stockholm = { lat: 59.345635, lng: 18.059707 };

    var n = this.arePointsNear(vasteras, stockholm, 10);

    console.log("isShopAvailable-->"+n);
  }

  arePointsNear(checkPoint, centerPoint, km):any {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }





}
