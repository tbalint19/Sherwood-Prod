package com.base.coreapi.controller.auth;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ErrorController {

    @ExceptionHandler(value = { Exception.class })
    public void error(Exception e, WebRequest req){
        System.out.println(e.toString());
        System.out.println(e.getMessage());
        System.out.println(req.toString());
    }
}
