package com.ecommerceproj.ecommercebackend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 * Repository in charge of the CRUD operations for address entity. 
 * @author Amy Cardenas
 */
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
  
}
