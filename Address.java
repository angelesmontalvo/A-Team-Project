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
 * Class that creates address entity/table in association with the user class.
 *  Class is Connected to mySQLdatabase each with corresponding columns and attributes. 
 * @author Amy Cardenas 
 */

@Entity
@Table(name="address")
public class Address {  

  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name= "id", nullable = false)
  private Long id; 


  @Column(name = "address_line_1", nullable = false, length = 512)
  private String addressline1; 

  @Column(name = "address_line_2", length = 512)
  private String addressline2; 

  @Column(name = "city", nullable = false)
  private String city; 

  @Column(name = "country", nullable = false, length =75)
  private String country; 

  //user is associated with address 

  @JsonIgnore
  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user; 

  
  /** 
   * @return User
   */
  public User getUser(){
    return user; 
  } 
  
  /** 
   * @param user
   */
  public void setUser(User user){
    this.user = user; 
  } 
  
  /** 
   * @return String
   */
  public String getCountry() {
    return country;
  }  

  /** 
   * @param country
   */
  public void setCountry(String country){
    this.country = country; 
  } 


  
  /** 
   * @return String
   */
  public String geCity(){
    return city; 
  } 

  
  /** 
   * @param city
   */
  public void setCity(String city) {
    this.city = city; 
  } 

  
  /** 
   * @return String
   */
  public String getAddressLine1(){
    return addressline1; 
  } 

  
  /** 
   * @param addressLine1
   */
  public void setAddressLine1(String addressLine1) {
    this.addressline1 = addressLine1; 
  }  
  
  /** 
   * @return String
   */
  public String getAddressLine2(){
    return addressline2;
  } 

  
  /** 
   * @param addressLine2
   */
  public void setAdressLine2(String addressLine2) {
    this.addressline2 = addressLine2;
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
