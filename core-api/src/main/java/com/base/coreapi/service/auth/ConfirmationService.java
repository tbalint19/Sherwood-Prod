package com.base.coreapi.service.auth;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.auth.Confirmation;
import com.base.coreapi.repository.ConfirmationRepository;
import com.base.coreapi.repository.UserRepository;
import com.base.coreapi.service.common.RandomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ConfirmationService {

    @Autowired
    private RandomService randomService;

    @Autowired
    private ConfirmationRepository confirmationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    private static final long DELAY = 300000;

    public Confirmation createConfirmation(){
        Confirmation confirmation = new Confirmation();
        String code = randomService.getRandomString(25);
        confirmation.setCode(code);
        confirmationRepository.save(confirmation);
        return confirmation;
    }

    public String attemptConfirm(String credential, String code){
        ApplicationUser user = userService.getUserByCredential(credential);
        if (user == null){
            return null;
        }
        if (!user.getConfirmation().getCode().equals(code) || user.getConfirmed()){
            return null;
        }
        long current = new Date().getTime();
        long created = user.getCreated().getTime();
        if (current - created > DELAY){
            return null;
        }
        confirm(user);
        return tokenService.createToken(user.getUsername());
    }

    private void confirm(ApplicationUser user){
        Confirmation confirmation = user.getConfirmation();
        confirmation.setUsed(true);
        confirmationRepository.save(confirmation);
        user.setConfirmed(true);
        userRepository.save(user);
    }

    public Boolean inTime(ApplicationUser user){
        Long created = user.getCreated().getTime();
        Long current = new Date().getTime();
        return created + DELAY > current;
    }
}
