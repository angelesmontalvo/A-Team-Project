package com.ecommerceproj.ecommercebackend.api.controller.auth.Order;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController; 
import java.util.*;

import com.ecommerceproj.ecommercebackend.Product;
import com.ecommerceproj.ecommercebackend.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController { 

  private ProductService productService; 

  public ProductController(ProductService productService){
    this.productService = productService; 
  } 

  @GetMapping
  public List<Product> getProduct(){
    return productService.getProduct();
  }
  
  
}
