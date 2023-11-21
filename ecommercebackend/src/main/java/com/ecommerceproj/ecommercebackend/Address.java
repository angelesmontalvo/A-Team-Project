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


  public User getUser(){
    return user; 
  } 

  public void setUser(User user){
    this.user = user; 
  } 


  public String getCountry() {
    return country;
  }  

  public void setCountry(String country){
    this.country = country; 
  } 

  public String geCity(){
    return city; 
  } 

  public void setCity(String city) {
    this.city = city; 
  } 

  public String getAddressLine1(){
    return addressline1; 
  } 

  public void setAddressLine1(String addressLine1) {
    this.addressline1 = addressLine1; 
  }  

  public String getAddressLine2(){
    return addressline2;
  } 

  public void setAdressLine2(String addressLine2) {
    this.addressline2 = addressLine2;
  } 

  public Long getId() {
    return id;
  } 

  public void setId(Long id) {
    this.id = id; 
  }
  
}
