package com.building.materials.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @Value("${greeting}")
    private String greet;
    @RequestMapping("/greet")
    public String welcome(){
        //return "HiEla";
        System.out.println("ClassPath: "+System.getProperty("java.class.path"));
        return greet;
    }
}
