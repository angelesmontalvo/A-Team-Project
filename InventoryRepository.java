package com.ecommerceproj.ecommercebackend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository in charge of the CRUD operations for Inventory entity. 
 * uses JPArepository. 
 * @author Amy Cardenas
 */
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
  
}


