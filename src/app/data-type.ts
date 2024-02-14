export interface SignUp {
    name: string;
    email: string;
    password: string;
  }

  export interface login {
    email: String;
    password: String;
  }

  export interface product {
    name:string,
    price:number,
    category:string,
    time:number,
    image:string,
    id:number,
    quantity:undefined |number,
    productId:undefined | number
  }

  export interface cart{
    name:string,
    price:number,
    category:string,
    time:number,
    image:string,
    id:number | undefined,
    quantity:undefined |number,
    userId:number,
    productId:number

  }

  export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
  }
  