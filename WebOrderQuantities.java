package com.ecommerceproj.ecommercebackend;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table; 

/**
 * Class that creates webOrderQuantities entity/table. 
 *  Class is Connected to mySQLdatabase each with corresponding columns and attributes. 
 * @author Amy Cardenas 
 */ 

@Entity
@Table(name = "web_order_quantities")
public class WebOrderQuantities {  

  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  private Long id;  

  @ManyToOne(optional = false)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product; 

  @Column(name = "quantity", nullable = false)
  private Integer quantity; 

  @JsonIgnore
  @ManyToOne(optional = false)
  @JoinColumn(name = "order_id", nullable = false)
  private WebOrder order; 

  
  /** 
   * @return WebOrder
   */
  public WebOrder getOrder(){
    return order; 
  } 

  
  /** 
   * @param order
   */
  public void setOrder(WebOrder order){
    this.order = order; 
  } 

  
  /** 
   * @return Integer
   */
  public Integer getQuantity(){
    return quantity;
  } 

  
  /** 
   * @param quantity
   */
  public void setQuantity(Integer quantity){
    this.quantity = quantity; 
  } 

  
  /** 
   * @return Product
   */
  public Product getProduct() {
    return product;
  } 

  
  /** 
   * @param product
   */
  public void setProduct(Product product){
    this.product = product; 
  } 

  
  /** 
   * @return Long
   */
  public Long getId(){
    return id; 
  } 

  
  /** 
   * @param id
   */
  public void setId(Long id){
    this.id = id; 
  } 
  
}
