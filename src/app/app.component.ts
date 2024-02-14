import { Component } from '@angular/core';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProject';
  constructor(private seller:SellerService){
   
  }
  ngOnInit():void{
    this.seller.reloadSeller()
  }
}
