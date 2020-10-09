import { Component, OnInit,ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements OnInit {
  @ViewChild('setupslides', {static: true}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  footerView : boolean = true;

  topStories: any;
  slideChanged(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
      
      let slideLength = this.topStories.length;
       if(index==(slideLength-1)){
          this.footerView = false;
        }else{
          this.footerView = true;
        }
    });
  }
  
  constructor() {
    this.topStories = [
      {title: "Tasty meat nearby your location", picture: "assets/setupwizard/First.jpg"},
      {title: "Certified with multiple quality checks", picture: "assets/setupwizard/Second.jpg"},
      {title: "Professional cut, cleaned and packed", picture: "assets/setupwizard/Third.jpg"},
      {title: "Deliver in given time",picture: "assets/setupwizard/Fourth.jpg"}
    ]
  }
  ngOnInit(): void {
  }


  

}
