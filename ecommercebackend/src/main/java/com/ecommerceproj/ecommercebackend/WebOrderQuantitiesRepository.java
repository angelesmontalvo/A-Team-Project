package com.ecommerceproj.ecommercebackend;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebOrderQuantitiesRepository extends JpaRepository<WebOrderQuantities, Long> {
  
}

