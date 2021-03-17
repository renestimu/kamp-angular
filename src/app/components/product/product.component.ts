import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // product1={productId:1,productName:"Bardak",categoryId:1,unitPrice:5,unitsInStock:5};
  // product2={productId:2,productName:"çay",categoryId:1,unitPrice:5,unitsInStock:5};
  // product3={productId:3,productName:"laptop",categoryId:1,unitPrice:5,unitsInStock:5};
  // product4={productId:4,productName:"klavye",categoryId:1,unitPrice:5,unitsInStock:5};
  // product5={productId:5,productName:"monitör",categoryId:1,unitPrice:5,unitsInStock:5};
  // products:Product[]=[this.product1,this.product2,this.product3,this.product4,this.product5];

  products: Product[] = [];
  dataLoaded = false;
  filterText="";
  // productResponseModel:ProductResponseModel={
  //   data:this.products,
  //   message:"",
  //   success:true
  // };

  constructor(private productService: ProductService,private activatedRoute:ActivatedRoute, private toastrService:ToastrService,private cartService:CartService) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"]);
      }else{
        this.getProducts();
      }
    })

    

  }
  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }
  getProductsByCategory(categoryId:number) {
    this.productService.getProductsByCategory(categoryId).subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }
  addToCart(product:Product){
  this.cartService.addToCart(product);

this.toastrService.success("Sepete Eklendi",product.productName);
  }
}
