import { Component, OnInit } from '@angular/core';
import { priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  totalPrice:number | undefined;
  constructor(private product:ProductService){}
  
   ngOnInit():void{
    this.product.currentCart().subscribe((result)=>{
      //to add total price of products in cart
      let  price =0;
      result.forEach((item)=>{
        if(item.quantity){
        price=price+(+item.price* +item.quantity)//converts the price string val to numeric
      }
    })
      this.totalPrice=price+(price/10)+100-(price/10)
      console.warn(this.totalPrice)
      
      })

   }

  orderNow(data:any){
console.warn(data)
  }

  orderPlaced(){
    Swal.fire("Thank You...",'Your order has been placed successfully 😍','success')
  }
}
