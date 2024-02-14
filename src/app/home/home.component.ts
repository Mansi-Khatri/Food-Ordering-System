import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 trendyProducts:undefined | product[];


  constructor( private router:ActivatedRoute, private product:ProductService){
 }
  ngOnInit(): void {
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
}

  
}
