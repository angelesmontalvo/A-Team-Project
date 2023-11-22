package com.ecommerceproj.ecommercebackend;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository in charge of the CRUD operations for Inventory entity. 
 * uses JPArepository. 
 * @author Amy Cardenas
 */
@Repository
public interface ProductRepository extends ListCrudRepository<Product, Long> {
  
}


