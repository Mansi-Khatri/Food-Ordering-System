import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { login } from '../data-type';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)//
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient,private router:Router) { }
  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data,
    { observe: 'response' }).subscribe((result) => {
     
      console.warn(result)//make it true so that user is logged in => Behavior fun of RXJS
      if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home']);
      }
    })
  }
  //
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);//this might give error- handled in seller-auth(isError)
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:login){
    // console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    { observe: 'response' }
    ).subscribe((result:any) => {
      // console.warn(result)
      if(result && result.body && result.body.length){//check if the body property and lwngth is >0
      // console.warn("user Logged in");
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home']);
      }else{
      console.warn("login failed")
      this.isLoginError.emit(true)
      }
    })
  }
}

