import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { Shops } from '../location/location.model';
import { Area } from '../location/locationarea.model';
import { StorageService } from '../storage.service';
import * as firebase from 'Firebase';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public latitude: string;
  public longitude: string;

  area: any;
  //shops: any;
  ref: any;
  products : any;
  shops: Shops[]= [];
  headerTitle: any="---";

  constructor(private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: StorageService) {
      
      //firebase.initializeApp(environment.firebaseConfig);
  }

  ngOnInit() {

    this.storage.getString("selectedArea").then((data: any) => {
      console.log("data.value="+data.value);
      this.getNearByShops(data.value);
    });
    //this.folder = this.activatedRoute.snapshot.paramMap.get('id');

  }

  getNearByShops(id: any) {


    var ref = firebase.database().ref("areas");
    console.log(id);
    ref.orderByChild('id').equalTo(id).once('child_added').then((snapshot) => {
         this.headerTitle= snapshot.child("areadesc").val();
         this.shops = snapshot.child("shops").val();
         
         for(var i=0;i<this.shops.length;i++){
            console.log(this.shops[i]);
            //var hasName = snapshot.child("shops").child(i+"").hasChild("products");
            console.log(snapshot.child("shops").child(i+"").child("products").val());
         }
         console.log(this.shops)
    });
    
    
    //this.shops = Array.of(this.shops); 
   
  }


  showProducts(shoplist: any) {
    //console.log(area["area"]);
    for(var i=1;i<shoplist.length;i++){
      console.log(shoplist[i]);
    }

  }

  async showToast(message: any) {
    this.toastCtrl.create({
      message: message,
      duration: 5000
    });
  }


  showCart() {
    console.log("showing cart :");
    this.router.navigate(['./cart']);
  }
}
