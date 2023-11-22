package com.ecommerceproj.ecommercebackend.service;

import org.springframework.stereotype.Service;

import com.ecommerceproj.ecommercebackend.Product;
import com.ecommerceproj.ecommercebackend.ProductRepository; 
import java.util.*;

/**
 * Service class for product class 
 * gets products and returns it as a list 
 * @author Amy Cardenas
 */ 

@Service
public class ProductService { 

  private ProductRepository productRepository; 

  public ProductService(ProductRepository productRepository){
    this.productRepository = productRepository; 
  } 

  
  /** 
   * @return List<Product>
   */
  public List<Product> getProduct(){
    return productRepository.findAll();
  }


  
}
