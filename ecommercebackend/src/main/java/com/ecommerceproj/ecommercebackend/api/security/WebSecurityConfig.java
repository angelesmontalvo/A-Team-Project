package com.ecommerceproj.ecommercebackend.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; 
import org.springframework.security.web.access.intercept.AuthorizationFilter;


@Configuration 
@EnableWebSecurity
public class WebSecurityConfig implements WebMvcConfigurer {  

    private JWTRequestFilter jwtRequestFilter; 

    public WebSecurityConfig(JWTRequestFilter jwtRequestFilter){
      this.jwtRequestFilter = jwtRequestFilter;
    }

    //CORS configuration
      @Override
      public void addCorsMappings(CorsRegistry registry) {
          registry.addMapping("/**")
                  .allowedOrigins("http://127.0.0.1:5500")
                  .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH" )
                  .allowedHeaders("*")
                  .allowCredentials(true);
      } 

      @Bean
      public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable(); 
            
          http
          .addFilterBefore(jwtRequestFilter, AuthorizationFilter.class);
          http
            .authorizeHttpRequests()
            .requestMatchers("/product", "/auth/register", "/auth/login")
            .permitAll()
            .anyRequest()
            .authenticated();
          return http.build();
      }
  
}
