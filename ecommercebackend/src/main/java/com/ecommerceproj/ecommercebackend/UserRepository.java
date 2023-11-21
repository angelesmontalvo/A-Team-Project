package com.ecommerceproj.ecommercebackend;


import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface UserRepository extends ListCrudRepository<User, Long> { 

  Optional<User> findByUsernameIgnoreCase(String username); 

  Optional<User> findByEmailIgnoreCase(String email); 

  
}
