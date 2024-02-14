import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  menuType:string='default';
  sellerName:string='';
  userName:string='';
  cartItems=0;

  constructor(private route:Router,private product:ProductService) {

  }
  ngOnInit(): void {   
   this.route.events.subscribe((val:any)=>{
    if(val.url){
      if(localStorage.getItem('seller') && val.url.includes('seller')){//to check if we are redirecting to seller page only
        // console.warn("in seller area");
        this.menuType="seller";
        
        if(localStorage.getItem('seller')){
          let sellerStore=localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.menuType='seller';
        }
      }else if(localStorage.getItem('user')){
            let userStore=localStorage.getItem('user');
            let userData =userStore && JSON.parse(userStore);
            this.userName=userData.name;
            this.menuType='user';
            this.product.getCartList(userData[0].id)
      } else{
        
        this.menuType="default";//
      }
    }
   });
   //To update the no of items in the cart(5)
   let cartData = localStorage.getItem('localCart')
   if(cartData){
    this.cartItems= JSON.parse(cartData).length;
   }
   this.product.cartData.subscribe((items)=>{
    this.cartItems = items.length;
   })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['seller-auth'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['user-auth'])
    //cart show no item after logout
    this.product.cartData.emit([])
  }
}
