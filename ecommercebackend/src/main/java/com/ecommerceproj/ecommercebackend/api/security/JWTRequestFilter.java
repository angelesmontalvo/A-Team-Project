package com.ecommerceproj.ecommercebackend.api.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.ecommerceproj.ecommercebackend.User;
import com.ecommerceproj.ecommercebackend.UserRepository;
import com.ecommerceproj.ecommercebackend.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException; 
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.*;  
import java.io.IOException;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {  

  private JWTService jwtService;
  private UserRepository userRepository;

  public JWTRequestFilter(JWTService jwtService, UserRepository userRepository) {
    this.jwtService = jwtService; 
    this.userRepository = userRepository;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String tokenHeader = request.getHeader("Authorization"); 
    if(tokenHeader != null && tokenHeader.startsWith("Bearer ")){
      String token = tokenHeader.substring(7);
      try{
        String username = jwtService.getUsername(token);
        Optional<User> opUser = userRepository.findByUsernameIgnoreCase(username);
        if(opUser.isPresent()) {
          User user = opUser.get();
          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, new ArrayList());
          authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }

      }catch (JWTDecodeException ex) {
     }
     
    } 
    filterChain.doFilter(request, response);
  }
  
}
