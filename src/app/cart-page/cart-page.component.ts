
import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';



@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData:cart[] | undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
  

  constructor(private product: ProductService, private router: Router){}

  ngOnInit(): void {
   this.loadDetails()
  }

  loadDetails(){

    this.product.currentCart().subscribe((result)=>{
      this.cartData=result;
      //to add total price of products in cart
      let  price =0;
      result.forEach((item)=>{
        if(item.quantity){
        price=price+(+item.price* +item.quantity)//converts the price string val to numeric
      }
    })
      //apply dis, tax etc to total price
      this.priceSummary.price=price;
      this.priceSummary.discount=price / 10;
      this.priceSummary.tax=price/5;
      this.priceSummary.delivery=100;
      this.priceSummary.total=this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount;
      
      
      })
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }
  removeToCart(cartId:number | undefined){
    cartId  && this.cartData && this.product.removeToCart(cartId)
        .subscribe((result)=>{
          this.loadDetails()
       
        })
    
  }
 
}


