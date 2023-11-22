package com.ecommerceproj.ecommercebackend.api.controller.auth;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerceproj.ecommercebackend.User;
import com.ecommerceproj.ecommercebackend.api.LoginBody;
import com.ecommerceproj.ecommercebackend.api.LoginResponse;
import com.ecommerceproj.ecommercebackend.api.RegistrationBody;
import com.ecommerceproj.ecommercebackend.exception.UserAlreadyExistsException;
import com.ecommerceproj.ecommercebackend.service.UserService;
import jakarta.validation.Valid; 


/**
 * class creates endpoints to authorize user registration and login
 * @author Amy Cardenas
 */  

@RestController 
@RequestMapping("/auth")
public class AuthenticationController {  

  private UserService userService; 

  public AuthenticationController(UserService userService){
    this.userService = userService;
  }

  
  /** 
   * @param registrationBody
   * @return ResponseEntity
   */
  @PostMapping("/register")
  public ResponseEntity registerUser(@Valid @RequestBody RegistrationBody registrationBody){

    try {
      userService.registerUser(registrationBody); 
      return ResponseEntity.ok().build();
    } catch (UserAlreadyExistsException ex) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    } 
  }   

  
  /** 
   * @param loginBody
   * @return ResponseEntity<LoginResponse>
   */
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginBody loginBody) {
      String jwt = userService.loginUser(loginBody);
      if(jwt == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
      } else {
        LoginResponse response = new LoginResponse();
        response.setJwt(jwt);
        return ResponseEntity.ok(response);
      }
  } 

  
  /** 
   * @param user
   * @return User
   */
  @GetMapping("/me")
  public User getProfile(@AuthenticationPrincipal User user){
    return user; 
  }

}


