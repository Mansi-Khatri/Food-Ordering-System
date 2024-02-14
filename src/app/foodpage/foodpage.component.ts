import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';



@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrl: './foodpage.component.css'
})
export class FoodpageComponent implements OnInit {
  productData:undefined | product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;
  constructor(private activatedRoute:ActivatedRoute, 
    private product:ProductService){}
    
    ngOnInit():void{
          let productId=this.activatedRoute.snapshot.paramMap.get('productId');
          console.warn(productId);
          productId && this.product.getProduct(productId).subscribe((result)=>{
            console.warn(result);
            this.productData=result;

            //To show remove option
            //for page refresh
            let cartData =localStorage.getItem('localCart');

            if(productId && cartData){
              let items =JSON.parse(cartData);
              //compare the localhost url id with the id in localCart key
              items = items.filter((item:product)=>productId == item.id.toString())
              if(items.length){
                this.cartData=items[0];
                this.removeCart=true
              }else{
                this.removeCart=false
              }
            }
            let user=localStorage.getItem('user');
            //when user logged in cart can be updated on refresh
            if(user){
              let userId = user && JSON.parse(user)[0].id;
              this.product.getCartList(userId);
             this.product.cartData.subscribe((result)=>{
              let item=  result.filter((item:product)=>productId?.toString()===item.productId?.toString())
              if(item.length){
                this.cartData=item[0];
                //after login can show the remove option for which are previously added 
                this.removeCart=true
              }else{
                this.removeCart=false;
              }
             })
             
            }
          })
        }
    

    quantityFun(val:string){
    if(this.productQuantity<10 && val==='max'){
      this.productQuantity += 1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity -= 1;
    }
  }
//user without login
  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      //when user logged out
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart=true
      }
      else{
        //which user is logged in
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user)[0].id;
      
        let cartData:cart={
          ...this.productData,
          userId,
          productId: this.productData.id,
          
        }
        //id of cart but product id needed
        delete cartData.id;

        //api fetch
        this.product.addToCart(cartData).subscribe((result)=>{
          console.warn('result',result)
          if(result){
            this.product.getCartList(userId);
            this.removeCart=true
          }
        })
        }
      } 
    }
 
     
    removeToCart(productId:number){
      if(!localStorage.getItem('user')){
            this.product.removeItemFromCart(productId)
      }else{
        
        console.warn("cartData", this.cartData);
        
        this.cartData && this.product.removeToCart(this.cartData.id)
        .subscribe((result)=>{
          if(result){
            let user = localStorage.getItem('user');
            let userId= user && JSON.parse(user)[0].id;
            this.product.getCartList(userId)
          }
        })
      }
      this.removeCart=false
    }
  }

