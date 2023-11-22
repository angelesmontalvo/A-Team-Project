package com.ecommerceproj.ecommercebackend;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;



@SpringBootApplication
@EntityScan("com.ecommerceproj.ecommercebackend")
public class EcommercebackendApplication {

		public static void main(String[] args) {
		SpringApplication.run(EcommercebackendApplication.class, args);
	}

}
