package com.ecommerceproj.ecommercebackend.api.controller.auth.Order;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerceproj.ecommercebackend.OrderConfirmation;
import com.ecommerceproj.ecommercebackend.User;
import com.ecommerceproj.ecommercebackend.WebOrder;
import com.ecommerceproj.ecommercebackend.exception.OrderNotFoundException;
import com.ecommerceproj.ecommercebackend.service.OrderService; 
import java.util.*;

/**
 * class creates endpoints for orderservice. 
 * get orders and confirms orders. 
 * @author Amy Cardenas
 */  


@RestController
@RequestMapping("/order")
public class OrderController { 

  private OrderService orderService; 

  public OrderController(OrderService orderService){
    this.orderService = orderService; 
  } 

  
  /** 
   * @param user
   * @return List<WebOrder>
   */
  @GetMapping
  public List<WebOrder> getOrders(@AuthenticationPrincipal User user) {
    return orderService.getOrders(user); 
  } 

  
  /** 
   * @param orderId
   * @return OrderConfirmation
   * @throws OrderNotFoundException
   */
  @PostMapping("/confirm/{orderId}")
  public OrderConfirmation confirmOrder(@PathVariable Long orderId) throws OrderNotFoundException{
    return orderService.confirmOrder(orderId);
  
} 
}
