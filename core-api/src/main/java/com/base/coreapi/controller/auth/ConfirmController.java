package com.base.coreapi.controller.auth;


import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.request.ConfirmRequest;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.model.auth.response.TokenResponse;
import com.base.coreapi.service.auth.ConfirmationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/confirm")
public class ConfirmController extends AuthAPI {

    @Autowired
    private ConfirmationService confirmationService;

    @GetMapping("/start")
    public SuccessResponse start(@RequestParam String credential){
        ApplicationUser user = userService.getUserByCredential(credential);
        Boolean canSend = user != null;
        Boolean shouldSend = !user.getConfirmed();
        Boolean inTime = confirmationService.inTime(user);
        if (canSend && shouldSend && inTime){
            emailServiceController.sendConfirmationEmail(user);
        }
        return new SuccessResponse(canSend && shouldSend && inTime);
    }

    @PostMapping("/finish")
    public TokenResponse finish(@RequestBody ConfirmRequest request){
        String token = confirmationService.attemptConfirm(
                request.getCredential(), request.getCode());
        return new TokenResponse(token);
    }
}
