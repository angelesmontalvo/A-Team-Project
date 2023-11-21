package com.ecommerceproj.ecommercebackend.service;

import org.springframework.stereotype.Service;

import com.ecommerceproj.ecommercebackend.Product;
import com.ecommerceproj.ecommercebackend.ProductRepository; 
import java.util.*;

@Service
public class ProductService { 

  private ProductRepository productRepository; 

  public ProductService(ProductRepository productRepository){
    this.productRepository = productRepository; 
  } 

  public List<Product> getProduct(){
    return productRepository.findAll();
  }


  
}
