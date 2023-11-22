package com.ecommerceproj.ecommercebackend;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;  
import java.util.*;


/**
 * Repository in charge of the CRUD operations for Weborder entity. 
 * @author Amy Cardenas
 */ 
@Repository
public interface WebOrderRepository extends ListCrudRepository<WebOrder, Long> {
  
  List<WebOrder> findByUser(User user);
}

