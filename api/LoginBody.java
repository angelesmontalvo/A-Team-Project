package com.ecommerceproj.ecommercebackend.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * loginbody class is in charge of getting username and password from user when logging in.
 * @author Amy Cardenas
 */  

public class LoginBody {
  
  @NotNull
  @NotBlank
  private String username; 

  @NotNull 
  @NotBlank 
  private String password; 

  
  /** 
   * @return String
   */
  public String getPassword(){
    return password; 
  }  

  
  /** 
   * @return String
   */
  public String getUsername(){
    return username; 
  }



}
