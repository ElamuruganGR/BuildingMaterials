package com.building.materials.corebackend;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ComponentScan(basePackages = "com.building.materials")
//@ImportResource("classpath:log4j2-spring.xml")
public class CorebackendApplication {

	public static final Logger logger = LogManager.getLogger(CorebackendApplication.class);

	public static void main(String[] args) {

		BasicConfigurator.configure(); //To enable the Log4j
		logger.info("CorebackendApplication.main");
		logger.error("CorebackendApplication.main");
		logger.warn("CorebackendApplication.main");
		logger.fatal("CorebackendApplication.main");
		logger.trace("CorebackendApplication.main");
		logger.debug("CorebackendApplication");
		SpringApplication.run(CorebackendApplication.class, args);
		System.out.println("Application Booted");
	}

}
