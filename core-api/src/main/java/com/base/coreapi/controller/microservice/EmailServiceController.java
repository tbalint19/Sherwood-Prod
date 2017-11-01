package com.base.coreapi.controller.microservice;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Reset;
import com.base.coreapi.model.auth.request.ConfirmEmailRequest;
import com.base.coreapi.model.auth.request.ResetEmailRequest;
import com.base.coreapi.model.common.response.AttemptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailServiceController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String API_URL = "http://localhost:8000";
    private static final String APP_URL = "http://localhost:4200";
    private static final String SERVICE_URL = "http://localhost:8001/api/send";

    private AttemptResponse post(String url, Object data){
        return restTemplate.postForObject(SERVICE_URL + url, data , AttemptResponse.class);
    }

    public AttemptResponse sendConfirmationEmail(ApplicationUser user){
        ConfirmEmailRequest request = new ConfirmEmailRequest();
        request.setTo(user.getEmail());
        request.setName(user.getUsername());
        String url = APP_URL + "/confirm?code=" + user.getConfirmation().getCode() + "&user=" + user.getUsername();
        request.setLink(url);
        request.setConfirmationCode(user.getConfirmation().getCode());
        return post("/confirmation", request);
    }

    public AttemptResponse sendResetEmail(ApplicationUser user, Reset reset){
        ResetEmailRequest request = new ResetEmailRequest();
        request.setName(user.getUsername());
        request.setTo(user.getEmail());
        String url = APP_URL + "/reset?code=" + reset.getCode() + "&user=" + user.getUsername();
        request.setLink(url);
        return post("/reset", request);
    }
}
