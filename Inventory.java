package com.ecommerceproj.ecommercebackend;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * Class that creates inventory entity/table in association with product entity.
 *  Class is Connected to mySQLdatabase each with corresponding columns and attributes. 
 * @author Amy Cardenas 
 */

@Entity
@Table(name = "inventory")
public class Inventory {

  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id; 

  @JsonIgnore
  @OneToOne(optional = false, orphanRemoval = true)
  @JoinColumn(name = "product_id", nullable = false, unique = true)
  private Product product;

  @Column(name = "quantity", nullable = false)
  private Integer quantity;   

  
  /** 
   * @return Integer
   */
  public Integer getQuantity() {
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
  public Product getProduct(){
    return product;
  }  

  
  /** 
   * @param product
   */
  public void setProduct(Product product) {
    this.product = product;

  }  

  
  /** 
   * @return Long
   */
  public Long getId() {
    return id;

  } 

  
  /** 
   * @param id
   */
  public void setId(Long id) {
    this.id = id;

  }




  
}
