package com.ecommerceproj.ecommercebackend.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebSecurityConfig implements WebMvcConfigurer { 

  @Bean
  public WebMvcConfigurer corsConfigurer(){
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
          registry.addMapping("/**")
                  .allowedOrigins("http://127.0.0.1:5500")
                  .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH" )
                  .allowedHeaders("*")
                  .allowCredentials(true);
      }
    };
  }
  
}
