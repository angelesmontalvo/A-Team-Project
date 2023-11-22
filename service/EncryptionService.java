package com.ecommerceproj.ecommercebackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;


/**
 * Service class for encryption of users password 
 * uses saltrounds to encrypt and verify users password  
 * @author Amy Cardenas
 */ 


@Service
public class EncryptionService {
  
    @Value("${encryption.salt.rounds}")
    private int saltRounds;


    private String salt; 


    @PostConstruct
    public void postConstruct(){
      salt = BCrypt.gensalt(saltRounds);
    } 
    
    /** 
     * @param password
     * @return String
     */
    public String encryptPassword(String password) {
      return BCrypt.hashpw(password, salt);
    } 

    
    /** 
     * @param password
     * @param hash
     * @return boolean
     */
    public boolean verifyPassword(String password, String hash){
      return BCrypt.checkpw(password, hash);
    }

}