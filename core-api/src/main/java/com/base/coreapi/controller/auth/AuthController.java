package com.base.coreapi.controller.auth;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Confirmation;
import com.base.coreapi.model.auth.request.LoginRequest;
import com.base.coreapi.model.common.response.SuccessResponse;
import com.base.coreapi.model.auth.response.TokenResponse;
import com.base.coreapi.service.auth.ConfirmationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController extends AuthAPI {

    @Autowired
    private ConfirmationService confirmationService;

    @PostMapping("/signup")
    public SuccessResponse signupUser(@RequestBody ApplicationUser user){
        Confirmation confirmation = confirmationService.createConfirmation();
        ApplicationUser createdUser = userService.createUser(user, confirmation);
        emailServiceController.sendConfirmationEmail(user);
        return new SuccessResponse(createdUser != null);
    }

    @PostMapping("/login")
    public TokenResponse loginUser(@RequestBody LoginRequest request){
        ApplicationUser user = userService.getUserByCredential(request.getCredential());
        String token = userService.loginUser(user, request.getPassword());
        return new TokenResponse(token);
    }

}
