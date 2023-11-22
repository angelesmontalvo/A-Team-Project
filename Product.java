package com.ecommerceproj.ecommercebackend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType; 
import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


/**
 * Class that creates product entity/table .
 *  Class is Connected to mySQLdatabase each with corresponding columns and attributes. 
 * @author Amy Cardenas 
 */

@Entity
@Table(name = "product")
public class Product { 

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id; 

  @Column(name = "name", nullable = false, unique = false)
  private String name; 

  @Column(name = "short_description", nullable = false)
  private String shortDescription; 

  @Column(name = "price", nullable = false)
  private Double price;  

  @OneToOne(mappedBy = "product", cascade = CascadeType.REMOVE, optional = false, orphanRemoval = true)
  private Inventory inventory; 

  
  /** 
   * @return Inventory
   */
  public Inventory geInventory() {
    return inventory; 
  } 

  
  /** 
   * @param inventory
   */
  public void setInventory(Inventory inventory){
    this.inventory = inventory; 
  } 

  
  /** 
   * @return Double
   */
  public Double getPrice() {
    return price; 
  } 

  
  /** 
   * @param price
   */
  public void setPrice(Double price){
    this.price = price; 

  } 

  
  /** 
   * @return String
   */
  public String getShortDescription(){
    return shortDescription; 
  } 

  
  /** 
   * @param shortDescription
   */
  public void setShortDesciption(String shortDescription){
    this.shortDescription = shortDescription; 

  } 

  
  /** 
   * @return String
   */
  public String getName(){
    return name;
  } 

  
  /** 
   * @param name
   */
  public void setName(String name){
    this.name = name; 
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
  public void setId(Long id) {
    this.id = id;
  }






  
}
