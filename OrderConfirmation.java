package com.ecommerceproj.ecommercebackend;


/**
 * Class that creates orderconfirmation for a users order. 
 * @author Amy Cardenas 
 */ 

public class OrderConfirmation {
  
  private Long orderNumber; 
  /** 
   * @return Long
   */
  public Long getOrderNumber(){
    return orderNumber;
  } 

  
  /** 
   * @param orderNumber
   */
  public void setOrderNumber(Long orderNumber) {
    this.orderNumber = orderNumber; 
  } 


}
