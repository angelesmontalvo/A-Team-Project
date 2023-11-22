package com.ecommerceproj.ecommercebackend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table; 

import java.util.*;

/**
 * Class that creates webOrder entity/table. 
 *  Class is Connected to mySQLdatabase each with corresponding columns and attributes. 
 * @author Amy Cardenas 
 */  

@Entity
@Table(name = "web_order")
public class WebOrder { 

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  @Column(name = "id", nullable = false)
  private Long id;  

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user; 

  @ManyToOne(optional = false)
  @JoinColumn(name = "address_id", nullable = false)
  private Address address; 

  @OneToMany(mappedBy = "order", cascade = CascadeType.REMOVE, orphanRemoval = true)
  private List<WebOrderQuantities> quantities = new ArrayList<>(); 


  
  /** 
   * @return List<WebOrderQuantities>
   */
  public List <WebOrderQuantities> getQuantities(){
    return quantities; 
  } 

  
  /** 
   * @param quantities
   */
  public void setQuantities(List<WebOrderQuantities> quantities) {
    this.quantities = quantities; 
  } 

  
  /** 
   * @return Address
   */
  public Address getAddress(){ 
    return address;

  }  

  
  /** 
   * @param address
   */
  public void setAddress(Address address){ 
    this.address = address; 

  } 

  
  /** 
   * @return User
   */
  public User getUser() { 
    return user; 

  } 
  
  /** 
   * @param user
   */
  public void setUser(User user){ 
    this.user = user; 

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
