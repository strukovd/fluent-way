package ru.strukovd.fluentway.client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FluentWayClientApplication {

	public static void main(String[] args) {
		System.out.println("Client приложение запущено!");
		SpringApplication.run(FluentWayApplication.class, args);
	}

}
