import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrashCan,faSquarePen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit{
  productList:undefined | product[];//to get the values of
  productMessage:undefined | string;
  icon=faTrashCan;
  editicon=faSquarePen;
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.list()
  }

deleteProduct(id:number){
  console.warn("test id",id)
  this.product.deleteProduct(id).subscribe((result)=>{
     if(result){
      this.productMessage="Product is deleted";
      this.list();
     }
  })

  setTimeout(()=>{
     this.productMessage=undefined;
  },3000)
}

list(){
  this.product.productList().subscribe((result)=>{
    console.warn(result)
    this.productList=result;
  })
}
}
