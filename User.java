package com.ecommerceproj.ecommercebackend;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table; 
import jakarta.persistence.OneToMany; 
import java.util.ArrayList; 
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;  

/**
 * Class that creates user entity/table. 
 *  Class is Connected to mySQLdatabase each with corresponding columns and attributes. 
 * @author Amy Cardenas 
 */ 

@Entity
@Table(name = "user")
public class User { 
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY) 
  @Column(name = "id", nullable = false) 
  private Long id;  

  @Column(name = "username", nullable = false, unique = true)
  private String username; 

  @JsonIgnore
  @Column(name = "password", nullable = false, length = 1000)
  private String password;

  @Column(name = "email", nullable = false, unique = true, length = 500)
  private String email; 

  @Column(name = "first_name", nullable = false)
  private String firstName; 

  @Column(name = "last_name", nullable = false)
  private String lastName; 

  @JsonIgnore
  @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
  private List<Address> addresses = new ArrayList<>(); 


  /** 
   * @return List<Address>
   */
  public List<Address> getAddresses(){
    return addresses;
  } 

  /** 
   * @param addresses
   */
  public void setAddresses(List<Address> addresses){
    this.addresses = addresses;
  }
  
  /** 
   * @return String
   */
  public String getFirstname() {
    return firstName;
  } 

  /** 
   * @param firstName
   */
  public void setFirstname(String firstName){ 
    this.firstName = firstName; 

  }  

   /** 
    * @return String
    */
   public String getLastname() {
    return lastName;
  } 

  
  /** 
   * @param lastName
   */
  public void setLastname(String lastName){ 
    this.lastName = lastName; 

  }  

  /** 
   * @return String
   */
  public String getEmail() {
    return email;
  } 

  /** 
   * @param email
   */
  public void setEmail(String email){ 
    this.email = email; 
  } 
  
  /** 
   * @return String
   */
  public String getPassword() {
    return password;
  } 

  /** 
   * @param password
   */
  public void setPassword(String password){ 
    this.password= password; 

  }  
  
  /** 
   * @return String
   */
  public String getUsername(){
    return username; 
  } 

  /** 
   * @param username
   */
  public void setUsername(String username) {
    this.username = username; 
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
