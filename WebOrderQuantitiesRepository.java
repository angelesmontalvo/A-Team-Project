package com.ecommerceproj.ecommercebackend;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; 

/**
 * Repository in charge of the CRUD operations for WebOrderQuantities entity. 
 * uses JpaRepository
 * @author Amy Cardenas
 */  

@Repository
public interface WebOrderQuantitiesRepository extends JpaRepository<WebOrderQuantities, Long> {
  
}

