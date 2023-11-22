package com.ecommerceproj.ecommercebackend.service;

import org.springframework.stereotype.Service;

import com.ecommerceproj.ecommercebackend.OrderConfirmation;
import com.ecommerceproj.ecommercebackend.User;
import com.ecommerceproj.ecommercebackend.WebOrder;
import com.ecommerceproj.ecommercebackend.WebOrderRepository;
import com.ecommerceproj.ecommercebackend.exception.OrderNotFoundException;
import java.util.*;


/**
 * Service class for order class  
 * uses orderclass to get orders and confirm user of their order 
 * @author Amy Cardenas
 */  

@Service
public class OrderService { 

  private WebOrderRepository webOrderRepository; 

  public OrderService(WebOrderRepository webOrderRepository){
    this.webOrderRepository = webOrderRepository; 
  }
   
  
  /** 
   * @param user
   * @return List<WebOrder>
   */
  public List<WebOrder> getOrders(User user){
    return webOrderRepository.findByUser(user);
  }

  
  /** 
   * @param orderId
   * @return OrderConfirmation
   * @throws OrderNotFoundException
   */
  public OrderConfirmation confirmOrder(Long orderId) throws OrderNotFoundException {
      Optional<WebOrder> order = webOrderRepository.findById(orderId); 

      if(order.isPresent()){
        OrderConfirmation confirmation = new OrderConfirmation(); 
        confirmation.setOrderNumber(order.get().getId());  

        return confirmation; 
      } else {

        throw new OrderNotFoundException(); 
      }
  }


} 

