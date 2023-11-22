package com.ecommerceproj.ecommercebackend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * Test Class to ensure application was properly working with api requests.  
 * @author Amy Cardenas 
 */
@RestController
public class TestController { 
  /** 
   * @return String
   */
  @GetMapping("/message")
  public String getMessage(){
    return "Hello from Spring Boot"; 
  }
  
}
