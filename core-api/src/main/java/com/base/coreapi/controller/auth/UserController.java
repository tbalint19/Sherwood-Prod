package com.base.coreapi.controller.auth;


import com.base.coreapi.model.auth.ApplicationUser;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController extends AuthAPI {

    @GetMapping("/me")
    public ApplicationUser getMe(Principal principal){
        ApplicationUser user = getUser(principal);
        return user;
    }

}
