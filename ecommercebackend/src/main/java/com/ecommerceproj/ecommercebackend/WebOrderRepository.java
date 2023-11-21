package com.ecommerceproj.ecommercebackend;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;  


import java.util.*;

@Repository
public interface WebOrderRepository extends ListCrudRepository<WebOrder, Long> {
  
  List<WebOrder> findByUser(User user);
}

