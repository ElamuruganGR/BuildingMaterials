package com.building.materials.handler;

import com.building.materials.exceptions.InvalidAmountException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class HandleExceptions {

    @ExceptionHandler
    @ResponseBody
    public String handleInvalidAmountException(InvalidAmountException iae){
        return iae.getMessage();
    }
}
