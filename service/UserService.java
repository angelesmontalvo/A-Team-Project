package com.ecommerceproj.ecommercebackend.service;

import java.util.Optional;
import org.springframework.stereotype.Service;
import com.ecommerceproj.ecommercebackend.User;
import com.ecommerceproj.ecommercebackend.UserRepository;
import com.ecommerceproj.ecommercebackend.api.LoginBody;
import com.ecommerceproj.ecommercebackend.api.RegistrationBody;
import com.ecommerceproj.ecommercebackend.exception.UserAlreadyExistsException;


/**
 * Service class for User class
 * uses  encryption and jwt to properly register user 
 * and allow user to login. 
 * @author Amy Cardenas
 */ 

@Service
public class UserService {
  
  private UserRepository userRepository; 
  private EncryptionService encryptionService; 
  private JWTService jwtService;

  public UserService(UserRepository userRepository, EncryptionService encryptionService, JWTService jwtService){
    this.userRepository = userRepository;
    this.encryptionService = encryptionService; 
    this.jwtService = jwtService; 
  }
  
  
  /** 
   * @param registrationBody
   * @return User
   * @throws UserAlreadyExistsException
   */
  public User registerUser(RegistrationBody registrationBody) throws UserAlreadyExistsException{ 
    if (userRepository.findByEmailIgnoreCase(registrationBody.getEmail()).isPresent() || 
      userRepository.findByEmailIgnoreCase(registrationBody.getUsername()).isPresent()) {
        throw new UserAlreadyExistsException();
      }

    User user = new User(); 
    user.setEmail(registrationBody.getEmail());
    user.setFirstname(registrationBody.getFirstName());
    user.setLastname(registrationBody.getLastName());
    user.setUsername(registrationBody.getUsername());
   
    user.setPassword(encryptionService.encryptPassword(registrationBody.getPassword()));
    return userRepository.save(user);

  } 
  
  
  /** 
   * @param loginBody
   * @return String
   */
  public String loginUser(LoginBody loginBody) {
    Optional<User> opUser = userRepository.findByUsernameIgnoreCase(loginBody.getUsername()); 
      if(opUser.isPresent()) {
        User user = opUser.get();
        if(encryptionService.verifyPassword(loginBody.getPassword(), user.getPassword())) {
          return jwtService.generateJWT(user);
        }
      } 
      return null;
  }

}
