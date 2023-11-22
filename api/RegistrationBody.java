package com.ecommerceproj.ecommercebackend.api;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Registrationbody class is in charge of getting the users information and allow them ro register.
 * @author Amy Cardenas
 */  

public class RegistrationBody {
  
  
  @NotNull
  @NotBlank 
  @Size(min = 3, max = 255)
  private String username; 
  

  @NotNull
  @NotBlank
  @Email
  private String email; 
  
  @NotNull
  @NotBlank 
  @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$")
  @Size(min=6, max=32)
  private String password; 
  
  @NotNull
  @NotBlank
  private String firstName; 
  
  @NotNull
  @NotBlank
  private String lastName;  

  
  /** 
   * @return String
   */
  public String getUsername() {
    return username;
  }

  
  /** 
   * @return String
   */
  public String getEmail() {
    return email;
  }
  
  
  /** 
   * @return String
   */
  public String getPassword() {
    return password;
  }
  
  /** 
   * @return String
   */
  public String getFirstName() {
    return firstName;
  }
  
  /** 
   * @return String
   */
  public String getLastName() {
    return lastName;
  }







}
