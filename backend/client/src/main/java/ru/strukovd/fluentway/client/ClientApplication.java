package ru.strukovd.fluentway.client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "ru.strukovd" })
public class ClientApplication {

	public static void main(String[] args) {
		System.out.println("Client приложение запущено!");
		SpringApplication.run(ClientApplication.class, args);
	}
}
