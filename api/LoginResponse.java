package com.ecommerceproj.ecommercebackend.api;



/**
 * loginresponse class is in charge of assigning a jwt token to user when they login.
 * @author Amy Cardenas
 */  

public class LoginResponse { 

    private String jwt; 

    /** 
     * @return String
     */
    public String getJwt() {
      return jwt;
    } 

    
    /** 
     * @param jwt
     */
    public void setJwt(String jwt) {
      this.jwt = jwt; 
    }

}
