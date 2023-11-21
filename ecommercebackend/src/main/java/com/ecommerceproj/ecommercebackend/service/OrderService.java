package com.ecommerceproj.ecommercebackend.service;

import org.springframework.stereotype.Service;

import com.ecommerceproj.ecommercebackend.User;
import com.ecommerceproj.ecommercebackend.WebOrder;
import com.ecommerceproj.ecommercebackend.WebOrderRepository;
import java.util.*;

@Service
public class OrderService { 

  private WebOrderRepository webOrderRepository; 

  public OrderService(WebOrderRepository webOrderRepository){
    this.webOrderRepository = webOrderRepository; 
  }
   
  public List<WebOrder> getOrders(User user){
    return webOrderRepository.findByUser(user);
  }




}
