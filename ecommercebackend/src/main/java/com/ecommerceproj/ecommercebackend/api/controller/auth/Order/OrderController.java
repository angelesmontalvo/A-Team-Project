package com.ecommerceproj.ecommercebackend.api.controller.auth.Order;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerceproj.ecommercebackend.User;
import com.ecommerceproj.ecommercebackend.WebOrder;
import com.ecommerceproj.ecommercebackend.service.OrderService; 
import java.util.*;

@RestController
@RequestMapping("/order")
public class OrderController { 

  private OrderService orderService; 

  public OrderController(OrderService orderService){
    this.orderService = orderService; 
  } 

  @GetMapping
  public List<WebOrder> getOrders(@AuthenticationPrincipal User user) {
    return orderService.getOrders(user); 
  }

  
}
